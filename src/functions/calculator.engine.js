import { KEYS, ZERO, KEY_TYPES } from './calculator.constants';

const isClearAllEntries = (keypadButtonInfo) =>
    keypadButtonInfo.id === KEYS.EDITS.clear.id;

const isClearLastEntry = (keypadButtonInfo) =>
    keypadButtonInfo.id == KEYS.EDITS.clearLastEntry.id;

const updateCacheFromInput = (calcCache, keypadButtonInfo) => {
    const lastEntry = getLastEntry(calcCache);

    if (isReplaceOperatorEntry(lastEntry, keypadButtonInfo)) {
        return replaceLastEntry(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo)
        );
    }

    if (isAddFirstDigit(lastEntry, keypadButtonInfo)) {
        const text = fixInput(keypadButtonInfo.digit);
        return addEntry(calcCache, createCacheItem(text, keypadButtonInfo));
    }

    if (isAddOperatorEntry(lastEntry, keypadButtonInfo)) {
        return addEntry(
            calcCache,
            createCacheItem(keypadButtonInfo.text, keypadButtonInfo)
        );
    }

    if (isAddConsecutiveDigit(lastEntry, keypadButtonInfo)) {
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
        throw new Error(
            'No last entry. Expected to have at least one entry in cache.'
        );
    }

    return structuredClone(calcCache);
};

function getLastEntry(calcCache) {
    return calcCache.slice(-1)[0];
}

const handleEditInputs = (calcCache, keypadButtonInfo) => {
    if (isClearAllEntries(keypadButtonInfo)) {
        return [createCacheItem(ZERO, KEYS.NUMBERS.zero)];
    }

    if (isClearLastEntry(keypadButtonInfo)) {
        return removeLastEntry(calcCache);
    }

    const lastEntry = getLastEntry(calcCache);
    if (isBackspaceEntry(lastEntry, keypadButtonInfo)) {
        console.debug('backspace');
        const text = lastEntry.text.substring(0, lastEntry.text.length - 1);
        return replaceLastEntry(
            calcCache,
            createCacheItem(text.length === 0 ? ZERO : text, lastEntry)
        );
    }

    return structuredClone(calcCache);
};

/**
 * Parse keypadButton infos into calculator cache.
 * @param {Array} calcCache Array of input objects
 * @param {*} keypadButtonInfo Information of pressed key
 * @returns {Array} Returns new array of input objects
 */
const calculatorParser = (calcCache, keypadButtonInfo) => {
    let updatedCache = handleEditInputs(calcCache, keypadButtonInfo);
    updatedCache = updateCacheFromInput(updatedCache, keypadButtonInfo);

    return calculate(updatedCache);
};

const getCalcFunction = (id) => {
    switch (id) {
        case KEYS.OPERATIONS.add.id:
            return KEYS.OPERATIONS.add.func;
        case KEYS.OPERATIONS.subtract.id:
            return KEYS.OPERATIONS.subtract.func;
        case KEYS.OPERATIONS.divide.id:
            return KEYS.OPERATIONS.divide.func;
        case KEYS.OPERATIONS.multiply.id:
            return KEYS.OPERATIONS.multiply.func;
        default:
            return null;
    }
};

function logCalculation(inputToCalculate) {
    const parseCalculation = inputToCalculate.map((x) => x.text).join(' ');
    console.log('extracted:', parseCalculation);
}

const getSectionToCalculate = (calcCache) => {
    const indexOfLastEquals = calcCache.findLastIndex(
        (x) => x.id === KEYS.OPERATIONS.equals.id
    );

    if (indexOfLastEquals === -1) return null;

    const indexOfPreviousEquals = calcCache
        .slice(0, indexOfLastEquals)
        .findLastIndex((x) => x.id === KEYS.OPERATIONS.equals.id);

    const sectionToCalculate = calcCache.slice(
        indexOfPreviousEquals + 1,
        indexOfLastEquals
    );

    return sectionToCalculate;
};

const calculateSubSection = (indexOfOperation, sectionToCalculate) => {
    if (indexOfOperation === -1) {
        throw new Error('Index out of bounds!');
    }
    const operation = sectionToCalculate[indexOfOperation];
    const calcFunction = getCalcFunction(operation.id);
    const firstTerm = parseFloat(sectionToCalculate[indexOfOperation - 1].text);
    const secondTerm = parseFloat(
        sectionToCalculate[indexOfOperation + 1].text
    );
    const result = calcFunction(firstTerm, secondTerm);
    return sectionToCalculate.toSpliced(
        indexOfOperation - 1,
        3,
        createCacheItem(result.toString(), {
            type: KEY_TYPES.NUMBER,
            id: 'number-result',
        })
    );
};

const findIndexOfMultiplication = (sectionToCalculate) => {
    const index = sectionToCalculate.findIndex(
        (x) =>
            x.id === KEYS.OPERATIONS.multiply.id ||
            x.id === KEYS.OPERATIONS.divide.id
    );
    return index === -1 ? null : index;
};

const findIndexOfArithmetic = (sectionToCalculate) => {
    const index = sectionToCalculate.findIndex(
        (x) =>
            x.id === KEYS.OPERATIONS.add.id ||
            x.id === KEYS.OPERATIONS.subtract.id
    );
    return index === -1 ? null : index;
};

const calculate = (calcCache) => {
    let sectionToCalculate = getSectionToCalculate(calcCache);
    if (!sectionToCalculate) return calcCache;

    while (sectionToCalculate.length > 1) {
        logCalculation(sectionToCalculate);

        const index =
            findIndexOfMultiplication(sectionToCalculate) ??
            findIndexOfArithmetic(sectionToCalculate);

        if (index !== null) {
            sectionToCalculate = calculateSubSection(index, sectionToCalculate);
        }
    }

    const newCalcCache = addEntry(
        calcCache,
        createCacheItem(sectionToCalculate[0].text, {
            type: KEY_TYPES.NUMBER,
            id: 'number-result',
        })
    );

    return addEntry(
        newCalcCache,
        createCacheItem(KEYS.OPERATIONS.equals.symbol, KEYS.OPERATIONS.equals)
    );
};

/**
 * Replace leading decimal with '0.'.
 * @param {String} input Input to fix
 * @returns {String} Returns input with leading decimal replaced with '0.'
 */
const replaceLeadingDecimalWithZero = (input) => {
    return input.replace(/^\.+/, '0.');
};

/**
 * Remove leading zeros from input.
 * @param {String} input Input to fix
 * @returns {String} Returns input with leading zeros removed
 */
const removeLeadingZeros = (input) => {
    return /^0[0-9]+$/.test(input) ? input.substring(1) : input;
};

/**
 * Enforce max one decimal separator in input.
 * @param {String} input Input to fix
 * @returns {String} Returns input with max one decimal separator
 */
const enforceOneDecimalSeparator = (input) => {
    const decimalSplitInput = input.split('.');
    return decimalSplitInput.length > 2
        ? `${decimalSplitInput[0]}.${decimalSplitInput[1]}`
        : input;
};

/**
 * Enforce max length of 16 characters in input.
 * @param {String} input Input to fix
 * @returns {String} Returns input with max length of 16 characters
 */
const enforceStringLength = (input) => {
    return input.substring(0, 16);
};

const fixInput = (input) => {
    let fixedInput = replaceLeadingDecimalWithZero(input);

    fixedInput = removeLeadingZeros(fixedInput);

    fixedInput = enforceOneDecimalSeparator(fixedInput);

    fixedInput = enforceStringLength(fixedInput);

    return fixedInput;
};

/**
 * Creates a cache item.
 * @param {String} text Some text related to input
 * @param {{id: any, type: any}} inputInfo The type and id of the input
 * @returns {{text: String, type: any, id: any}} Returns a cache item
 */
const createCacheItem = (text, inputInfo) => {
    return { text, type: inputInfo.type, id: inputInfo.id };
};

const getDisplayText = (cache) => {
    return cache.findLast((x) => x.type === KEY_TYPES.NUMBER)?.text || ZERO;
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
 * @returns {Array} Returns new array of operations. Never returns empty array, at least zero is included.
 */
function removeLastEntry(entries) {
    const newEntries = entries.toSpliced(-1, 1);
    if (newEntries.length === 0) {
        return [createCacheItem(ZERO, KEYS.NUMBERS.zero)];
    }

    return newEntries;
}

export default {
    calculatorParser,
    getDisplayText,
};
