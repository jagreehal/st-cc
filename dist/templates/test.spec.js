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
const test_1 = require("./test");
describe('When test content for component', () => {
    it('Can build content for component test file', () => __awaiter(this, void 0, void 0, function* () {
        const result = test_1.createComponentTestContent({
            componentName: 'my-app'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/test.tsx');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
});
//# sourceMappingURL=test.spec.js.map