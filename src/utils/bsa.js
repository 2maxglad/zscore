/**
 * Body Surface Area (BSA) Calculators
 */

/**
 * DuBois Formula
 * BSA = 0.007184 * Weight^0.425 * Height^0.725
 * @param {number} height - Height in cm
 * @param {number} weight - Weight in kg
 * @returns {number} BSA in m²
 */
export function bsaDuBois(height, weight) {
    if (!height || !weight) return 0;
    let bsa = Math.pow(weight, 0.425) * Math.pow(height, 0.725) * 0.007184;
    return Math.round(bsa * 1000) / 1000;
}

/**
 * Haycock Formula
 * BSA = 0.024265 * Height^0.3964 * Weight^0.5378
 * @param {number} height - Height in cm
 * @param {number} weight - Weight in kg
 * @returns {number} BSA in m²
 */
export function bsaHaycock(height, weight) {
    if (!height || !weight) return 0;
    let bsa = 0.024265 * Math.pow(height, 0.3964) * Math.pow(weight, 0.5378);
    return Math.round(bsa * 1000) / 1000;
}

/**
 * Mosteller Formula
 * BSA = sqrt((Height * Weight) / 3600)
 * @param {number} height - Height in cm
 * @param {number} weight - Weight in kg
 * @returns {number} BSA in m²
 */
export function bsaMosteller(height, weight) {
    if (!height || !weight) return 0;
    let bsa = Math.sqrt((height * weight) / 3600);
    return Math.round(bsa * 1000) / 1000;
}

/**
 * Calculate BSA based on selected method
 * @param {number} height - Height in cm
 * @param {number} weight - Weight in kg
 * @param {'DuBois' | 'Mosteller' | 'Haycock'} method
 * @returns {number} BSA in m²
 */
export function calculateBSA(height, weight, method = 'DuBois') {
    switch (method) {
        case 'DuBois':
            return bsaDuBois(height, weight);
        case 'Mosteller':
            return bsaMosteller(height, weight);
        case 'Haycock':
            return bsaHaycock(height, weight);
        default:
            return bsaDuBois(height, weight);
    }
}
