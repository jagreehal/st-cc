import * as fse from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { create, COMPONENTS_PATH } from './index';

function buildPath(
  testDir: string,
  componentsPath: string,
  componentName: string,
  fileName: string
) {
  return path.join(testDir, componentsPath, componentName, fileName);
}

describe('When running stencil-cli', () => {
  const COMPONENT_NAME: string = 'my-app';
  let TEST_DIR: string;
  let componentPath: string;
  let componentStylePath: string;
  let componentTestPath: string;
  let componentStoryPath: string;

  beforeEach(async () => {
    TEST_DIR = path.join(os.tmpdir(), 'stencil-cli', 'integration');
    await fse.emptyDir(TEST_DIR);

    componentPath = buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      COMPONENT_NAME,
      `${COMPONENT_NAME}.tsx`
    );
    componentStylePath = buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      COMPONENT_NAME,
      `${COMPONENT_NAME}.css`
    );

    componentTestPath = buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      COMPONENT_NAME,
      `${COMPONENT_NAME}.spec.tsx`
    );

    componentStoryPath = buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      COMPONENT_NAME,
      `${COMPONENT_NAME}.story.tsx`
    );

    console.log('componentStoryPath = ', componentStoryPath)
  });
  afterEach(async () => await fse.remove(TEST_DIR));

  it('can create component without style or test', async () => {
    const componentName = 'my-app';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'none',
      createTestFile: false,
      createStoryFile: false,
      isShadow: false
    });

    expect(await fse.pathExists(componentPath)).toBeTruthy();
    expect(await fse.pathExists(componentStylePath)).toBeFalsy();
    expect(await fse.pathExists(componentTestPath)).toBeFalsy();
  });

  it('can create component with style', async () => {
    const componentName = 'my-app';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'css',
      createTestFile: false,
      createStoryFile: false,
      isShadow: false
    });

    expect(await fse.pathExists(componentPath)).toBeTruthy();
    expect(await fse.pathExists(componentStylePath)).toBeTruthy();
    expect(await fse.pathExists(componentTestPath)).toBeFalsy();
  });

  it('can create component with style and test', async () => {
    const componentName = 'my-app';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'css',
      createTestFile: true,
      createStoryFile: false,
      isShadow: false
    });

    expect(await fse.pathExists(componentPath)).toBeTruthy();
    expect(await fse.pathExists(componentStylePath)).toBeTruthy();
    expect(await fse.pathExists(componentTestPath)).toBeTruthy();
  });

  it('can create component with style and story', async () => {
    const componentName = 'my-app';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'css',
      createTestFile: false,
      createStoryFile: true,
      isShadow: false
    });

    expect(await fse.pathExists(componentPath)).toBeTruthy();
    expect(await fse.pathExists(componentStylePath)).toBeTruthy();
    expect(await fse.pathExists(componentTestPath)).toBeFalsy();
    expect(await fse.pathExists(componentStoryPath)).toBeTruthy();
  });

});
