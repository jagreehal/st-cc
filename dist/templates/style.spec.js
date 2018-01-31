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
const style_1 = require("./style");
describe('When building content for style', () => {
    it('Can build content for component style file', () => __awaiter(this, void 0, void 0, function* () {
        const result = style_1.createStyleContent({
            componentName: 'my-app'
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/style.scss');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
});
//# sourceMappingURL=style.spec.js.map