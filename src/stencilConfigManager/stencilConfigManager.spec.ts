import * as fse from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { addComponentToNewBundle, saveConfigFile } from './index';

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
    const stencilConfig = require(configFilePath);

    const newConfig = addComponentToNewBundle({ stencilConfig, componentName });

    await saveConfigFile(configFilePath, newConfig);

    const fileContents = await fse.readFile(configFilePath, 'utf8');

    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/new.config.js'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(fileContents).toBe(expectedOutput.toString());
  });
});
