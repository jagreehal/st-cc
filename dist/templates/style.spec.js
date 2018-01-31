"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
const style_1 = require("./style");
describe('When building content for style', () => {
    it('Can build content for component style file', async () => {
        const result = style_1.createStyleContent({
            componentName: 'my-app'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/style.scss');
        const expectedOutput = await fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    });
});
//# sourceMappingURL=style.spec.js.map