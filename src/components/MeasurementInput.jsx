import React, { useState, useEffect } from 'react';
import { getZFromLMS, getZFromMeanSD, getZFromCoefficients, getPercentileFromZ, getInterpolatedZScore } from '../utils/zScoreLogic';
import { PARAMETERS } from '../data/parameters';
import ZScoreChart from './ZScoreChart';

const MeasurementInput = ({ paramId, patientData }) => {
    const [value, setValue] = useState('');
    const [zScore, setZScore] = useState(null);
    const [percentile, setPercentile] = useState(null);
    const [error, setError] = useState(null);
    const [showChart, setShowChart] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const param = PARAMETERS[paramId];

    const getTooltipText = () => {
        const tooltips = {
            'Rvawd': 'Толщина передней стенки правого желудочка в диастолу. Увеличение может указывать на гипертрофию ПЖ.',
            'Rvdd': 'Размер правого желудочка в диастолу. Расширение может указывать на объемную перегрузку.',
            'Ivsd': 'Толщина межжелудочковой перегородки в диастолу. Увеличение наблюдается при гипертрофии ЛЖ.',
            'Lvedd': 'Конечно-диастолический размер левого желудочка. Важный показатель систолической функции.',
            'Lvesd': 'Конечно-систолический размер левого желудочка. Используется для расчета фракции выброса.',
            'Lvpwd': 'Толщина задней стенки левого желудочка в диастолу. Увеличение при гипертрофии ЛЖ.',
            'Anulus': 'Диаметр фиброзного кольца аортального клапана. Важен для выбора протеза клапана.',
            'Sov': 'Размер синусов Вальсальвы. Расширение может указывать на аневризму аорты.',
            'Stj': 'Синотубулярное соединение. Место перехода синусов в восходящую аорту.',
            'Aao': 'Диаметр восходящей аорты. Расширение >40мм требует наблюдения.',
            'Taa': 'Диаметр поперечной дуги аорты.',
            'Isthmus': 'Перешеек аорты. Узкое место между дугой и нисходящей аортой.',
            'Dao': 'Диаметр нисходящей аорты.',
            'Mpa': 'Диаметр главной легочной артерии. Расширение при легочной гипертензии.',
            'Lpa': 'Диаметр левой легочной артерии.',
            'Rpa': 'Диаметр правой легочной артерии.',
            'Pv': 'Диаметр клапана легочной артерии.',
            'Mv': 'Диаметр митрального клапана.',
            'Tv': 'Диаметр трикуспидального клапана.',
            'Aov': 'Диаметр аортального клапана.',
            'Lmca': 'Левая главная коронарная артерия. Кровоснабжает левый желудочек.',
            'Cx': 'Огибающая ветвь левой коронарной артерии.',
            'Lad': 'Передняя нисходящая артерия. Наиболее важная коронарная артерия.',
            'Rcaprox': 'Проксимальная часть правой коронарной артерии.',
            'Rcamed': 'Средняя часть правой коронарной артерии.',
            'Rcadist': 'Дистальная часть правой коронарной артерии.',
            'Tapse': 'Экскурсия кольца трикуспидального клапана. Показатель систолической функции ПЖ. Норма >17мм.',
            'Mapse': 'Экскурсия кольца митрального клапана. Показатель систолической функции ЛЖ.'
        };
        return tooltips[paramId] || 'Клинические данные отсутствуют';
    };

    useEffect(() => {
        calculateZScore();
    }, [value, patientData]);

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
                    if (!weight) { setError("Weight required"); return; }
                    gridValue = weight;
                    grid = param.data.weight.grid;
                    meanArray = param.data.weight.mean;
                    sdArray = param.data.weight.sd;
                } else {
                    if (!bsa) { setError("BSA required"); return; }
                    gridValue = bsa;
                    grid = param.data.bsa.grid;
                    meanArray = param.data.bsa.mean;
                    sdArray = param.data.bsa.sd;
                }

                z = getInterpolatedZScore(val, gridValue, grid, meanArray, sdArray);

            } else if (param.type === 'gautier_log_linear' || param.type === 'zilberman_log_linear') {
                if (!bsa) { setError("BSA required"); return; }
                const data = param.data[gender];

                let normalizedVal = val;
                if (param.type === 'zilberman_log_linear') normalizedVal = val / 10;

                const predictedMeanLog = data.intercept + data.slope * Math.log(bsa);
                z = (Math.log(normalizedVal) - predictedMeanLog) / data.sd;

            } else if (param.type === 'peterssen_polynomial') {
                if (!bsa) { setError("BSA required"); return; }
                z = getZFromCoefficients(val, bsa, param.data.coefficients);

            } else if (param.type === 'dallaire_sqrt') {
                if (!bsa) { setError("BSA required"); return; }
                const { mean_intercept, mean_slope, sd_intercept, sd_slope } = param.data;
                const sqrtBSA = Math.sqrt(bsa);
                const mean = mean_intercept + mean_slope * sqrtBSA;
                const sd = sd_intercept + sd_slope * sqrtBSA;
                z = (val - mean) / sd;

            } else if (param.type === 'koestenberger_interpolated') {
                if (age === undefined || age === null) { setError("Age required"); return; }
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
                setError("Out of range");
            }
        } catch (e) {
            console.error(e);
            setError("Calculation error");
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
                {param.nameRu && <span className="russian-name">{param.nameRu}</span>}
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
                        <div className="ref-value ref-zero" title="Z = 0 (норма)">
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
                        {showChart && <ZScoreChart zScore={zScore} percentile={percentile} />}
                        <div>
                            <div className={`z-score-value ${getZColor(zScore)}`}>
                                {zScore >= 0 ? '+' : ''}{zScore.toFixed(2)} z
                            </div>
                            <div className="z-score-percentile">
                                {percentile.toFixed(1)}th percentile
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
