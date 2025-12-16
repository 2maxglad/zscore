# 🫀 Cardiac Z-Score Calculator

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://zscore-echo.netlify.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Pediatric Echocardiography Z-Score Calculator** — a web application for calculating Z-scores of cardiac structures based on Body Surface Area (BSA), age, weight, and gender.

🌐 **Live Demo:** [https://zscore-echo.netlify.app/](https://zscore-echo.netlify.app/)

---

## 📖 About

Z-scores are essential in pediatric cardiology for comparing cardiac measurements to age- and size-matched normal values. This calculator provides instant Z-score calculations for various cardiac parameters, helping clinicians identify abnormalities and track patient progress.

### ✨ Key Features

- 🧮 **Multiple BSA formulas** — DuBois, Mosteller, and Haycock
- 📊 **Interactive charts** — visualize Z-scores with Highcharts
- 🌍 **Bilingual support** — Russian and English interfaces
- 📱 **Responsive design** — works on desktop and mobile devices
- ⚡ **Real-time calculations** — instant results as you type
- 🔍 **Parameter search** — quickly find specific measurements
- 📋 **Collapsible groups** — organized by reference source

---

## 📐 Supported Parameters

### M-Mode (Kampmann et al. 2000)
| Parameter | Description (EN) | Description (RU) |
|-----------|------------------|------------------|
| RVAWd | RV Anterior Wall (diastole) | Передняя стенка ПЖ (диастола) |
| RVDD | RV Diameter (diastole) | Диаметр ПЖ (диастола) |
| IVSd | Interventricular Septum (diastole) | Межжелудочковая перегородка (диастола) |
| LVEDD | LV End-Diastolic Diameter | Конечно-диастолический размер ЛЖ |
| LVESD | LV End-Systolic Diameter | Конечно-систолический размер ЛЖ |
| LVPWd | LV Posterior Wall (diastole) | Задняя стенка ЛЖ (диастола) |

### Aortic Valve and Root (Gautier et al. 2010)
| Parameter | Description (EN) | Description (RU) |
|-----------|------------------|------------------|
| Anulus | Aortic Annulus | Фиброзное кольцо аорты |
| SoV | Sinuses of Valsalva | Синусы Вальсальвы |
| STJ | Sinotubular Junction | Синотубулярное соединение |
| Asc. Ao | Ascending Aorta | Восходящая аорта |

### Aortic Arch (Peterssen et al. 2008)
| Parameter | Description (EN) | Description (RU) |
|-----------|------------------|------------------|
| Transv. arch | Transverse Arch | Поперечная дуга аорты |
| Isthmus | Aortic Isthmus | Перешеек аорты |
| Distal arch | Distal Arch | Дистальная дуга аорты |
| Desc. Ao | Descending Aorta | Нисходящая аорта |

### Pulmonary Arteries (Peterssen et al. 2008)
| Parameter | Description (EN) | Description (RU) |
|-----------|------------------|------------------|
| MPA | Main Pulmonary Artery | Главная легочная артерия |
| LPA | Left Pulmonary Artery | Левая легочная артерия |
| RPA | Right Pulmonary Artery | Правая легочная артерия |

### Heart Valves (Zilberman et al. 2008)
| Parameter | Description (EN) | Description (RU) |
|-----------|------------------|------------------|
| PV | Pulmonary Valve | Клапан легочной артерии |
| MV | Mitral Valve | Митральный клапан |
| TV | Tricuspid Valve | Трикуспидальный клапан |
| AoV | Aortic Valve | Аортальный клапан |

### Coronary Arteries (Dallaire et al. 2011)
| Parameter | Description (EN) | Description (RU) |
|-----------|------------------|------------------|
| LMCA | Left Main Coronary Artery | Левая главная коронарная артерия |
| Cx | Circumflex Artery | Огибающая артерия |
| LAD | Left Anterior Descending | Передняя нисходящая артерия |
| RCAprox | Right Coronary Artery (proximal) | ПКА проксимальная |
| RCAmed | Right Coronary Artery (mid) | ПКА средняя |
| RCAdist | Right Coronary Artery (distal) | ПКА дистальная |

### Ventricular Function (Koestenberger et al. 2009, 2012)
| Parameter | Description (EN) | Description (RU) |
|-----------|------------------|------------------|
| TAPSE | Tricuspid Annular Plane Systolic Excursion | Систолическая экскурсия кольца ТК |
| MAPSE | Mitral Annular Plane Systolic Excursion | Систолическая экскурсия кольца МК |

---

## 🧮 Calculation Methods

The calculator uses several statistical methods depending on the parameter source:

### LMS Method
```
Z = ((X/M)^L - 1) / (L × S)
```
Where X is the measurement, and L, M, S are the Box-Cox power, median, and generalized coefficient of variation.

### Mean/SD Method
```
Z = (Value - Mean) / SD
```
Standard Z-score calculation using mean and standard deviation.

### Polynomial Coefficients (Peterssen)
```
ln(mean) = intercept + b1×BSA + b2×BSA² + b3×BSA³
Z = (ln(value) - ln(mean)) / √MSE
```
Used for aortic and pulmonary measurements.

### Log-Linear Regression (Gautier, Zilberman)
Gender-specific calculations with logarithmic transformation.

### Square Root Model (Dallaire)
Coronary artery measurements based on √BSA.

---

## 🧪 BSA Formulas

| Formula | Equation |
|---------|----------|
| **DuBois** | BSA = 0.007184 × Weight^0.425 × Height^0.725 |
| **Haycock** | BSA = 0.024265 × Height^0.3964 × Weight^0.5378 |
| **Mosteller** | BSA = √((Height × Weight) / 3600) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/2maxglad/zscore.git

# Navigate to project directory
cd zscore

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI Framework |
| [Vite 6](https://vitejs.dev/) | Build Tool |
| [Highcharts](https://www.highcharts.com/) | Interactive Charts |
| [Netlify](https://www.netlify.com/) | Hosting & Deployment |

---

## 📁 Project Structure

```
zscore/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── MeasurementInput.jsx   # Parameter input fields
│   │   ├── PatientForm.jsx        # Patient data form
│   │   └── ZScoreChart.jsx        # Z-score visualization
│   ├── data/
│   │   ├── parameters.js          # Parameter definitions & reference data
│   │   └── tooltips.js            # Parameter descriptions
│   ├── utils/
│   │   ├── bsa.js                 # BSA calculation formulas
│   │   ├── translations.js        # i18n strings
│   │   └── zScoreLogic.js         # Z-score calculation algorithms
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 📚 References

The Z-score equations used in this calculator are based on peer-reviewed publications:

1. **Kampmann C, et al.** (2000). Normal values of M mode echocardiographic measurements of more than 2000 healthy infants and children in central Europe. *Heart*, 83(6), 667-672.

2. **Gautier M, et al.** (2010). Nomograms for aortic root diameters in children using two-dimensional echocardiography. *Am J Cardiol*, 105(6), 888-894.

3. **Peterssen S, et al.** (2008). Regression equations for calculation of z scores of cardiac structures in a large cohort of healthy infants, children, and adolescents. *J Am Soc Echocardiogr*, 21(8), 922-934.

4. **Zilberman MV, et al.** (2008). Regression formulas for calculation of z scores of cardiac structures in a large cohort of healthy infants, children, and adolescents. *J Am Soc Echocardiogr*, 18(2), 189-195.

5. **Dallaire F, et al.** (2011). New equations and a critical appraisal of coronary artery Z scores in healthy children. *J Am Soc Echocardiogr*, 24(1), 60-74.

6. **Koestenberger M, et al.** (2009, 2012). Reference values for TAPSE and MAPSE in healthy children and adolescents.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚠️ Disclaimer

This calculator is intended for **educational and research purposes only**. It should not be used as the sole basis for clinical decision-making. Always verify calculations and consult appropriate clinical guidelines and literature.

---

## 📝 License

This project is open source. Please check the repository for license information.

---

## 👤 Author

**2maxglad**

- GitHub: [@2maxglad](https://github.com/2maxglad)

---

<p align="center">
  Made with ❤️ for the pediatric cardiology community
</p>
