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
require('source-map-support').install();
const fse = require("fs-extra");
const path = require("path");
const component_1 = require("../templates/component");
const style_1 = require("../templates/style");
const test_1 = require("../templates/test");
exports.COMPONENTS_PATH = 'src/components';
function create({ componentName, isShadow = false, createStyleFile = true, createTestFile = true, currentDir = process.cwd() }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentsPath = path.join(currentDir, exports.COMPONENTS_PATH);
        const componentPath = path.resolve(componentsPath, componentName);
        const directoryExists = yield componentDirectoryExists(componentPath);
        if (directoryExists) {
            throw new Error(`A directory already exists for the component ${componentName}`);
        }
        yield createFolder({ componentPath });
        yield createComponent({ componentName, componentPath, isShadow });
        if (createStyleFile) {
            yield createComponentStyleFile({ componentName, componentPath, isShadow });
        }
        if (createTestFile) {
            yield createComponentTestFile({ componentName, componentPath });
        }
    });
}
exports.create = create;
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
function createComponentFileName(componentName, extension = 'tsx') {
    return `${componentName}.${extension}`;
}
function createComponent({ componentName, componentPath, isShadow }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentContent = component_1.createComponentContent({
            componentName,
            isShadow,
            styleFile: 'scss'
        });
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(componentName)), componentContent);
    });
}
function createComponentStyleFile({ componentName, componentPath, isShadow, styleExtension = 'scss' }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentStyleContent = style_1.createStyleContent({
            componentName,
            isShadow
        });
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(componentName, styleExtension)), componentStyleContent);
    });
}
function createComponentTestFile({ componentName, componentPath, testPattern = 'spec' }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentTestContent = test_1.createComponentTestContent({
            componentName
        });
        const testFileName = `${componentName}.${testPattern}`;
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(testFileName)), componentTestContent);
    });
}
//# sourceMappingURL=index.js.map