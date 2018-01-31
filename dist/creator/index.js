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
require("source-map-support").install();
const fse = require("fs-extra");
const path = require("path");
const component_1 = require("../templates/component");
const style_1 = require("../templates/style");
const test_1 = require("../templates/test");
const stencilConfigManager_1 = require("../stencilConfigManager");
function create({ componentName, createStyleFile = true, createTestFile = true, addToStencilConfig = false, currentDir = process.cwd() }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentPath = path.resolve(currentDir, componentName);
        const directoryExists = yield componentDirectoryExists(componentPath);
        if (directoryExists) {
            throw new Error(`A directory already exists for the component ${componentName}`);
        }
        yield createFolder({ componentPath });
        yield createComponent({ componentName, componentPath });
        if (createStyleFile) {
            yield createComponentStyleFile({ componentName, componentPath });
        }
        if (createTestFile) {
            yield createComponentTestFile({ componentName, componentPath });
        }
        if (addToStencilConfig) {
            yield addComponentToStencilConfig({ componentName, currentDir });
        }
    });
}
exports.create = create;
function addComponentToStencilConfig({ componentName, currentDir }) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield stencilConfigManager.writeNewConfig(configPath);
        }
        catch (error) {
            throw new Error(`Error writing config file: ${error}`);
        }
    });
}
function componentDirectoryExists(componentName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fse.pathExists(componentName);
    });
}
function createFolder({ componentPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fse.ensureDir(componentPath);
    });
}
function createComponentFileName(componentName, extension = "tsx") {
    return `${componentName}.${extension}`;
}
function createComponent({ componentName, componentPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentContent = component_1.createComponentContent({
            componentName,
            styleFile: "scss"
        });
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(componentName)), componentContent);
    });
}
function createComponentStyleFile({ componentName, componentPath, styleExtension = "scss" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentStyleContent = style_1.createStyleContent({
            componentName
        });
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(componentName, styleExtension)), componentStyleContent);
    });
}
function createComponentTestFile({ componentName, componentPath, testPattern = "spec" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentTestContent = test_1.createComponentTestContent({
            componentName
        });
        const testFileName = `${componentName}.${testPattern}`;
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(testFileName)), componentTestContent);
    });
}
//# sourceMappingURL=index.js.map