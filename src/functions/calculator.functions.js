export const add = (firstTerm, secondTerm) => {
    return firstTerm + secondTerm;
};

export const subtract = (firstTerm, secondTerm) => {
    return firstTerm - secondTerm;
};

export const multiply = (firstFactor, secondFactor) => {
    return firstFactor * secondFactor;
};

export const divide = (dividend, divisor) => {
    return dividend / divisor;
};

export const squareRoot = (factor) => {
    return Math.sqrt(factor);
};

export const oneOverX = (factor) => {
    return 1 / factor;
};

export const xSquared = (factor) => {
    return Math.pow(factor, 2);
};

export const toggleSign = (factor) => {
    return multiply(factor, -1);
};

export const percentage = (dividend) => {
    return divide(dividend, 100);
};
