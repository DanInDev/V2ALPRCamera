"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filterService_1 = require("../../src/filtering/filterService");
var filterOptions_1 = require("../../src/filtering/filterOptions");
describe('filterWithMultipleOptions function', function () {
    var mockOCRFrame = {
        result: {
            text: '', // This should be an empty string or actual text, depending on your test case
            blocks: [
                {
                    text: 'AF12712',
                    lines: [
                        { text: 'AF12', elements: [], recognizedLanguages: [], cornerPoints: [] },
                        { text: '712', elements: [], recognizedLanguages: [], cornerPoints: [] }
                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
                {
                    text: 'OKR 9H51',
                    lines: [
                        { text: 'OKR 9H51', elements: [], recognizedLanguages: [], cornerPoints: [] }
                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
                {
                    text: 'NL-01-AB',
                    lines: [
                        { text: 'NL-01-AB', elements: [], recognizedLanguages: [], cornerPoints: [] }
                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
                {
                    text: 'METROPARK APS',
                    lines: [
                        { text: 'METROPARK APS', elements: [], recognizedLanguages: [], cornerPoints: [] }
                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
            ],
        },
    };
    it('should return filtered blocks with the scandinavian collection filter, one motorcycle licenseplate.', function () {
        // In this case use the line created for the Norwegian / Danish Filter
        var filteredBlocks = (0, filterService_1.filterWithMultipleOptions)(mockOCRFrame, filterOptions_1.DK);
        expect(filteredBlocks).toHaveLength(1); // Only the danish plate should go through
    });
    it('should return filtered blocks with the general filter, three different licenseplates', function () {
        var filteredBlocks = (0, filterService_1.filterWithMultipleOptions)(mockOCRFrame, filterOptions_1.GENERAL);
        expect(filteredBlocks).toHaveLength(3); // The Danish, polish and Netherland Plates should go through, and ignore any non license plates
    });
});
describe('findBlockWithHighestX function', function () {
    it('should return the block with the highest x value', function () {
        var blocks = [
            {
                text: '',
                lines: [],
                recognizedLanguages: [],
                frame: { x: 10, y: 20, width: 100, height: 50, boundingCenterX: 10, boundingCenterY: 20 }, // Update with frame data
            },
            {
                text: '',
                lines: [],
                recognizedLanguages: [],
                frame: { x: 50, y: 60, width: 120, height: 40, boundingCenterX: 80, boundingCenterY: 60 }, // Update with frame data
            },
        ];
        var highestXBlock = (0, filterService_1.findBlockWithHighestX)(blocks);
        expect(highestXBlock).toEqual(blocks[1]); // Second block has the highest x value
    });
    it('should return null if the input array is empty', function () {
        var blocks = [];
        var highestXBlock = (0, filterService_1.findBlockWithHighestX)(blocks);
        expect(highestXBlock).toBeNull(); // No blocks to find the highest x value
    });
});
it('should return null if the input array is empty', function () {
    var blocks = [];
    var highestXBlock = (0, filterService_1.findBlockWithHighestX)(blocks);
    expect(highestXBlock).toBeNull(); // No blocks to find the highest x value
});
