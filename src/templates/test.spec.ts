import fsExtra from 'fs-extra';
import path from 'path';
import {
  createShadowComponentUnitTest,
  createComponentUnitTest,
  createComponente2eTest,
  createShadowComponente2eTest
} from './test';

describe('When test content for component', () => {
  it('Can build content for component unit test file', async () => {
    const result = createComponentUnitTest('component-with-css');

    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-with-css.spec.tsx'
    );

    const expectedOutput = await fsExtra.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });

  it('Can build content for component e2e test file', async () => {
    const result = createComponente2eTest('component-no-css');

    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-with-css-e2e.tsx'
    );

    const expectedOutput = await fsExtra.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });

  it('Can build content for shadow component unit test file', async () => {
    const result = createShadowComponentUnitTest('component-css-shadow');

    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-css-shadow.spec.tsx'
    );

    const expectedOutput = await fsExtra.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });

  it('Can build content for shadow component e2e test file', async () => {
    const result = createShadowComponente2eTest('component-css-shadow');

    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-css-shadow-e2e.tsx'
    );

    const expectedOutput = await fsExtra.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
});
