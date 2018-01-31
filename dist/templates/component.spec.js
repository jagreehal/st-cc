"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
const component_1 = require("./component");
describe('When building content for component', () => {
    it('Can build content for component with style', async () => {
        const result = component_1.createComponentContent({
            componentName: 'my-app',
            styleFile: 'scss'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-with-style.tsx');
        const expectedOutput = await fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    });
    it('Can build content for component without style', async () => {
        const result = component_1.createComponentContent({
            componentName: 'my-app'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-without-style.tsx');
        const expectedOutput = await fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    });
});
//# sourceMappingURL=component.spec.js.map