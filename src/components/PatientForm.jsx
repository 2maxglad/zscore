import React, { useEffect } from 'react';
import { calculateBSA } from '../utils/bsa';

const PatientForm = ({ data, onChange }) => {
    const { age, weight, height, gender, bsa } = data;

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
            <h2>📊 Данные пациента</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                    <label>Пол</label>
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
                            <span>👨 Мужской</span>
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
                            <span>👩 Женский</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label>Возраст (лет)</label>
                    <input
                        type="number"
                        name="age"
                        value={age}
                        onChange={handleChange}
                        placeholder="Введите возраст"
                    />
                </div>

                <div>
                    <label>Вес (кг)</label>
                    <input
                        type="number"
                        name="weight"
                        value={weight}
                        onChange={handleChange}
                        placeholder="Введите вес"
                        step="0.1"
                    />
                </div>

                <div>
                    <label>Рост (см)</label>
                    <input
                        type="number"
                        name="height"
                        value={height}
                        onChange={handleChange}
                        placeholder="Введите рост"
                        step="0.1"
                    />
                </div>
            </div>

            <div className="bsa-display">
                <strong>Площадь поверхности тела (BSA):</strong> {bsa ? `${bsa.toFixed(3)} м²` : 'Введите вес и рост'}
            </div>
        </div>
    );
};

export default PatientForm;
