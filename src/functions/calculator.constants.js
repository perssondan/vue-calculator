import { add, subtract, multiply, divide } from './calculator.functions';
// const ERROR_RESULT = 'ERROR';
export const ZERO = '0';
export const KEY_TYPES = {
    OPERATION: 'operation', // basic operations
    NUMBER: 'number', // 0-9, decimalSeparator
    EDIT: 'edit', // backspace, clear, clearLastEntry
    FUNCTION: 'function', // oneOverX, xSquared, squareRoot, toggleSign, percentage
};

export const KEYS = {
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
            func: divide,
            operator: 'divide',
            symbol: '/',
            type: KEY_TYPES.OPERATION,
        },
        multiply: {
            id: crypto.randomUUID(),
            func: multiply,
            operator: 'multiply',
            symbol: '*',
            type: KEY_TYPES.OPERATION,
        },
        subtract: {
            id: crypto.randomUUID(),
            func: subtract,
            operator: 'subtract',
            symbol: '-',
            type: KEY_TYPES.OPERATION,
        },
        add: {
            id: crypto.randomUUID(),
            func: add,
            operator: 'add',
            symbol: '+',
            type: KEY_TYPES.OPERATION,
        },
        equals: {
            id: crypto.randomUUID(),
            operator: 'equals',
            symbol: '=',
            type: KEY_TYPES.OPERATION,
        },
    },
    EDITS: {
        clearLastEntry: {
            id: crypto.randomUUID(),
            operator: 'clearLastEntry',
            symbol: 'CE',
            type: KEY_TYPES.EDIT,
        },
        clear: {
            id: crypto.randomUUID(),
            operator: 'clear',
            symbol: 'C',
            type: KEY_TYPES.EDIT,
        },
        backspace: {
            id: crypto.randomUUID(),
            operator: 'backspace',
            symbol: '⌫',
            type: KEY_TYPES.EDIT,
        },
    },
    FUNCTIONS: {
        // Functions can be executed on a single number, hence immediately executed
        percentage: {
            id: crypto.randomUUID(),
            operator: 'percent',
            symbol: '%',
            type: KEY_TYPES.FUNCTION,
        },
        oneOverX: {
            id: crypto.randomUUID(),
            operator: 'oneOverX',
            symbol: '1/x',
            type: KEY_TYPES.FUNCTION,
        },
        xSquared: {
            id: crypto.randomUUID(),
            operator: 'xSquared',
            symbol: 'x²',
            type: KEY_TYPES.FUNCTION,
        },
        squareRoot: {
            id: crypto.randomUUID(),
            operator: 'squareRoot',
            symbol: '√',
            type: KEY_TYPES.FUNCTION,
        },
        toggleSign: {
            id: crypto.randomUUID(),
            operator: 'toggleSign',
            symbol: '+/-',
            type: KEY_TYPES.FUNCTION,
        },
    },
};
