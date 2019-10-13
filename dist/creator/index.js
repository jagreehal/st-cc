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
require('source-map-support').install();
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const component_1 = require("../templates/component");
const style_1 = require("../templates/style");
const test_1 = require("../templates/test");
exports.COMPONENTS_PATH = 'src/components';
function create({ componentName, styleType = 'standard', styleExtension = 'none', createTestFile = true, currentDir = process.cwd() }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentsPath = path_1.default.join(currentDir, exports.COMPONENTS_PATH);
        const componentPath = path_1.default.resolve(componentsPath, componentName);
        const directoryExists = yield componentDirectoryExists(componentPath);
        if (directoryExists) {
            throw new Error(`A directory already exists for the component ${componentName}`);
        }
        const isShadow = styleType === 'shadow';
        yield createFolder({ componentPath });
        yield createComponent({
            componentName,
            componentPath,
            styleType,
            styleExtension
        });
        if (styleExtension !== 'none') {
            yield createComponentStyleFile({
                componentName,
                componentPath,
                isShadow,
                styleExtension
            });
        }
        if (createTestFile) {
            yield createComponentUnitTestFile({
                componentName,
                componentPath,
                isShadow
            });
            yield createComponente2eTestFile({
                componentName,
                componentPath,
                isShadow
            });
        }
    });
}
exports.create = create;
function componentDirectoryExists(componentName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fs_extra_1.default.pathExists(componentName);
    });
}
function createFolder({ componentPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fs_extra_1.default.ensureDir(componentPath);
    });
}
function createComponentFileName(componentName, extension = 'tsx') {
    return `${componentName}.${extension}`;
}
function createComponent({ componentName, componentPath, styleType, styleExtension }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentContent = component_1.createComponentContent({
            componentName,
            styleType,
            styleExtension
        });
        return yield fs_extra_1.default.writeFile(path_1.default.resolve(componentPath, createComponentFileName(componentName)), componentContent);
    });
}
function createComponentStyleFile({ componentName, componentPath, isShadow, styleExtension }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentStyleContent = style_1.createStyleContent({
            componentName,
            isShadow
        });
        return yield fs_extra_1.default.writeFile(path_1.default.resolve(componentPath, createComponentFileName(componentName, styleExtension)), componentStyleContent);
    });
}
function createComponentUnitTestFile({ componentName, componentPath, isShadow }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentTestContent = isShadow
            ? test_1.createShadowComponentUnitTest(componentName)
            : test_1.createComponentUnitTest(componentName);
        const testFileName = `${componentName}.spec`;
        return yield fs_extra_1.default.writeFile(path_1.default.resolve(componentPath, createComponentFileName(testFileName)), componentTestContent);
    });
}
function createComponente2eTestFile({ componentName, componentPath, isShadow }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentTestContent = isShadow
            ? test_1.createShadowComponentUnitTest(componentName)
            : test_1.createComponentUnitTest(componentName);
        const testFileName = `${componentName}-e2e`;
        return yield fs_extra_1.default.writeFile(path_1.default.resolve(componentPath, createComponentFileName(testFileName)), componentTestContent);
    });
}
//# sourceMappingURL=index.js.map