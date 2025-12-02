import React, { useEffect } from 'react';
import { calculateBSA } from '../utils/bsa';
import { translations } from '../utils/translations';

const PatientForm = ({ data, onChange, language }) => {
    const { age, weight, height, gender, bsa } = data;
    const t = translations[language];

    useEffect(() => {
        if (weight && height) {
            const newBsa = calculateBSA(parseFloat(height), parseFloat(weight));
            if (newBsa !== bsa) {
                onChange({ ...data, bsa: newBsa });
            }
        }
    }, [weight, height]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    return (
        <div className="patient-form">
            <h2>{t.patientData}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                    <label>{t.gender}</label>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={handleChange}
                                style={{ marginRight: '8px' }}
                            />
                            <span>{t.male}</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={handleChange}
                                style={{ marginRight: '8px' }}
                            />
                            <span>{t.female}</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label>{t.age}</label>
                    <input
                        type="number"
                        name="age"
                        value={age}
                        onChange={handleChange}
                        placeholder={t.enterAge}
                    />
                </div>

                <div>
                    <label>{t.weight}</label>
                    <input
                        type="number"
                        name="weight"
                        value={weight}
                        onChange={handleChange}
                        placeholder={t.enterWeight}
                        step="0.1"
                    />
                </div>

                <div>
                    <label>{t.height}</label>
                    <input
                        type="number"
                        name="height"
                        value={height}
                        onChange={handleChange}
                        placeholder={t.enterHeight}
                        step="0.1"
                    />
                </div>
            </div>

            <div className="bsa-display">
                <strong>{t.bsa}:</strong> {bsa ? `${bsa.toFixed(3)} m²` : t.enterWeightHeight}
            </div>
        </div>
    );
};

export default PatientForm;
