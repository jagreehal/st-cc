import * as fse from 'fs-extra';

export class StencilConfigManager {
  stencilConfig: any;
  bundles: any;

  constructor(stencilConfig: any) {
    this.stencilConfig = stencilConfig;
    this.bundles = [...stencilConfig.config.bundles];
  }

  addComponentToNewBundle(componentName: string) {
    this.bundles.push({
      components: [`${componentName}`]
    });
  }
  createNewConfig() {
    this.stencilConfig.config = this.stencilConfig.config || {};
    this.stencilConfig.config.bundles = this.bundles;
    return JSON.stringify(this.stencilConfig, null, 2);
  }

  async writeNewConfig(configFile: string) {
    return await fse.outputFile(configFile, this.createNewConfig());
  }
}
