"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
const component_1 = require("./component");
describe('When building content for component', () => {
    it('Can build content for component with css', () => __awaiter(this, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'my-app',
            styleExtension: 'css'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-with-css.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for component with scss', () => __awaiter(this, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'my-app',
            styleExtension: 'scss'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-with-scss.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for component without style', () => __awaiter(this, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'my-app',
            styleExtension: 'none'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-without-style.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for shadow component', () => __awaiter(this, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'my-app',
            isShadow: true
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-shadow.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
});
//# sourceMappingURL=component.spec.js.map