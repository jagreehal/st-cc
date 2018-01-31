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
const os = require("os");
const index_1 = require("./index");
function buildPath(testDir, componentName, fileName) {
    return path.join(testDir, componentName, fileName);
}
describe('When running stencil-cli', () => {
    const COMPONENT_NAME = 'my-app';
    let TEST_DIR;
    let componentPath;
    let componentStylePath;
    let componentTestPath;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        TEST_DIR = path.join(os.tmpdir(), 'stencil-cli', 'integration');
        yield fse.emptyDir(TEST_DIR);
        componentPath = buildPath(TEST_DIR, COMPONENT_NAME, `${COMPONENT_NAME}.tsx`);
        componentStylePath = buildPath(TEST_DIR, COMPONENT_NAME, `${COMPONENT_NAME}.scss`);
        componentTestPath = buildPath(TEST_DIR, COMPONENT_NAME, `${COMPONENT_NAME}.spec.tsx`);
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () { return yield fse.remove(TEST_DIR); }));
    it('can create component', () => __awaiter(this, void 0, void 0, function* () {
        const componentName = 'my-app';
        yield index_1.create({
            componentName,
            currentDir: TEST_DIR,
            createStyleFile: false,
            createTestFile: false,
            addToStencilConfig: false
        });
        expect(yield fse.pathExists(componentPath)).toBeTruthy();
        expect(yield fse.pathExists(componentStylePath)).toBeFalsy();
        expect(yield fse.pathExists(componentTestPath)).toBeFalsy();
    }));
    it('can create component with style', () => __awaiter(this, void 0, void 0, function* () {
        const componentName = 'my-app';
        yield index_1.create({
            componentName,
            currentDir: TEST_DIR,
            createStyleFile: true,
            createTestFile: false,
            addToStencilConfig: false
        });
        expect(yield fse.pathExists(componentPath)).toBeTruthy();
        expect(yield fse.pathExists(componentStylePath)).toBeTruthy();
        expect(yield fse.pathExists(componentTestPath)).toBeFalsy();
    }));
    it('can create component with style and test', () => __awaiter(this, void 0, void 0, function* () {
        const componentName = 'my-app';
        yield index_1.create({
            componentName,
            currentDir: TEST_DIR,
            createStyleFile: true,
            createTestFile: true,
            addToStencilConfig: false
        });
        expect(yield fse.pathExists(componentPath)).toBeTruthy();
        expect(yield fse.pathExists(componentStylePath)).toBeTruthy();
        expect(yield fse.pathExists(componentTestPath)).toBeTruthy();
    }));
});
//# sourceMappingURL=index.spec.js.map