import * as fse from 'fs-extra';
import * as path from 'path';

import { createComponentContent } from './component';

describe('When building content for component', () => {
  it('Can build content for component with style', async () => {
    const result = createComponentContent({
      componentName: 'my-app',
      styleFile: 'scss'
    });
    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-with-style.tsx'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
  it('Can build content for component without style', async () => {
    const result = createComponentContent({
      componentName: 'my-app'
    });
    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/component-without-style.tsx'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
});
