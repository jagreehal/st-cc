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
const style_1 = require("./style");
describe('When building content for style', () => {
    it('Can build content for component style file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = style_1.createStyleContent({
            componentName: 'component-with-css',
            isShadow: false
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-with-css.css');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
    it('Can build content for shadow component style file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = style_1.createStyleContent({
            componentName: 'component-css-shadow',
            isShadow: true
        });
        const expectedOutputPath = path.join(__dirname, 'tests/expected/component-css-shadow.css');
        const expectedOutput = yield fse.readFile(expectedOutputPath);
        expect(result).toBe(expectedOutput.toString());
    }));
});
//# sourceMappingURL=style.spec.js.map