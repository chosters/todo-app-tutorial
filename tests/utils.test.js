// tests/utils.test.js
import { sanitizeInputText } from '../js/utils.js';

describe('sanitizeInputText', () => {
    test('removes spaces from beginning and end of text', () => {
        const input = '  hello world  ';
        const expected = 'hello world';
        expect(sanitizeInputText(input)).toBe(expected);
    });

    test('returns empty string when given only spaces', () => {
        const input = '   ';
        const expected = '';
        expect(sanitizeInputText(input)).toBe(expected);
    });

    test('does not modify text with no extra spaces', () => {
        const input = 'hello world';
        const expected = 'hello world';
        expect(sanitizeInputText(input)).toBe(expected);
    });
});