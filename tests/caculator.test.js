const { calculateExpression } = require('../src/calculator');

describe('Vuna Calculator Core Math Assertions', () => {
    
    test('should add numbers correctly', () => {
        expect(calculateExpression('5+3')).toBe('8');
    });

    test('should handle subtraction correctly', () => {
        expect(calculateExpression('10-4')).toBe('6');
    });

    test('should process modulus operations correctly', () => {
        expect(calculateExpression('5%2')).toBe('1');
    });

    test('should fallback to Error on faulty division operations', () => {
        expect(calculateExpression('1/0')).toBe('Error');
    });
});