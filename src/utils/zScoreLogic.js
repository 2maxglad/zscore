/**
 * Z-Score Calculation Logic
 * Ported from legacy z-values.js and common.js
 */

// --- LMS Method ---

/**
 * Calculate Z-score from LMS parameters
 * Z = ((X/M)^L - 1) / (L * S)
 */
export function getZFromLMS(value, l, m, s) {
    if (value <= 0 || !m || !s) return -100;
    if (l === 0) {
        return Math.log(value / m) / s;
    }
    return (Math.pow(value / m, l) - 1) / (l * s);
}

/**
 * Calculate Value from Z-score and LMS parameters
 * X = M * (1 + L * S * Z)^(1/L)
 */
export function getValueFromLMS(z, l, m, s) {
    if (!m || !s) return -100;
    if (l === 0) {
        return m * Math.exp(s * z);
    }
    return m * Math.pow(1 + l * s * z, 1 / l);
}

// --- Mean/SD Method ---

/**
 * Calculate Z-score from Mean and SD
 * Z = (Value - Mean) / SD
 */
export function getZFromMeanSD(value, mean, sd) {
    if (!sd) return -100;
    return (value - mean) / sd;
}

/**
 * Calculate Value from Z-score, Mean, and SD
 * Value = Mean + (Z * SD)
 */
export function getValueFromMeanSD(z, mean, sd) {
    return mean + z * sd;
}

// --- Polynomial / Coefficient Method (for Aorta etc.) ---

/**
 * Calculate Z-score using polynomial coefficients based on BSA
 * Used in Peterssen references
 */
export function getZFromCoefficients(value, bsa, coeffs) {
    // coeffs: [intercept, b1, b2, b3, mse, r2]
    // ln(mean) = intercept + b1*BSA + b2*BSA^2 + b3*BSA^3
    // Z = (ln(value) - ln(mean)) / sqrt(mse)

    if (coeffs.length !== 6 || bsa <= 0 || value <= 0) return -100;

    const [intercept, b1, b2, b3, mse] = coeffs;
    const predictedLogMean = intercept + b1 * bsa + b2 * Math.pow(bsa, 2) + b3 * Math.pow(bsa, 3);

    // Legacy code uses Math.log(c/10) -> converting mm to cm?
    // Let's assume input value is in mm.
    const z = (Math.log(value / 10) - predictedLogMean) / Math.sqrt(mse);
    return z;
}

export function getValueFromCoefficients(z, bsa, coeffs) {
    if (coeffs.length !== 6 || bsa <= 0) return -100;

    const [intercept, b1, b2, b3, mse] = coeffs;
    const predictedLogMean = intercept + b1 * bsa + b2 * Math.pow(bsa, 2) + b3 * Math.pow(bsa, 3);

    // ln(X) = predictedLogMean + Z * sqrt(mse)
    // X = exp(...)
    // Legacy multiplies by 10 at the end, implying return to mm.
    const value = Math.exp(predictedLogMean + z * Math.sqrt(mse)) * 10;
    return value;
}

// --- Percentile Calculation ---

/**
 * Calculate Percentile from Z-score
 * Approximation of standard normal cumulative distribution function
 */
export function getPercentileFromZ(z) {
    if (z < -6.5) return 0;
    if (z > 6.5) return 1;

    const factK = 1 / (Math.sqrt(2 * Math.PI));
    let sum = 0;
    const term = 1 / (1 + 0.2316419 * Math.abs(z));
    const k = term;

    const a1 = 0.319381530;
    const a2 = -0.356563782;
    const a3 = 1.781477937;
    const a4 = -1.821255978;
    const a5 = 1.330274429;

    const poly = a1 * k + a2 * Math.pow(k, 2) + a3 * Math.pow(k, 3) + a4 * Math.pow(k, 4) + a5 * Math.pow(k, 5);
    const phi = 1 - factK * Math.exp(-z * z / 2) * poly;

    return z >= 0 ? phi : 1 - phi;
}

// --- Interpolation Logic ---

/**
 * Calculate Z-score by interpolating between two grid points
 * Legacy method: Calculate Z at lower and upper grid points, then interpolate Z.
 */
export function getInterpolatedZScore(value, gridValue, grid, meanArray, sdArray) {
    if (gridValue < grid[0] || gridValue > grid[grid.length - 1]) return -100;

    let lowerIndex = -1;
    let upperIndex = -1;

    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === gridValue) {
            lowerIndex = i;
            upperIndex = i;
            break;
        } else if (grid[i] > gridValue) {
            upperIndex = i;
            lowerIndex = i - 1;
            break;
        }
    }

    if (lowerIndex === -1) return -100;

    const ratio = (gridValue - grid[lowerIndex]) / (grid[upperIndex] - grid[lowerIndex]);

    const meanLower = meanArray[lowerIndex];
    const sdLower = sdArray[lowerIndex];
    const meanUpper = meanArray[upperIndex];
    const sdUpper = sdArray[upperIndex];

    const zLower = (value - meanLower) / sdLower;
    const zUpper = (value - meanUpper) / sdUpper;

    if (lowerIndex === upperIndex) return zLower;

    return zLower + ratio * (zUpper - zLower);
}
