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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const test_1 = require("./test");
describe('When test content for component', () => {
    it('Can build content for component unit test file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = test_1.createComponentUnitTest('component-with-css');
        const expectedOutputPath = path_1.default.join(__dirname, 'tests/expected/component-with-css.spec.tsx');
        const expectedOutput = yield fs_extra_1.default.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for component e2e test file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = test_1.createComponente2eTest('component-no-css');
        const expectedOutputPath = path_1.default.join(__dirname, 'tests/expected/component-with-css-e2e.tsx');
        const expectedOutput = yield fs_extra_1.default.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for shadow component unit test file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = test_1.createShadowComponentUnitTest('component-css-shadow');
        const expectedOutputPath = path_1.default.join(__dirname, 'tests/expected/component-css-shadow.spec.tsx');
        const expectedOutput = yield fs_extra_1.default.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for shadow component e2e test file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = test_1.createShadowComponente2eTest('component-css-shadow');
        const expectedOutputPath = path_1.default.join(__dirname, 'tests/expected/component-css-shadow-e2e.tsx');
        const expectedOutput = yield fs_extra_1.default.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
});
//# sourceMappingURL=test.spec.js.map