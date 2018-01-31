import * as fse from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { StencilConfigManager } from './index';

const sampleConfig = `exports.config = {
    bundles: [{ components: ['x-x'] }]
};
  
exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};`;

describe('When using stencil config file manager', () => {
  const CONFIG_FILENAME: string = 'sample.config.js';
  let configFilePath: string;
  let TEST_DIR: string;

  beforeEach(async () => {
    TEST_DIR = path.join(os.tmpdir(), 'stencil-cli', 'integration');
    configFilePath = path.resolve(TEST_DIR, CONFIG_FILENAME);
    await fse.emptyDir(TEST_DIR);
    await fse.outputFile(configFilePath, sampleConfig);
  });

  afterEach(async () => await fse.remove(TEST_DIR));

  it('Should be able to add component to bundles', async () => {
    const componentName = 'my-app';
    const configFile = require(configFilePath);
    const stencilConfigManager = new StencilConfigManager(configFile);
    stencilConfigManager.addComponentToNewBundle('my-app');
    await stencilConfigManager.writeNewConfig(configFilePath);

    const fileContents = await fse.readFile(configFilePath, 'utf8');
    const newConfigFile = require(configFilePath);

    expect(newConfigFile.config.bundles[1].components[0]).toBe(componentName);
  });
});
