// const ERROR_RESULT = 'ERROR';
const OPERATOR_CLEAR = 'clear';
const OPERATOR_CLEAR_ENTRY = 'clearLastEntry';
const ZERO = '0';
const INPUT_TYPES = {
    OPERATOR: 'operator',
    DIGIT: 'digit',
};

const CalculatorConfigStandard = {
    percentage: {
        id: crypto.randomUUID(),
        operator: 'percent',
        type: INPUT_TYPES.OPERATOR,
    },
    clearLastEntry: {
        id: crypto.randomUUID(),
        operator: 'clearLastEntry',
        type: INPUT_TYPES.OPERATOR,
    },
    clear: {
        id: crypto.randomUUID(),
        operator: 'clear',
        type: INPUT_TYPES.OPERATOR,
    },
    backspace: {
        id: crypto.randomUUID(),
        operator: 'backspace',
        type: INPUT_TYPES.OPERATOR,
    },
    oneOverX: {
        id: crypto.randomUUID(),
        operator: 'oneOverX',
        type: INPUT_TYPES.OPERATOR,
    },
    xSquared: {
        id: crypto.randomUUID(),
        operator: 'xSquared',
        type: INPUT_TYPES.OPERATOR,
    },
    squareRoot: {
        id: crypto.randomUUID(),
        operator: 'squareRoot',
        type: INPUT_TYPES.OPERATOR,
    },
};

const isClearInput = (keypadButtonInfo) =>
    keypadButtonInfo.type === INPUT_TYPES.OPERATOR &&
    keypadButtonInfo.operator === OPERATOR_CLEAR;

const isClearEntryInput = (keypadButtonInfo) =>
    keypadButtonInfo.type === INPUT_TYPES.OPERATOR &&
    keypadButtonInfo.operator === OPERATOR_CLEAR_ENTRY;

/**
 * Parse keypadButton infos into calculator cache.
 * @param {Array} calcCache Array of input objects
 * @param {*} keypadButtonInfo Information of pressed key
 * @returns {Array} Returns new array of input objects
 */
const calculatorParserV2 = (calcCache, keypadButtonInfo) => {
    if (isClearInput(keypadButtonInfo)) {
        return [createCacheItem(ZERO, INPUT_TYPES.DIGIT)];
    }

    if (isClearEntryInput(keypadButtonInfo)) {
        return removeLastEntry(calcCache);
    }

    const lastEntry = calcCache.slice(-1)[0];
    if (isReplaceOperator(lastEntry, keypadButtonInfo)) {
        return replaceLastEntry(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo.type)
        );
    }

    if (isAddFirstDigit(lastEntry, keypadButtonInfo)) {
        const text = fixInput(keypadButtonInfo.text);
        return addEntry(
            calcCache,
            createCacheItem(text, keypadButtonInfo.type)
        );
    }

    if (isAddOperator(lastEntry, keypadButtonInfo)) {
        return addEntry(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo.type)
        );
    }

    if (isAddConsecutiveDigit(lastEntry, keypadButtonInfo)) {
        const text = fixInput(`${lastEntry.text}${keypadButtonInfo.text}`);

        console.log(`newText:${text} - oldText:${lastEntry.text}`);

        return replaceLastEntry(
            calcCache,
            createCacheItem(text, INPUT_TYPES.DIGIT)
        );
    }

    if (!lastEntry && keypadButtonInfo.type === INPUT_TYPES.DIGIT) {
        return addEntry(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo.type)
        );
    }

    handleOperator();
    handleDigit();

    return structuredClone(calcCache);
};

const handleOperator = () => {
    // this will do actual calculations;
};

const handleDigit = () => {
    // this will only parse input
};

const fixInput = (input) => {
    // replace leading decimal separator with zero
    let fixedInput = input === '.' ? '0.' : input;

    // remove leading zeroes
    fixedInput = /^0[0-9]+$/.test(fixedInput)
        ? fixedInput.substring(1)
        : fixedInput;

    // limit no of decimal separators
    const decimalSplitInput = fixedInput.split('.');
    fixedInput =
        decimalSplitInput.length > 2
            ? `${decimalSplitInput[0]}.${decimalSplitInput[1]}`
            : fixedInput;

    // limit length
    fixedInput = fixedInput.substring(0, 16);

    return fixedInput;
};

const createCacheItem = (text, type) => {
    return { text, type };
};

const getDisplayText = (cache) => {
    return cache.findLast((x) => x.type === INPUT_TYPES.DIGIT)?.text || ZERO;
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
    add,
    subtract,
    multiply,
    divide,
    squareRoot,
    oneOverX,
    xSquared,
    toggleSign,
    percentage,
    INPUT_TYPES,
    CalculatorConfigStandard,
    calculatorParserV2,
    getDisplayText,
};

function isAddFirstDigit(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === INPUT_TYPES.OPERATOR &&
        keypadButtonInfo.type === INPUT_TYPES.DIGIT
    );
}

function isAddConsecutiveDigit(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === INPUT_TYPES.DIGIT &&
        keypadButtonInfo.type === INPUT_TYPES.DIGIT
    );
}

function isAddOperator(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === INPUT_TYPES.DIGIT &&
        keypadButtonInfo.type === INPUT_TYPES.OPERATOR
    );
}

function isReplaceOperator(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === INPUT_TYPES.OPERATOR &&
        keypadButtonInfo.type === INPUT_TYPES.OPERATOR
    );
}

/**
 * Add operation to operations array.
 * @param {Array} entries Array of operations
 * @param {*} entry Operation to add
 * @returns {Array} Returns new array of operations
 */
function addEntry(entries, entry) {
    return entries.toSpliced(entries.length, 0, entry);
}

/**
 * Replace last operation in operations array.
 * @param {Array} entries Array of operations
 * @param {*} entry Operation to with replace
 * @returns {Array} Returns new array of operations
 */
function replaceLastEntry(entries, entry) {
    return entries.toSpliced(-1, 1, entry);
}

/**
 * Remove last operation from operations array.
 * @param {Array} entries Array of operations
 * @returns {Array} Returns new array of operations
 */
function removeLastEntry(entries) {
    const newEntries = entries.toSpliced(-1, 1);
    // operations.slice(0, -1);
    if (newEntries.length === 0) {
        return [createCacheItem(ZERO, INPUT_TYPES.DIGIT)];
    }

    return newEntries;
}
