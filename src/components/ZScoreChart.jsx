import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { translations } from '../utils/translations';

const ZScoreChart = ({ zScore, percentile, language }) => {
    const t = translations[language];

    // Генерируем данные для нормального распределения
    const generateNormalDistribution = () => {
        const data = [];
        for (let x = -4; x <= 4; x += 0.1) {
            const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
            data.push([x, y]);
        }
        return data;
    };

    const options = {
        chart: {
            type: 'areaspline',
            height: 200,
            backgroundColor: 'transparent',
            style: { fontFamily: 'Inter, sans-serif' }
        },
        title: { text: null },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: {
            title: { text: 'Z-Score', style: { fontSize: '11px' } },
            plotLines: [{
                value: zScore,
                color: Math.abs(zScore) <= 2 ? '#48bb78' : Math.abs(zScore) <= 3 ? '#ed8936' : '#f56565',
                width: 2,
                zIndex: 5,
                label: {
                    text: `Z = ${zScore.toFixed(2)}`,
                    style: { color: '#fff', fontWeight: 'bold', fontSize: '10px' },
                    align: 'center',
                    y: 15
                }
            }, {
                value: -2,
                color: '#cbd5e0',
                width: 1,
                dashStyle: 'Dash',
                label: { text: '-2σ', style: { fontSize: '9px', color: '#a0aec0' } }
            }, {
                value: 2,
                color: '#cbd5e0',
                width: 1,
                dashStyle: 'Dash',
                label: { text: '+2σ', style: { fontSize: '9px', color: '#a0aec0' } }
            }],
            min: -4,
            max: 4,
            tickInterval: 1,
            labels: { style: { fontSize: '10px' } }
        },
        yAxis: {
            title: { text: null },
            labels: { enabled: false },
            gridLineWidth: 0
        },
        plotOptions: {
            areaspline: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgba(102, 126, 234, 0.3)'],
                        [1, 'rgba(102, 126, 234, 0.05)']
                    ]
                },
                lineWidth: 2,
                lineColor: '#667eea',
                marker: { enabled: false },
                states: { hover: { lineWidth: 2 } }
            }
        },
        series: [{
            name: 'Normal Distribution',
            data: generateNormalDistribution(),
            zones: [{
                value: zScore,
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgba(102, 126, 234, 0.3)'],
                        [1, 'rgba(102, 126, 234, 0.05)']
                    ]
                }
            }, {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, Math.abs(zScore) <= 2 ? 'rgba(72, 187, 120, 0.3)' : Math.abs(zScore) <= 3 ? 'rgba(237, 137, 54, 0.3)' : 'rgba(245, 101, 101, 0.3)'],
                        [1, 'rgba(255, 255, 255, 0.05)']
                    ]
                }
            }]
        }],
        tooltip: {
            enabled: true,
            formatter: function () {
                return `<b>Z-Score:</b> ${this.x.toFixed(2)}<br/><b>${t.density}:</b> ${this.y.toFixed(3)}`;
            },
            style: { fontSize: '11px' }
        }
    };

    return (
        <div style={{
            position: 'absolute',
            right: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            marginRight: '10px',
            width: '350px',
            background: 'white',
            border: '2px solid #667eea',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 1000,
            pointerEvents: 'none'
        }}>
            <div style={{ fontSize: '11px', marginBottom: '5px', color: '#4a5568', fontWeight: '600' }}>
                {t.distribution}
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div style={{ fontSize: '10px', color: '#718096', marginTop: '5px', textAlign: 'center' }}>
                {t.percentile}: <strong>{percentile.toFixed(1)}%</strong>
            </div>
        </div>
    );
};

export default ZScoreChart;
