"use strict";
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
    beforeEach(async () => {
        TEST_DIR = path.join(os.tmpdir(), 'stencil-cli', 'integration');
        await fse.emptyDir(TEST_DIR);
        componentPath = buildPath(TEST_DIR, COMPONENT_NAME, `${COMPONENT_NAME}.tsx`);
        componentStylePath = buildPath(TEST_DIR, COMPONENT_NAME, `${COMPONENT_NAME}.scss`);
        componentTestPath = buildPath(TEST_DIR, COMPONENT_NAME, `${COMPONENT_NAME}.spec.tsx`);
    });
    afterEach(async () => await fse.remove(TEST_DIR));
    it('can create component', async () => {
        const componentName = 'my-app';
        await index_1.create({
            componentName,
            currentDir: TEST_DIR,
            createStyleFile: false,
            createTestFile: false,
            addToStencilConfig: false
        });
        expect(await fse.pathExists(componentPath)).toBeTruthy();
        expect(await fse.pathExists(componentStylePath)).toBeFalsy();
        expect(await fse.pathExists(componentTestPath)).toBeFalsy();
    });
    it('can create component with style', async () => {
        const componentName = 'my-app';
        await index_1.create({
            componentName,
            currentDir: TEST_DIR,
            createStyleFile: true,
            createTestFile: false,
            addToStencilConfig: false
        });
        expect(await fse.pathExists(componentPath)).toBeTruthy();
        expect(await fse.pathExists(componentStylePath)).toBeTruthy();
        expect(await fse.pathExists(componentTestPath)).toBeFalsy();
    });
    it('can create component with style and test', async () => {
        const componentName = 'my-app';
        await index_1.create({
            componentName,
            currentDir: TEST_DIR,
            createStyleFile: true,
            createTestFile: true,
            addToStencilConfig: false
        });
        expect(await fse.pathExists(componentPath)).toBeTruthy();
        expect(await fse.pathExists(componentStylePath)).toBeTruthy();
        expect(await fse.pathExists(componentTestPath)).toBeTruthy();
    });
});
//# sourceMappingURL=index.spec.js.map