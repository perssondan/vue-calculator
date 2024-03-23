import { describe, test, expect } from 'vitest';
import calculatorFunctions from '../src/functions/calculator.functions';

describe('calculator engine tests', () => {
    test('addition', () => {
        expect(calculatorFunctions.add(1, 2)).toBe(3);
    });
});
