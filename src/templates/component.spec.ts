import * as fse from 'fs-extra';
import * as path from 'path';

import { createComponentContent } from './component';

describe('When building content for component', () => {
  it('Can build content for component with css', async () => {
    const result = createComponentContent({
      componentName: 'my-app',
      styleExtension: 'css'
    });
    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-with-css.tsx'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
  it('Can build content for component with scss', async () => {
    const result = createComponentContent({
      componentName: 'my-app',
      styleExtension: 'scss'
    });
    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-with-scss.tsx'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
  it('Can build content for component without style', async () => {
    const result = createComponentContent({
      componentName: 'my-app',
      styleExtension: 'none'
    });
    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-without-style.tsx'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
  it('Can build content for shadow component', async () => {
    const result = createComponentContent({
      componentName: 'my-app',
      isShadow: true
    });
    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-shadow.tsx'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
});
