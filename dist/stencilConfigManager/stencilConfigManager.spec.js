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
const sampleConfig = `exports.config = {
    bundles: [{ components: ['x-x'] }]
};
  
exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};`;
describe('When using stencil config file manager', () => {
    const CONFIG_FILENAME = 'sample.config.js';
    let configFilePath;
    let TEST_DIR;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        TEST_DIR = path.join(os.tmpdir(), 'stencil-cli', 'integration');
        configFilePath = path.resolve(TEST_DIR, CONFIG_FILENAME);
        yield fse.emptyDir(TEST_DIR);
        yield fse.outputFile(configFilePath, sampleConfig);
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () { return yield fse.remove(TEST_DIR); }));
    it('Should be able to add component to bundles', () => __awaiter(this, void 0, void 0, function* () {
        const componentName = 'my-app';
        const configFile = require(configFilePath);
        const stencilConfigManager = new index_1.StencilConfigManager(configFile);
        stencilConfigManager.addComponentToNewBundle('my-app');
        yield stencilConfigManager.writeNewConfig(configFilePath);
        const fileContents = yield fse.readFile(configFilePath, 'utf8');
        const newConfigFile = require(configFilePath);
        expect(newConfigFile.config.bundles[1].components[0]).toBe(componentName);
    }));
});
//# sourceMappingURL=stencilConfigManager.spec.js.map