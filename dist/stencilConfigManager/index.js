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
class StencilConfigManager {
    constructor(stencilConfig) {
        this.stencilConfig = stencilConfig;
        this.bundles = [...stencilConfig.config.bundles];
    }
    addComponentToNewBundle(componentName) {
        this.bundles.push({
            components: [`${componentName}`]
        });
    }
    createNewConfig() {
        this.stencilConfig.config = this.stencilConfig.config || {};
        this.stencilConfig.config.bundles = this.bundles;
        return JSON.stringify(this.stencilConfig, null, 2);
    }
    writeNewConfig(configFile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fse.outputFile(configFile, this.createNewConfig());
        });
    }
}
exports.StencilConfigManager = StencilConfigManager;
//# sourceMappingURL=index.js.map