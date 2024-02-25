// const ERROR_RESULT = 'ERROR';
const ZERO = '0';
const KEY_TYPES = {
    OPERATION: 'operation', // basic operations
    NUMBER: 'number', // 0-9, decimalSeparator
    EDIT: 'edit', // backspace, clear, clearLastEntry
    FUNCTION: 'function', // oneOverX, xSquared, squareRoot, toggleSign, percentage
};

const KEYS = {
    NUMBERS: {
        zero: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '0',
        },
        one: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '1',
        },
        two: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '2',
        },
        three: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '3',
        },
        four: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '4',
        },
        five: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '5',
        },
        six: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '6',
        },
        seven: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '7',
        },
        eight: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '8',
        },
        nine: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '9',
        },
        decimalSeparator: {
            id: crypto.randomUUID(),
            type: KEY_TYPES.NUMBER,
            digit: '.',
        },
    },
    OPERATIONS: {
        divide: {
            id: crypto.randomUUID(),
            operator: 'divide',
            type: KEY_TYPES.OPERATION,
        },
        multiply: {
            id: crypto.randomUUID(),
            operator: 'multiply',
            type: KEY_TYPES.OPERATION,
        },
        subtract: {
            id: crypto.randomUUID(),
            operator: 'subtract',
            type: KEY_TYPES.OPERATION,
        },
        add: {
            id: crypto.randomUUID(),
            operator: 'add',
            type: KEY_TYPES.OPERATION,
        },
        equals: {
            id: crypto.randomUUID(),
            operator: 'equals',
            type: KEY_TYPES.OPERATION,
        },
    },
    EDITS: {
        clearLastEntry: {
            id: crypto.randomUUID(),
            operator: 'clearLastEntry',
            type: KEY_TYPES.EDIT,
        },
        clear: {
            id: crypto.randomUUID(),
            operator: 'clear',
            type: KEY_TYPES.EDIT,
        },
        backspace: {
            id: crypto.randomUUID(),
            operator: 'backspace',
            type: KEY_TYPES.EDIT,
        },
    },
    FUNCTIONS: {
        percentage: {
            id: crypto.randomUUID(),
            operator: 'percent',
            type: KEY_TYPES.FUNCTION,
        },
        oneOverX: {
            id: crypto.randomUUID(),
            operator: 'oneOverX',
            type: KEY_TYPES.FUNCTION,
        },
        xSquared: {
            id: crypto.randomUUID(),
            operator: 'xSquared',
            type: KEY_TYPES.FUNCTION,
        },
        squareRoot: {
            id: crypto.randomUUID(),
            operator: 'squareRoot',
            type: KEY_TYPES.FUNCTION,
        },
        toggleSign: {
            id: crypto.randomUUID(),
            operator: 'toggleSign',
            type: KEY_TYPES.FUNCTION,
        },
    },
};

const isClearAllEntries = (keypadButtonInfo) =>
    keypadButtonInfo.id === KEYS.EDITS.clear.id;

const isClearLastEntry = (keypadButtonInfo) =>
    keypadButtonInfo.id == KEYS.EDITS.clearLastEntry.id;

const updateCacheFromInput = (calcCache, keypadButtonInfo) => {
    if (isClearAllEntries(keypadButtonInfo)) {
        return [createCacheItem(ZERO, KEYS.NUMBERS.zero)];
    }

    if (isClearLastEntry(keypadButtonInfo)) {
        return removeLastEntry(calcCache);
    }

    const lastEntry = calcCache.slice(-1)[0];
    if (isBackspaceEntry(lastEntry, keypadButtonInfo)) {
        console.debug('backspace');
        // if (lastEntry?.type === INPUT_TYPES.DIGIT) {
        const text = lastEntry.text.substring(0, lastEntry.text.length - 1);
        return replaceLastEntry(
            calcCache,
            createCacheItem(text.length === 0 ? ZERO : text, lastEntry)
        );
        // }
        // return structuredClone(calcCache);
    }

    if (isReplaceOperatorEntry(lastEntry, keypadButtonInfo)) {
        console.debug('replace operator');
        return replaceLastEntry(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo)
        );
    }

    if (isAddFirstDigit(lastEntry, keypadButtonInfo)) {
        console.debug('add first digit');
        const text = fixInput(keypadButtonInfo.digit);
        return addEntry(calcCache, createCacheItem(text, keypadButtonInfo));
    }

    if (isAddOperatorEntry(lastEntry, keypadButtonInfo)) {
        console.debug('add operator');
        return addEntry(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo)
        );
    }

    if (isAddConsecutiveDigit(lastEntry, keypadButtonInfo)) {
        console.debug('add consecutive digit');
        const text = fixInput(`${lastEntry.text}${keypadButtonInfo.digit}`);

        return replaceLastEntry(
            calcCache,
            createCacheItem(text, {
                type: KEY_TYPES.NUMBER,
                id: lastEntry.id,
            })
        );
    }

    if (!lastEntry && keypadButtonInfo.type === KEY_TYPES.NUMBER) {
        throw new Error('No last entry. Expe');
    }

    console.warn('No action taken');

    return structuredClone(calcCache);
};

/**
 * Parse keypadButton infos into calculator cache.
 * @param {Array} calcCache Array of input objects
 * @param {*} keypadButtonInfo Information of pressed key
 * @returns {Array} Returns new array of input objects
 */
const calculatorParser = (calcCache, keypadButtonInfo) => {
    const updatedCache = updateCacheFromInput(calcCache, keypadButtonInfo);

    const lastEntry = calcCache.slice(-1)[0];
    if (lastEntry?.type === KEY_TYPES.OPERATION) {
        return updatedCache;
    }

    return updatedCache;
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

const createCacheItem = (text, inputInfo) => {
    return { text, type: inputInfo.type, id: inputInfo.id };
};

const getDisplayText = (cache) => {
    return cache.findLast((x) => x.type === KEY_TYPES.NUMBER)?.text || ZERO;
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
    KEY_TYPES,
    calculatorParser,
    getDisplayText,
    KEYS,
};

function isAddFirstDigit(lastEntry, keypadButtonInfo) {
    return (
        (!lastEntry || lastEntry.type === KEY_TYPES.OPERATION) &&
        keypadButtonInfo.type === KEY_TYPES.NUMBER
    );
}

function isAddConsecutiveDigit(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === KEY_TYPES.NUMBER &&
        keypadButtonInfo.type === KEY_TYPES.NUMBER
    );
}

function isAddOperatorEntry(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === KEY_TYPES.NUMBER &&
        keypadButtonInfo.type === KEY_TYPES.OPERATION
    );
}

function isBackspaceEntry(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === KEY_TYPES.NUMBER &&
        keypadButtonInfo.id === KEYS.EDITS.backspace.id
    );
}

function isReplaceOperatorEntry(lastEntry, keypadButtonInfo) {
    return (
        lastEntry?.type === KEY_TYPES.OPERATION &&
        keypadButtonInfo.type === KEY_TYPES.OPERATION
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
        return [createCacheItem(ZERO, KEYS.NUMBERS.zero)];
    }

    return newEntries;
}
