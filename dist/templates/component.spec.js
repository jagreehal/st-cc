"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const component_1 = require("./component");
describe('When building content for component', () => {
    it('Can build content for component with css', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'component-with-css',
            styleExtension: 'css'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-with-css.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for component with scss', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'component-with-scss',
            styleExtension: 'scss'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-with-scss.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for component without style', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'component-no-css',
            styleExtension: 'none'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-no-css.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for scoped component', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'component-css-scoped',
            styleType: 'scoped',
            styleExtension: 'css'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-css-scoped.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for shadow component', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = component_1.createComponentContent({
            componentName: 'component-css-shadow',
            styleType: 'shadow',
            styleExtension: 'css'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-css-shadow.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
});
//# sourceMappingURL=component.spec.js.map