import React, { useState, useEffect } from 'react';
import { getZFromLMS, getZFromMeanSD, getZFromCoefficients, getPercentileFromZ, getInterpolatedZScore } from '../utils/zScoreLogic';
import { PARAMETERS } from '../data/parameters';
import { translations } from '../utils/translations';
import { tooltips } from '../data/tooltips';
import ZScoreChart from './ZScoreChart';

const MeasurementInput = ({ paramId, patientData, language }) => {
    const [value, setValue] = useState('');
    const [zScore, setZScore] = useState(null);
    const [percentile, setPercentile] = useState(null);
    const [error, setError] = useState(null);
    const [showChart, setShowChart] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const param = PARAMETERS[paramId];
    const t = translations[language];

    const getTooltipText = () => {
        return tooltips[language][paramId] || (language === 'ru' ? 'Клинические данные отсутствуют' : 'Clinical info not available');
    };

    useEffect(() => {
        calculateZScore();
    }, [value, patientData, language]);

    const getRefValues = () => {
        const { weight, bsa, age, gender } = patientData;

        const calculateForZ = (z) => {
            try {
                if (param.type === 'kampmann_interpolated') {
                    let gridValue, grid, meanArray, sdArray;

                    if (weight <= 4) {
                        if (!weight) return null;
                        gridValue = weight;
                        grid = param.data.weight.grid;
                        meanArray = param.data.weight.mean;
                        sdArray = param.data.weight.sd;
                    } else {
                        if (!bsa) return null;
                        gridValue = bsa;
                        grid = param.data.bsa.grid;
                        meanArray = param.data.bsa.mean;
                        sdArray = param.data.bsa.sd;
                    }

                    if (gridValue < grid[0] || gridValue > grid[grid.length - 1]) return null;

                    let lowerIndex = 0;
                    for (let i = 0; i < grid.length; i++) {
                        if (grid[i] <= gridValue) lowerIndex = i;
                        else break;
                    }
                    const upperIndex = Math.min(lowerIndex + 1, grid.length - 1);
                    const ratio = lowerIndex === upperIndex ? 0 : (gridValue - grid[lowerIndex]) / (grid[upperIndex] - grid[lowerIndex]);

                    const mean = meanArray[lowerIndex] + ratio * (meanArray[upperIndex] - meanArray[lowerIndex]);
                    const sd = sdArray[lowerIndex] + ratio * (sdArray[upperIndex] - sdArray[lowerIndex]);

                    return mean + z * sd;

                } else if (param.type === 'gautier_log_linear' || param.type === 'zilberman_log_linear') {
                    if (!bsa) return null;
                    const data = param.data[gender];

                    const predictedMeanLog = data.intercept + data.slope * Math.log(bsa);
                    let val = Math.exp(predictedMeanLog + z * data.sd);

                    if (param.type === 'zilberman_log_linear') val *= 10;
                    return val;

                } else if (param.type === 'peterssen_polynomial') {
                    if (!bsa) return null;
                    const [intercept, b1, b2, b3, mse] = param.data.coefficients;
                    const predictedLogMean = intercept + b1 * bsa + b2 * Math.pow(bsa, 2) + b3 * Math.pow(bsa, 3);
                    return Math.exp(predictedLogMean + z * Math.sqrt(mse)) * 10;

                } else if (param.type === 'dallaire_sqrt') {
                    if (!bsa) return null;
                    const { mean_intercept, mean_slope, sd_intercept, sd_slope } = param.data;
                    const sqrtBSA = Math.sqrt(bsa);
                    const mean = mean_intercept + mean_slope * sqrtBSA;
                    const sd = sd_intercept + sd_slope * sqrtBSA;
                    return mean + z * sd;

                } else if (param.type === 'koestenberger_interpolated') {
                    if (age === undefined || age === null) return null;
                    const gridValue = age;
                    const grid = param.data.grid;
                    const meanArray = param.data.mean;
                    const sdArray = param.data.sd;

                    if (gridValue < grid[0] || gridValue > grid[grid.length - 1]) return null;

                    let lowerIndex = 0;
                    for (let i = 0; i < grid.length; i++) {
                        if (grid[i] <= gridValue) lowerIndex = i;
                        else break;
                    }
                    const upperIndex = Math.min(lowerIndex + 1, grid.length - 1);
                    const ratio = lowerIndex === upperIndex ? 0 : (gridValue - grid[lowerIndex]) / (grid[upperIndex] - grid[lowerIndex]);

                    const mean = meanArray[lowerIndex] + ratio * (meanArray[upperIndex] - meanArray[lowerIndex]);
                    const sd = sdArray[lowerIndex] + ratio * (sdArray[upperIndex] - sdArray[lowerIndex]);

                    return mean + z * sd;
                }
            } catch (e) {
                return null;
            }
            return null;
        };

        return {
            minus2: calculateForZ(-2),
            zero: calculateForZ(0),
            plus2: calculateForZ(2)
        };
    };

    const refValues = getRefValues();

    const calculateZScore = () => {
        if (!value || value <= 0) {
            setZScore(null);
            setPercentile(null);
            setError(null);
            return;
        }

        const val = parseFloat(value);
        const { weight, bsa, age, gender } = patientData;

        let z = -100;

        try {
            if (param.type === 'kampmann_interpolated') {
                let gridValue, grid, meanArray, sdArray;

                if (weight <= 4) {
                    if (!weight) { setError(t.weightRequired); return; }
                    gridValue = weight;
                    grid = param.data.weight.grid;
                    meanArray = param.data.weight.mean;
                    sdArray = param.data.weight.sd;
                } else {
                    if (!bsa) { setError(t.bsaRequired); return; }
                    gridValue = bsa;
                    grid = param.data.bsa.grid;
                    meanArray = param.data.bsa.mean;
                    sdArray = param.data.bsa.sd;
                }

                z = getInterpolatedZScore(val, gridValue, grid, meanArray, sdArray);

            } else if (param.type === 'gautier_log_linear' || param.type === 'zilberman_log_linear') {
                if (!bsa) { setError(t.bsaRequired); return; }
                const data = param.data[gender];

                let normalizedVal = val;
                if (param.type === 'zilberman_log_linear') normalizedVal = val / 10;

                const predictedMeanLog = data.intercept + data.slope * Math.log(bsa);
                z = (Math.log(normalizedVal) - predictedMeanLog) / data.sd;

            } else if (param.type === 'peterssen_polynomial') {
                if (!bsa) { setError(t.bsaRequired); return; }
                z = getZFromCoefficients(val, bsa, param.data.coefficients);

            } else if (param.type === 'dallaire_sqrt') {
                if (!bsa) { setError(t.bsaRequired); return; }
                const { mean_intercept, mean_slope, sd_intercept, sd_slope } = param.data;
                const sqrtBSA = Math.sqrt(bsa);
                const mean = mean_intercept + mean_slope * sqrtBSA;
                const sd = sd_intercept + sd_slope * sqrtBSA;
                z = (val - mean) / sd;

            } else if (param.type === 'koestenberger_interpolated') {
                if (age === undefined || age === null) { setError(t.ageRequired); return; }
                const gridValue = age;
                const grid = param.data.grid;
                const meanArray = param.data.mean;
                const sdArray = param.data.sd;

                z = getInterpolatedZScore(val, gridValue, grid, meanArray, sdArray);
            }

            if (z !== -100 && !isNaN(z)) {
                setZScore(z);
                setPercentile(getPercentileFromZ(z) * 100);
                setError(null);
            } else {
                setZScore(null);
                setError(t.outOfRange);
            }
        } catch (e) {
            console.error(e);
            setError(t.calcError);
        }
    };

    const getZColor = (z) => {
        if (!z) return 'z-color-gray';
        const absZ = Math.abs(z);
        if (absZ <= 2) return 'z-color-green';
        if (absZ <= 3) return 'z-color-orange';
        return 'z-color-red';
    };

    return (
        <div className="measurement-row">
            <div className="measurement-label" style={{ position: 'relative' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>{param.name}</span>
                    <span
                        className="info-icon"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        ℹ️
                    </span>
                </label>
                {language === 'ru' && param.nameRu && <span className="russian-name">{param.nameRu}</span>}
                <span>{param.ref}</span>

                {showTooltip && (
                    <div className="tooltip">
                        {getTooltipText()}
                    </div>
                )}
            </div>
            <div className="measurement-input">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={`${param.unit}`}
                    step="0.1"
                />
            </div>
            <div className="reference-values">
                {refValues.minus2 !== null && refValues.zero !== null && refValues.plus2 !== null ? (
                    <>
                        <div className="ref-value ref-minus2" title="Z = -2">
                            <span className="ref-label">-2σ:</span>
                            <span className="ref-number">{refValues.minus2.toFixed(1)}</span>
                        </div>
                        <div className="ref-value ref-zero" title={`Z = 0 (${t.normal})`}>
                            <span className="ref-label">0:</span>
                            <span className="ref-number">{refValues.zero.toFixed(1)}</span>
                        </div>
                        <div className="ref-value ref-plus2" title="Z = +2">
                            <span className="ref-label">+2σ:</span>
                            <span className="ref-number">{refValues.plus2.toFixed(1)}</span>
                        </div>
                    </>
                ) : (
                    <span style={{ fontSize: '0.7rem', color: '#a0aec0' }}>—</span>
                )}
            </div>
            <div
                className="measurement-result"
                style={{ position: 'relative' }}
                onMouseEnter={() => zScore !== null && setShowChart(true)}
                onMouseLeave={() => setShowChart(false)}
            >
                {error ? (
                    <span className="error-message">⚠️ {error}</span>
                ) : zScore !== null ? (
                    <>
                        {showChart && <ZScoreChart zScore={zScore} percentile={percentile} language={language} />}
                        <div>
                            <div className={`z-score-value ${getZColor(zScore)}`}>
                                {zScore >= 0 ? '+' : ''}{zScore.toFixed(2)} z
                            </div>
                            <div className="z-score-percentile">
                                {percentile.toFixed(1)} {t.percentile}
                            </div>
                        </div>
                    </>
                ) : (
                    <span className="z-color-gray">—</span>
                )}
            </div>
        </div>
    );
};

export default MeasurementInput;
