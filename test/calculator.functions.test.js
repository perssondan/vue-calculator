import { describe, test, expect } from 'vitest';
import calculatorEngine from '../src/functions/calculator.functions';

describe('calculator engine tests', () => {
    test('addition', () => {
        expect(calculatorEngine.add(1, 2)).toBe(3);
    });
    test('blabla', () => {
        expect(calculatorEngine.calculatorParser());
    });
});
