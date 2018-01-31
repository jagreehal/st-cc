"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support").install();
const fse = require("fs-extra");
const path = require("path");
const component_1 = require("../templates/component");
const style_1 = require("../templates/style");
const test_1 = require("../templates/test");
const stencilConfigManager_1 = require("../stencilConfigManager");
async function create({ componentName, createStyleFile = true, createTestFile = true, addToStencilConfig = false, currentDir = process.cwd() }) {
    const componentPath = path.resolve(currentDir, componentName);
    const directoryExists = await componentDirectoryExists(componentPath);
    if (directoryExists) {
        throw new Error(`A directory already exists for the component ${componentName}`);
    }
    await createFolder({ componentPath });
    await createComponent({ componentName, componentPath });
    if (createStyleFile) {
        await createComponentStyleFile({ componentName, componentPath });
    }
    if (createTestFile) {
        await createComponentTestFile({ componentName, componentPath });
    }
    if (addToStencilConfig) {
        await addComponentToStencilConfig({ componentName, currentDir });
    }
}
exports.create = create;
async function addComponentToStencilConfig({ componentName, currentDir }) {
    const configPath = path.resolve(currentDir, "stencil.config.js");
    let stencilConfigManager;
    try {
        const stencilConfig = require(configPath);
        stencilConfigManager = new stencilConfigManager_1.StencilConfigManager(stencilConfig);
        stencilConfigManager.addComponentToNewBundle(componentName);
    }
    catch (err) {
        throw new Error(`Cannot add component ${componentName} to Stencil config because config file ${configPath} could not be loaded`);
    }
    try {
        await stencilConfigManager.writeNewConfig(configPath);
    }
    catch (error) {
        throw new Error(`Error writing config file: ${error}`);
    }
}
async function componentDirectoryExists(componentName) {
    return await fse.pathExists(componentName);
}
async function createFolder({ componentPath }) {
    return await fse.ensureDir(componentPath);
}
function createComponentFileName(componentName, extension = "tsx") {
    return `${componentName}.${extension}`;
}
async function createComponent({ componentName, componentPath }) {
    const componentContent = component_1.createComponentContent({
        componentName,
        styleFile: "scss"
    });
    return await fse.writeFile(path.resolve(componentPath, createComponentFileName(componentName)), componentContent);
}
async function createComponentStyleFile({ componentName, componentPath, styleExtension = "scss" }) {
    const componentStyleContent = style_1.createStyleContent({
        componentName
    });
    return await fse.writeFile(path.resolve(componentPath, createComponentFileName(componentName, styleExtension)), componentStyleContent);
}
async function createComponentTestFile({ componentName, componentPath, testPattern = "spec" }) {
    const componentTestContent = test_1.createComponentTestContent({
        componentName
    });
    const testFileName = `${componentName}.${testPattern}`;
    return await fse.writeFile(path.resolve(componentPath, createComponentFileName(testFileName)), componentTestContent);
}
//# sourceMappingURL=index.js.map