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
function addComponentToNewBundle({ stencilConfig, componentName }) {
    stencilConfig.config = stencilConfig.config || {};
    stencilConfig.config.bundles = stencilConfig.config.bundles || [];
    stencilConfig.config.bundles.push({
        components: [`${componentName}`]
    });
    return createJsonToConfig(stencilConfig);
}
exports.addComponentToNewBundle = addComponentToNewBundle;
function saveConfigFile(configFile, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fse.outputFile(configFile, content);
    });
}
exports.saveConfigFile = saveConfigFile;
function createJsonToConfig(stencilConfig) {
    return Object.keys(stencilConfig)
        .map(key => {
        return `exports.${key} = ${JSON.stringify(stencilConfig[key])};`;
    })
        .join('\n\n');
}
exports.createJsonToConfig = createJsonToConfig;
//# sourceMappingURL=index.js.map