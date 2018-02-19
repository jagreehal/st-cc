import * as fse from 'fs-extra';
import * as path from 'path';
import { createStyleContent } from './style';

describe('When building content for style', () => {
  it('Can build content for component style file', async () => {
    const result = createStyleContent({
      componentName: 'my-app'
    });

    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/style.css'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });

  it('Can build content for shadow component style file', async () => {
    const result = createStyleContent({
      componentName: 'my-app',
      isShadow: true
    });

    const expectedOutputPath = path.join(
      __dirname,
      'tests/expected/style-shadow.css'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());

  });
});
