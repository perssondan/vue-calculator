const OPERATOR_TYPE = 'operator';
const DIGIT_TYPE = 'digit';
// const ERROR_RESULT = 'ERROR';
const OPERATOR_CLEAR = 'clear';
const OPERATOR_CLEAR_LAST = 'clearLastEntry';
const ZERO = '0';

const OPERATOR_TYPES = {
    EQUALS: 'equals',
};

const CalculatorConfigStandard = {
    percentage: {
        id: crypto.randomUUID(),
        operator: 'percent',
        type: OPERATOR_TYPE,
    },
    clearLastEntry: {
        id: crypto.randomUUID(),
        operator: 'clearLastEntry',
        type: OPERATOR_TYPE,
    },
    clear: {
        id: crypto.randomUUID(),
        operator: 'clear',
        type: OPERATOR_TYPE,
    },
    backspace: {
        id: crypto.randomUUID(),
        operator: 'backspace',
        type: OPERATOR_TYPE,
    },
    oneOverX: {
        id: crypto.randomUUID(),
        operator: 'oneOverX',
        type: OPERATOR_TYPE,
    },
    xSquared: {
        id: crypto.randomUUID(),
        operator: 'xSquared',
        type: OPERATOR_TYPE,
    },
    squareRoot: {
        id: crypto.randomUUID(),
        operator: 'squareRoot',
        type: OPERATOR_TYPE,
    },
};

const isClearOperation = (keypadButtonInfo) =>
    keypadButtonInfo.type === OPERATOR_TYPE &&
    keypadButtonInfo.operator === OPERATOR_CLEAR;

const isClearLastOperation = (keypadButtonInfo) =>
    keypadButtonInfo.type === OPERATOR_TYPE &&
    keypadButtonInfo.operator === OPERATOR_CLEAR_LAST;

// const isFirstInput = (cache, keypadButtonInfo) =>
//     !cache.operator && keypadButtonInfo.type === DIGIT_TYPE;

// const isSecondInput = (cache, keypadButtonInfo) =>
//     cache.operator && keypadButtonInfo.type === DIGIT_TYPE;

// const isOperatorInput = (cache, keypadButtonInfo) =>
//     !cache.operator && keypadButtonInfo.type === OPERATOR_TYPE;

/**
 * Parse keypadButton infos into calculator cache.
 * @param {Array} calcCache Array of input objects
 * @param {*} keypadButtonInfo Information of pressed key
 * @returns {Array} Returns new array of input objects
 */
const calculatorParserV2 = (calcCache, keypadButtonInfo) => {
    if (isClearOperation(keypadButtonInfo)) {
        return [createCacheItem(ZERO, DIGIT_TYPE)];
    }

    // const clonedCache = structuredClone(calcCache);

    if (isClearLastOperation(keypadButtonInfo)) {
        return removeLastOperation(calcCache);
    }

    const lastEntry = calcCache.slice(-1)[0];
    if (
        lastEntry?.type === OPERATOR_TYPE &&
        keypadButtonInfo.type === OPERATOR_TYPE
    ) {
        // replace last operation
        return replaceLastOperation(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo.type)
        );
    } else if (
        lastEntry?.type === OPERATOR_TYPE &&
        keypadButtonInfo.type === DIGIT_TYPE
    ) {
        return addOperation(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo.type)
        );
    } else if (
        lastEntry?.type === DIGIT_TYPE &&
        keypadButtonInfo.type === OPERATOR_TYPE
    ) {
        return addOperation(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo.type)
        );
    } else if (
        lastEntry?.type === DIGIT_TYPE &&
        keypadButtonInfo.type === DIGIT_TYPE
    ) {
        // update last entry
        const text = `${lastEntry.text}${keypadButtonInfo.text}`;
        return replaceLastOperation(
            calcCache,
            createCacheItem(text, DIGIT_TYPE)
        );
    } else if (!lastEntry && keypadButtonInfo.type === DIGIT_TYPE) {
        return addOperation(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo.type)
        );
    }

    if (
        keypadButtonInfo.type === OPERATOR_TYPE &&
        keypadButtonInfo.operator === OPERATOR_TYPES.EQUALS
    ) {
        // evaluate
        // const result = evaluateCache(clonedCache);
        // clonedCache.splice(0, clonedCache.length, result);
    }

    return structuredClone(calcCache);
};

const createCacheItem = (text, type) => {
    return { text, type };
};

const getDisplayText = (cache) => {
    return cache.findLast((x) => x.type === DIGIT_TYPE)?.text || ZERO;
};

// const buildEntry = (currentString, digitCharacter) => {
//     console.log('currentString', currentString, digitCharacter);
//     const result = {
//         display: currentString.length > 0 ? currentString : '0',
//         parsedInput: '',
//         success: false,
//     };

//     const parsedString = `${currentString}${digitCharacter}`;
//     console.log('parsedString', parsedString);

//     // Guard that we can't type multiple zeroes at start
//     if (isLeadingZeroes(currentString, digitCharacter)) {
//         result.success = true;
//         result.parsedInput = digitCharacter;
//         result.display = digitCharacter;
//         return result;
//     }

//     // Make sure no duplicate decimal separators.
//     if (isDuplicateDecimal(parsedString)) {
//         return result;
//     }

//     if (isNaN(parsedString)) {
//         return result;
//     }

//     result.success = true;
//     result.parsedInput = parsedString;
//     result.display = parsedString;
//     return result;
// };

// const isDuplicateDecimal = (valueString) => {
//     return occurrences(valueString, '.', false) > 1;
// };

// const isNaN = (valueString) => {
//     const parsedValue = Number.parseFloat(valueString);
//     return Number.isNaN(parsedValue);
// };

// function isLeadingZeroes(currentString, digitCharacter) {
//     return (
//         currentString === '0' && digitCharacter >= '0' && digitCharacter <= '9'
//     );
// }

// function occurrences(string, subString, allowOverlapping) {
//     string += '';
//     subString += '';
//     if (subString.length <= 0) return string.length + 1;

//     var n = 0,
//         pos = 0,
//         step = allowOverlapping ? 1 : subString.length;

//     // eslint-disable-next-line no-constant-condition
//     while (true) {
//         pos = string.indexOf(subString, pos);
//         if (pos >= 0) {
//             ++n;
//             pos += step;
//         } else break;
//     }
//     return n;
// }

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
    add,
    subtract,
    multiply,
    divide,
    squareRoot,
    oneOverX,
    xSquared,
    toggleSign,
    percentage,
    OPERATOR_TYPE,
    DIGIT_TYPE,
    CalculatorConfigStandard,
    calculatorParserV2,
    getDisplayText,
};

/**
 * Add operation to operations array.
 * @param {Array} operations Array of operations
 * @param {*} operation Operation to add
 * @returns {Array} Returns new array of operations
 */
function addOperation(operations, operation) {
    return operations.toSpliced(operations.length, 0, operation);
}

/**
 * Replace last operation in operations array.
 * @param {Array} operations Array of operations
 * @param {*} operation Operation to replace
 * @returns {Array} Returns new array of operations
 */
function replaceLastOperation(operations, operation) {
    return operations.toSpliced(-1, 1, operation);
}

/**
 * Remove last operation from operations array.
 * @param {Array} operations Array of operations
 * @returns {Array} Returns new array of operations
 */
function removeLastOperation(operations) {
    const newOperations = operations.toSpliced(-1, 1);
    // operations.slice(0, -1);
    if (newOperations.length === 0) {
        return [createCacheItem(ZERO, DIGIT_TYPE)];
    }

    return newOperations;
}

// eslint-disable-next-line no-unused-vars
function buildText(currentText, textToAdd) {
    return `${currentText}${textToAdd}`;
}
