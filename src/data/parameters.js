/**
 * Parameter Definitions for Z-Score Calculator
 */

export const PARAMETERS = {
    // M-Mode (Kampmann)
    Rvawd: {
        id: 'Rvawd', name: 'RVAWd', nameRu: 'Передняя стенка ПЖ (диастола)', unit: 'mm',
        group: 'M-Mode (Kampmann)', ref: 'Kampmann et al. 2000', type: 'kampmann_interpolated',
        data: {
            weight: { grid: [2, 2.5, 3, 3.5, 4], mean: [2.4, 2.5, 2.5, 2.6, 2.6], sd: [0.55, 0.55, 0.55, 0.55, 0.55] },
            bsa: {
                grid: [0.25, 0.275, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2],
                mean: [2.6, 2.6, 2.7, 2.7, 2.7, 2.75, 2.75, 2.75, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.9, 2.9, 3, 3, 3.1, 3.1, 3.1],
                sd: [0.6, 0.6, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.6, 0.6, 0.6]
            }
        }
    },
    Rvdd: {
        id: 'Rvdd', name: 'RVDD', nameRu: 'Диаметр ПЖ (диастола)', unit: 'mm',
        group: 'M-Mode (Kampmann)', ref: 'Kampmann et al. 2000', type: 'kampmann_interpolated',
        data: {
            weight: { grid: [2, 2.5, 3, 3.5, 4], mean: [8.4, 8.4, 8.5, 8.6, 8.6], sd: [2.2, 2.2, 2.2, 2.25, 2.25] },
            bsa: {
                grid: [0.25, 0.275, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2],
                mean: [8.7, 8.7, 8.7, 8.8, 8.9, 9, 9.3, 9.5, 9.6, 9.9, 10.1, 10.5, 11, 11.2, 11.8, 12.4, 13.5, 14, 15.6, 16.5, 17.5],
                sd: [2.25, 2.25, 2.25, 2.25, 2.25, 2.25, 2.25, 2.25, 2.2, 2.2, 2.2, 2.35, 2.3, 2.4, 2.2, 2.4, 2.5, 2.5, 2.8, 3.1, 3]
            }
        }
    },
    Ivsd: {
        id: 'Ivsd', name: 'IVSd', nameRu: 'Межжелудочковая перегородка (диастола)', unit: 'mm',
        group: 'M-Mode (Kampmann)', ref: 'Kampmann et al. 2000', type: 'kampmann_interpolated',
        data: {
            weight: { grid: [2, 2.5, 3, 3.5, 4], mean: [3.5, 3.5, 3.6, 3.7, 3.8], sd: [0.7, 0.7, 0.65, 0.7, 0.7] },
            bsa: {
                grid: [0.25, 0.275, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2],
                mean: [3.8, 3.8, 3.9, 3.9, 4.1, 4.2, 4.3, 4.6, 4.8, 4.8, 5, 5.2, 5.6, 5.8, 6.2, 6.5, 6.6, 6.7, 7.4, 8, 9.3],
                sd: [0.7, 0.7, 0.7, 0.7, 0.75, 0.8, 0.8, 0.75, 0.75, 0.75, 0.75, 0.8, 0.9, 0.9, 0.95, 0.9, 0.9, 0.9, 1.1, 1.2, 1.25]
            }
        }
    },
    Lvedd: {
        id: 'Lvedd', name: 'LVEDD', nameRu: 'Конечно-диастолический размер ЛЖ', unit: 'mm',
        group: 'M-Mode (Kampmann)', ref: 'Kampmann et al. 2000', type: 'kampmann_interpolated',
        data: {
            weight: { grid: [2, 2.5, 3, 3.5, 4], mean: [17.1, 18.1, 18.2, 18.8, 19.9], sd: [1.05, 1.55, 1.55, 1.7, 1.7] },
            bsa: {
                grid: [0.25, 0.275, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2],
                mean: [20, 21.2, 22.9, 23.6, 26, 27.1, 29, 31, 31.6, 33.2, 33.9, 35.8, 37.1, 38.5, 39.4, 41.7, 42.4, 43.3, 45.4, 46.8, 53.4],
                sd: [1.55, 2.1, 2.45, 2.3, 2.5, 2.55, 2.8, 2.7, 2.8, 3, 3.25, 3.1, 3.05, 3.4, 3.45, 3.1, 3.3, 3, 3.2, 4, 4]
            }
        }
    },
    Lvesd: {
        id: 'Lvesd', name: 'LVESD', nameRu: 'Конечно-систолический размер ЛЖ', unit: 'mm',
        group: 'M-Mode (Kampmann)', ref: 'Kampmann et al. 2000', type: 'kampmann_interpolated',
        data: {
            weight: { grid: [2, 2.5, 3, 3.5, 4], mean: [11, 11.7, 11.7, 11.9, 12.7], sd: [0.75, 1.25, 1.25, 1.2, 1.25] },
            bsa: {
                grid: [0.25, 0.275, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2],
                mean: [13.2, 13.6, 14.8, 14.8, 16.1, 17, 18, 19.3, 19.9, 20.4, 21.3, 22.7, 23.6, 24.4, 25.2, 27.1, 27.1, 27.6, 28.6, 29.8, 34.4],
                sd: [1.5, 1.6, 2, 2, 2.05, 2, 2, 2.15, 2.25, 2.35, 2.6, 2.5, 2.8, 2.9, 2.8, 2.8, 2.8, 2.8, 3.05, 3.2, 4.4]
            }
        }
    },
    Lvpwd: {
        id: 'Lvpwd', name: 'LVPWd', nameRu: 'Задняя стенка ЛЖ (диастола)', unit: 'mm',
        group: 'M-Mode (Kampmann)', ref: 'Kampmann et al. 2000', type: 'kampmann_interpolated',
        data: {
            weight: { grid: [2, 2.5, 3, 3.5, 4], mean: [2.7, 3.2, 3.5, 3.6, 3.7], sd: [0.4, 0.5, 0.55, 0.55, 0.55] },
            bsa: {
                grid: [0.25, 0.275, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2],
                mean: [3.6, 3.8, 4.1, 4.1, 4.2, 4.6, 4.6, 4.8, 4.8, 4.9, 5.2, 5.7, 5.9, 5.9, 6.3, 6.6, 6.9, 6.9, 7.7, 8.1, 8.1],
                sd: [0.5, 0.55, 0.65, 0.65, 0.65, 0.75, 0.75, 0.75, 0.75, 0.75, 0.85, 1.05, 1.1, 1.1, 1.2, 1.3, 1.3, 1.3, 1.4, 1.5, 1.5]
            }
        }
    },

    // Aorta (Gautier)
    Anulus: {
        id: 'Anulus', name: 'Anulus', nameRu: 'Фиброзное кольцо аорты', unit: 'mm',
        group: 'Aorta (Gautier)', ref: 'Gautier et al. 2010', type: 'gautier_log_linear',
        data: { male: { intercept: 2.78, slope: 0.47, sd: 0.1 }, female: { intercept: 2.75, slope: 0.44, sd: 0.1 } }
    },
    Sov: {
        id: 'Sov', name: 'SoV', nameRu: 'Синусы Вальсальвы', unit: 'mm',
        group: 'Aorta (Gautier)', ref: 'Gautier et al. 2010', type: 'gautier_log_linear',
        data: { male: { intercept: 3.1, slope: 0.49, sd: 0.1 }, female: { intercept: 3.1, slope: 0.44, sd: 0.09 } }
    },
    Stj: {
        id: 'Stj', name: 'STJ', nameRu: 'Синотубулярное соединение', unit: 'mm',
        group: 'Aorta (Gautier)', ref: 'Gautier et al. 2010', type: 'gautier_log_linear',
        data: { male: { intercept: 2.9, slope: 0.47, sd: 0.1 }, female: { intercept: 2.9, slope: 0.42, sd: 0.09 } }
    },
    Aao: {
        id: 'Aao', name: 'Asc. Ao', nameRu: 'Восходящая аорта', unit: 'mm',
        group: 'Aorta (Gautier)', ref: 'Gautier et al. 2010', type: 'gautier_log_linear',
        data: { male: { intercept: 2.9, slope: 0.46, sd: 0.11 }, female: { intercept: 2.9, slope: 0.46, sd: 0.1 } }
    },

    // Aorta/Pulmonary (Peterssen)
    Taa: {
        id: 'Taa', name: 'Transv. arch', nameRu: 'Поперечная дуга аорты', unit: 'mm',
        group: 'Aorta (Peterssen)', ref: 'Peterssen et al. 2008', type: 'peterssen_polynomial',
        data: { coefficients: [-0.79, 3.02, -2.484, 0.712, 0.023, 0.865] }
    },
    Isthmus: {
        id: 'Isthmus', name: 'Isthmus', nameRu: 'Перешеек аорты', unit: 'mm',
        group: 'Aorta (Peterssen)', ref: 'Peterssen et al. 2008', type: 'peterssen_polynomial',
        data: { coefficients: [-1.072, 2.539, -1.627, 0.368, 0.027, 0.825] }
    },
    Distarch: {
        id: 'Distarch', name: 'Distal arch', nameRu: 'Дистальная дуга аорты', unit: 'mm',
        group: 'Aorta (Peterssen)', ref: 'Peterssen et al. 2008', type: 'peterssen_polynomial',
        data: { coefficients: [-0.976, 2.469, -1.746, 0.445, 0.026, 0.792] }
    },
    Dao: {
        id: 'Dao', name: 'Desc. Ao', nameRu: 'Нисходящая аорта', unit: 'mm',
        group: 'Aorta (Peterssen)', ref: 'Peterssen et al. 2008', type: 'peterssen_polynomial',
        data: { coefficients: [-0.922, 2.1, -1.411, 0.371, 0.018, 0.842] }
    },
    Mpa: {
        id: 'Mpa', name: 'MPA', nameRu: 'Главная легочная артерия', unit: 'mm',
        group: 'Pulmonary (Peterssen)', ref: 'Peterssen et al. 2008', type: 'peterssen_polynomial',
        data: { coefficients: [-0.707, 2.746, -1.807, 0.424, 0.024, 0.857] }
    },
    Lpa: {
        id: 'Lpa', name: 'LPA', nameRu: 'Левая легочная артерия', unit: 'mm',
        group: 'Pulmonary (Peterssen)', ref: 'Peterssen et al. 2008', type: 'peterssen_polynomial',
        data: { coefficients: [-1.348, 2.884, -1.954, 0.466, 0.028, 0.842] }
    },
    Rpa: {
        id: 'Rpa', name: 'RPA', nameRu: 'Правая легочная артерия', unit: 'mm',
        group: 'Pulmonary (Peterssen)', ref: 'Peterssen et al. 2008', type: 'peterssen_polynomial',
        data: { coefficients: [-1.36, 3.394, -2.508, 0.66, 0.027, 0.873] }
    },

    // Valves (Zilberman)
    Pv: {
        id: 'Pv', name: 'PV', nameRu: 'Клапан легочной артерии', unit: 'mm',
        group: 'Valves (Zilberman)', ref: 'Zilberman et al. 2008', type: 'zilberman_log_linear',
        data: { male: { intercept: 0.618, slope: 0.498, sd: 0.152 }, female: { intercept: 0.597, slope: 0.476, sd: 0.144 } }
    },
    Mv: {
        id: 'Mv', name: 'MV', nameRu: 'Митральный клапан', unit: 'mm',
        group: 'Valves (Zilberman)', ref: 'Zilberman et al. 2008', type: 'zilberman_log_linear',
        data: { male: { intercept: 0.765, slope: 0.425, sd: 0.169 }, female: { intercept: 0.733, slope: 0.408, sd: 0.18 } }
    },
    Tv: {
        id: 'Tv', name: 'TV', nameRu: 'Трикуспидальный клапан', unit: 'mm',
        group: 'Valves (Zilberman)', ref: 'Zilberman et al. 2008', type: 'zilberman_log_linear',
        data: { male: { intercept: 0.817, slope: 0.391, sd: 0.171 }, female: { intercept: 0.755, slope: 0.364, sd: 0.186 } }
    },
    Aov: {
        id: 'Aov', name: 'AoV', nameRu: 'Аортальный клапан', unit: 'mm',
        group: 'Valves (Zilberman)', ref: 'Zilberman et al. 2008', type: 'zilberman_log_linear',
        data: { male: { intercept: 0.472, slope: 0.492, sd: 0.141 }, female: { intercept: 0.437, slope: 0.461, sd: 0.127 } }
    },

    // Coronary (Dallaire)
    Lmca: {
        id: 'Lmca', name: 'LMCA', nameRu: 'Левая главная коронарная артерия', unit: 'mm',
        group: 'Coronary (Dallaire)', ref: 'Dallaire et al. 2011', type: 'dallaire_sqrt',
        data: { mean_intercept: -0.1817, mean_slope: 2.9238, sd_intercept: 0.1801, sd_slope: 0.253 }
    },
    Cx: {
        id: 'Cx', name: 'Cx', nameRu: 'Огибающая артерия', unit: 'mm',
        group: 'Coronary (Dallaire)', ref: 'Dallaire et al. 2011', type: 'dallaire_sqrt',
        data: { mean_intercept: -0.2716, mean_slope: 2.3458, sd_intercept: 0.1142, sd_slope: 0.3423 }
    },
    Lad: {
        id: 'Lad', name: 'LAD', nameRu: 'Передняя нисходящая артерия', unit: 'mm',
        group: 'Coronary (Dallaire)', ref: 'Dallaire et al. 2011', type: 'dallaire_sqrt',
        data: { mean_intercept: -0.1502, mean_slope: 2.2672, sd_intercept: 0.1709, sd_slope: 0.2293 }
    },
    Rcaprox: {
        id: 'Rcaprox', name: 'RCAprox', nameRu: 'Правая коронарная артерия (проксимальная)', unit: 'mm',
        group: 'Coronary (Dallaire)', ref: 'Dallaire et al. 2011', type: 'dallaire_sqrt',
        data: { mean_intercept: -0.3039, mean_slope: 2.7521, sd_intercept: 0.1626, sd_slope: 0.2881 }
    },
    Rcamed: {
        id: 'Rcamed', name: 'RCAmed', nameRu: 'Правая коронарная артерия (средняя)', unit: 'mm',
        group: 'Coronary (Dallaire)', ref: 'Dallaire et al. 2011', type: 'dallaire_sqrt',
        data: { mean_intercept: -0.306, mean_slope: 2.4078, sd_intercept: 0.1324, sd_slope: 0.3259 }
    },
    Rcadist: {
        id: 'Rcadist', name: 'RCAdist', nameRu: 'Правая коронарная артерия (дистальная)', unit: 'mm',
        group: 'Coronary (Dallaire)', ref: 'Dallaire et al. 2011', type: 'dallaire_sqrt',
        data: { mean_intercept: -0.3185, mean_slope: 2.3295, sd_intercept: 0.1099, sd_slope: 0.3198 }
    },

    // Function (Koestenberger)
    Tapse: {
        id: 'Tapse', name: 'TAPSE', nameRu: 'Систолическая экскурсия кольца ТК', unit: 'cm',
        group: 'Function (Koestenberger)', ref: 'Koestenberger et al. 2009', type: 'koestenberger_interpolated',
        data: {
            grid: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204, 216],
            mean: [0.91, 1.14, 1.14, 1.14, 1.31, 1.31, 1.31, 1.44, 1.44, 1.44, 1.44, 1.44, 1.55, 1.65, 1.74, 1.82, 1.87, 1.9, 1.94, 1.97, 2.01, 2.05, 2.1, 2.14, 2.2, 2.26, 2.33, 2.39, 2.45, 2.47],
            sd: [0.116667, 0.141667, 0.141667, 0.141667, 0.151667, 0.151667, 0.151667, 0.156667, 0.156667, 0.156667, 0.156667, 0.156667, 0.15, 0.145, 0.131667, 0.128333, 0.131667, 0.141667, 0.15, 0.151667, 0.143333, 0.135, 0.135, 0.153333, 0.171667, 0.193333, 0.196667, 0.205, 0.205, 0.21]
        }
    },
    Mapse: {
        id: 'Mapse', name: 'MAPSE', nameRu: 'Систолическая экскурсия кольца МК', unit: 'cm',
        group: 'Function (Koestenberger)', ref: 'Koestenberger et al. 2012', type: 'koestenberger_interpolated',
        data: {
            grid: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204, 216],
            mean: [0.57, 0.67, 0.73, 0.77, 0.77, 0.77, 0.84, 0.84, 0.84, 0.91, 0.91, 0.91, 1.07, 1.11, 1.14, 1.2, 1.29, 1.28, 1.29, 1.39, 1.37, 1.37, 1.41, 1.45, 1.45, 1.58, 1.63, 1.61, 1.63],
            sd: [0.093333, 0.098333, 0.113333, 0.103333, 0.103333, 0.103333, 0.106667, 0.106667, 0.106667, 0.106667, 0.106667, 0.106667, 0.101667, 0.098333, 0.106667, 0.14, 0.128333, 0.105, 0.12, 0.171667, 0.131667, 0.088333, 0.125, 0.128333, 0.12, 0.13, 0.148333, 0.156667, 0.163333]
        }
    }
};
