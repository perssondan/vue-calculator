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
        const result = buildEntry(cache.firstInput, keypadButtonInfo.text);
        if (result.success) {
            cache.firstInput = result.parsedInput;
        }
        return result.display;
    }

    // Fill in operator
    if (!cache.operator && keypadButtonInfo.type === OPERATOR_TYPE) {
        handleOperator(keypadButtonInfo.operator);
        cache.operator = keypadButtonInfo.operator;
        return cache.firstInput;
    }

    // Fill second input
    if (cache.operator && keypadButtonInfo.type === DIGIT_TYPE) {
        const result = buildEntry(cache.secondInput, keypadButtonInfo.text);
        if (result.success) {
            cache.secondInput = result.parsedInput;
        }
        return result.display;
    }

    if (cache.operator && keypadButtonInfo.type === OPERATOR_TYPE) {
        switch (keypadButtonInfo.operator) {
            case 'equals':
                break;
            default:
                break;
        }
        console.log('current cache', cache);
    }

    return ERROR_RESULT;
};

const handleOperator = (operator) => {
    switch (operator) {
        case 'equals':
            break;
        default:
            break;
    }
};

// const executeEquals = (cache) => {

// };

// const executeAdd = (cache) => {
//     return add(
//         Math.parseFloat(
//             cache.firstInput,
//             cache.secondInput ? cache.secondInput : cache.firstInput
//         )
//     );
// };

const buildEntry = (currentString, digitCharacter) => {
    const result = {
        display: currentString.length > 0 ? currentString : '0',
        parsedInput: '',
        success: false,
    };

    if (
        currentString === '0' &&
        digitCharacter >= '0' &&
        digitCharacter <= '9'
    ) {
        result.success = true;
        result.parsedInput = digitCharacter;
        result.display = digitCharacter;
        return result;
    }
    const parsedString = `${currentString}${digitCharacter}`;
    // Make sure no duplicate decimal separators.
    if (occurrences(parsedString, '.', false) > 1) {
        return result;
    }

    const parsedStringNumber = Number.parseFloat(parsedString);
    if (Number.isNaN(parsedStringNumber)) {
        return result;
    }
    const testParseBack = `${parsedStringNumber}`;
    console.log('back parse', testParseBack);
    result.success = true;
    result.parsedInput = parsedString;
    result.display = parsedString;
    return result;
};

function occurrences(string, subString, allowOverlapping) {
    string += '';
    subString += '';
    if (subString.length <= 0) return string.length + 1;

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
// const humanize = (x) => {
//     return x.replace(/\.?0*$/, '');
// };

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
