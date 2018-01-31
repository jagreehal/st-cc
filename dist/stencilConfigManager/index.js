"use strict";
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
    async writeNewConfig(configFile) {
        return await fse.outputFile(configFile, this.createNewConfig());
    }
}
exports.StencilConfigManager = StencilConfigManager;
//# sourceMappingURL=index.js.map