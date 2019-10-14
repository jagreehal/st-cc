import { styleExtension } from './../types/index';
import fsExtra from 'fs-extra';
import path from 'path';
import os from 'os';
import { create, COMPONENTS_PATH } from './index';

function buildPath(
  testDir: string,
  componentsPath: string,
  componentName: string,
  fileName: string
) {
  return path.join(testDir, componentsPath, componentName, fileName);
}

function createTestFileNames({
  componentName,
  TEST_DIR,
  styleExtension
}: {
  componentName: string;
  TEST_DIR: string;
  styleExtension?: styleExtension;
}) {
  return {
    componentPath: buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      componentName,
      `${componentName}.tsx`
    ),

    componentStylePath: buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      componentName,
      `${componentName}.${styleExtension || 'css'}`
    ),

    componentUnitTestPath: buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      componentName,
      `${componentName}.spec.tsx`
    ),

    componente2eTestPath: buildPath(
      TEST_DIR,
      COMPONENTS_PATH,
      componentName,
      `${componentName}-e2e.tsx`
    )
  };
}

describe('When running stencil-cli', () => {
  let TEST_DIR: string;

  beforeEach(async () => {
    TEST_DIR = path.join(os.tmpdir(), 'stencil-cli', 'integration');
    await fsExtra.emptyDir(TEST_DIR);
  });
  afterEach(async () => await fsExtra.remove(TEST_DIR));

  it('can create component without style or tests', async () => {
    const componentName = 'component-no-css';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'none',
      createTestFile: false
    });

    const {
      componentPath,
      componentStylePath,
      componentUnitTestPath,
      componente2eTestPath
    } = createTestFileNames({ componentName, TEST_DIR });

    expect(await fsExtra.pathExists(componentPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentStylePath)).toBeFalsy();
    expect(await fsExtra.pathExists(componentUnitTestPath)).toBeFalsy();
    expect(await fsExtra.pathExists(componente2eTestPath)).toBeFalsy();
  });

  it('can create component with style', async () => {
    const componentName = 'component-with-css-no-test';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'css',
      createTestFile: false
    });
    const {
      componentPath,
      componentStylePath,
      componentUnitTestPath
    } = createTestFileNames({ componentName, TEST_DIR });

    expect(await fsExtra.pathExists(componentPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentStylePath)).toBeTruthy();
  });

  it('can create component with scss', async () => {
    const componentName = 'component-with-scss';
    const styleExtension = 'scss';
    await create({
      componentName,
      styleExtension,
      currentDir: TEST_DIR,
      createTestFile: false
    });
    const {
      componentPath,
      componentStylePath,
      componentUnitTestPath
    } = createTestFileNames({ componentName, TEST_DIR, styleExtension });

    expect(await fsExtra.pathExists(componentPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentStylePath)).toBeTruthy();
  });

  it('can create component with less', async () => {
    const componentName = 'component-with-less';
    const styleExtension = 'less';
    await create({
      componentName,
      styleExtension,
      currentDir: TEST_DIR,
      createTestFile: false
    });
    const {
      componentPath,
      componentStylePath,
      componentUnitTestPath
    } = createTestFileNames({ componentName, TEST_DIR, styleExtension });

    expect(await fsExtra.pathExists(componentPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentStylePath)).toBeTruthy();
  });

  it('can create component with style and test', async () => {
    const componentName = 'component-with-css';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'css',
      createTestFile: true
    });

    const {
      componentPath,
      componentStylePath,
      componentUnitTestPath,
      componente2eTestPath
    } = createTestFileNames({ componentName, TEST_DIR });

    expect(await fsExtra.pathExists(componentPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentStylePath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentUnitTestPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componente2eTestPath)).toBeTruthy();
  });

  it('can create shadow component with style and test', async () => {
    const componentName = 'component-css-shadow';
    await create({
      componentName,
      currentDir: TEST_DIR,
      styleExtension: 'css',
      createTestFile: true,
      styleType: 'shadow'
    });

    const {
      componentPath,
      componentStylePath,
      componentUnitTestPath,
      componente2eTestPath
    } = createTestFileNames({ componentName, TEST_DIR });

    expect(await fsExtra.pathExists(componentPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentStylePath)).toBeTruthy();
    expect(await fsExtra.pathExists(componentUnitTestPath)).toBeTruthy();
    expect(await fsExtra.pathExists(componente2eTestPath)).toBeTruthy();
  });
});
