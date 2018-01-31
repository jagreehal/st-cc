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
      'tests/expected/style.scss'
    );
    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
});
