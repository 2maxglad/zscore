import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import MeasurementInput from './components/MeasurementInput';
import { PARAMETERS } from './data/parameters';
import './index.css';

function App() {
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
        param.nameRu?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        param.ref.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ]).filter(([_, params]) => params.length > 0)
    : sortedGroups;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>❤️ Калькулятор Z-Score (ЭхоКГ)</h1>
      </header>

      <main className="app-main">
        <PatientForm data={patientData} onChange={setPatientData} />

        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Поиск параметров (название, русское название, источник)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              title="Очистить поиск"
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
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>😕 Ничего не найдено</p>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>
                Попробуйте другой запрос
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
