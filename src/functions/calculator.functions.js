const OPERATOR_TYPE = 'operator';
const DIGIT_TYPE = 'digit';
const ERROR_RESULT = 'ERROR';
const OPERATOR_CLEAR = 'clear';
const OPERATOR_CLEAR_LAST = 'clearLastEntry';

const calculatorParser = (cache, keypadButtonInfo) => {
    if (
        keypadButtonInfo.type === OPERATOR_TYPE &&
        keypadButtonInfo.operator === OPERATOR_CLEAR
    ) {
        resetCache(cache);
        return '0';
    }

    if (
        keypadButtonInfo.type === OPERATOR_TYPE &&
        keypadButtonInfo.operator === OPERATOR_CLEAR_LAST
    ) {
        clearLastEntry(cache);
        return '0';
    }

    // keypadButtonInfo must be digit if first input is empty
    if (cache.firstInput.length === 0 && keypadButtonInfo.type !== DIGIT_TYPE) {
        return ERROR_RESULT;
    }

    // Fill firstInput if no operator
    if (!cache.operator && keypadButtonInfo.type === DIGIT_TYPE) {
        const newFirstInputString = `${cache.firstInput}${keypadButtonInfo.text}`;
        const newFirstInputValue = Number.parseFloat(newFirstInputString);
        if (Number.isNaN(newFirstInputValue)) {
            return cache.firstInput.length > 0 ? cache.firstInput : '0';
        }
        cache.firstInput = newFirstInputString;
        return newFirstInputString;
    }

    return ERROR_RESULT;
};

// TODO: Implement generic parser
const parseEntry = (currentString, digitCharacter) => {
    //
}

const clearLastEntry = (cache) => {
    if (cache.operator) {
        cache.secondInput = '';
        cache.secondValue = 0;
        return;
    }

    if (!cache.operator) {
        cache.firstInput = '0';
        cache.firstValue = 0;
        return;
    }
};

const resetCache = (cache) => {
    cache.firstInput = '0';
    cache.firstValue = 0;
    cache.secondInput = '0';
    cache.secondValue = 0;
    cache.operator = null;
};

const calculate = (operations, keypadButtonInfo) => {
    if (
        keypadButtonInfo.type === OPERATOR_TYPE &&
        keypadButtonInfo.operator === 'clear'
    ) {
        operations = [];
        return '0';
    }

    if (operations.length === 0 && keypadButtonInfo.type === OPERATOR_TYPE) {
        return '0';
    }

    if (
        keypadButtonInfo.type === OPERATOR_TYPE &&
        keypadButtonInfo.operator === 'clearLastEntry'
    ) {
        operations.pop();
        return '';
    }

    return 'ERROR';
};

const add = (firstTerm, secondTerm) => {
    return firstTerm + secondTerm;
};

const subtract = (firstTerm, secondTerm) => {
    return firstTerm - secondTerm;
};

const multiply = (firstFactor, secondFactor) => {
    return firstFactor * secondFactor;
};

const divide = (dividend, divisor) => {
    return dividend / divisor;
};

const squareRoot = (factor) => {
    return Math.sqrt(factor);
};

const oneOverX = (factor) => {
    return 1 / factor;
};

const xSquared = (factor) => {
    return Math.pow(factor, 2);
};

const toggleSign = (factor) => {
    return multiply(factor, -1);
};

const percentage = (dividend) => {
    return divide(dividend, 100);
};

export default {
    calculatorParser,
    calculate,
    add,
    subtract,
    multiply,
    divide,
    squareRoot,
    oneOverX,
    xSquared,
    toggleSign,
    percentage,
};
