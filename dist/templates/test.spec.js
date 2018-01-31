"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
const test_1 = require("./test");
describe('When test content for component', () => {
    it('Can build content for component test file', async () => {
        const result = test_1.createComponentTestContent({
            componentName: 'my-app'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/test.tsx');
        const expectedOutput = await fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    });
});
//# sourceMappingURL=test.spec.js.map