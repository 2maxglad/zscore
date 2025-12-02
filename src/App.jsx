import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import MeasurementInput from './components/MeasurementInput';
import LikeCounter from './components/LikeCounter';
import { PARAMETERS } from './data/parameters';
import { translations } from './utils/translations';
import './index.css';

function App() {
  const [language, setLanguage] = useState('ru');
  const t = translations[language];

  const [patientData, setPatientData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    bsa: 0
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Group parameters by 'group' property
  const groups = Object.values(PARAMETERS).reduce((acc, param) => {
    if (!acc[param.group]) acc[param.group] = [];
    acc[param.group].push(param);
    return acc;
  }, {});

  // Sort groups in a logical order
  const groupOrder = [
    'M-Mode (Kampmann)',
    'Aorta (Gautier)',
    'Aorta (Peterssen)',
    'Pulmonary (Peterssen)',
    'Valves (Zilberman)',
    'Coronary (Dallaire)',
    'Function (Koestenberger)'
  ];

  const sortedGroups = groupOrder
    .filter(groupName => groups[groupName])
    .map(groupName => [groupName, groups[groupName]]);

  // Filter parameters based on search query
  const filteredGroups = searchQuery
    ? sortedGroups.map(([groupName, params]) => [
      groupName,
      params.filter(param =>
        param.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (param.nameRu && param.nameRu.toLowerCase().includes(searchQuery.toLowerCase())) ||
        param.ref.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ]).filter(([_, params]) => params.length > 0)
    : sortedGroups;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{t.title}</h1>
        <div className="language-toggle">
          <button
            className={language === 'en' ? 'active' : ''}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button
            className={language === 'ru' ? 'active' : ''}
            onClick={() => setLanguage('ru')}
          >
            RU
          </button>
        </div>

        <LikeCounter language={language} />
      </header >

      <main className="app-main">
        <PatientForm
          data={patientData}
          onChange={setPatientData}
          language={language}
        />

        <div className="search-container">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              title={t.clearSearch}
            >
              ✕
            </button>
          )}
        </div>

        <div className="measurements-container">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(([groupName, params]) => (
              <div key={groupName} className="measurement-group">
                <h3>{groupName}</h3>
                {params.map(param => (
                  <MeasurementInput
                    key={param.id}
                    paramId={param.id}
                    patientData={patientData}
                    language={language}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>{t.noResults}</p>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>
                {t.tryAgain}
              </p>
            </div>
          )}
        </div>

      </main >
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        opacity: 0.1,
        fontSize: '10px',
        color: '#000',
        pointerEvents: 'none'
      }}>
        Data source: www.pediatricheartnetwork.org
      </footer>
    </div >
  );
}

export default App;
