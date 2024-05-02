"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filterHelper_1 = require("../filtering/filterHelper");
describe('BlockToString function', function () {
    it('should return concatenated text from all lines in a text block', function () {
        var textBlock = {
            text: '',
            lines: [
                { text: 'Hello,', elements: [], recognizedLanguages: [] },
                { text: 'world!', elements: [], recognizedLanguages: [] },
            ],
            recognizedLanguages: [],
        };
        var result = (0, filterHelper_1.BlockToString)(textBlock);
        expect(result).toBe('Hello,world!');
    });
    it('should return an empty string if the text block has no lines', function () {
        var textBlock = {
            text: '',
            lines: [],
            recognizedLanguages: [],
        };
        var result = (0, filterHelper_1.BlockToString)(textBlock);
        expect(result).toBe('');
    });
});
describe('sanitizeTextBlock function', function () {
    it('should remove spaces, symbols, and newline characters from a text block', function () {
        var textBlock = {
            text: '',
            lines: [
                { text: '  Hello,,\n', elements: [], recognizedLanguages: [] },
                { text: '!world!', elements: [], recognizedLanguages: [] },
            ],
            recognizedLanguages: [],
        };
        var result = (0, filterHelper_1.sanitizeTextBlock)(textBlock);
        expect(result).toBe('Helloworld');
    });
    it('should return an empty string if the text block has no lines', function () {
        var textBlock = {
            text: '',
            lines: [],
            recognizedLanguages: [],
        };
        var result = (0, filterHelper_1.sanitizeTextBlock)(textBlock);
        expect(result).toBe('');
    });
});
describe('sanitizeString function', function () {
    it('should remove spaces, symbols, and newline characters from a string', function () {
        var input = '  Hello,,\nworld!';
        var result = (0, filterHelper_1.sanitizeString)(input);
        expect(result).toBe('Helloworld');
    });
    it('should return an empty string if the input string is empty', function () {
        var input = '';
        var result = (0, filterHelper_1.sanitizeString)(input);
        expect(result).toBe('');
    });
});
