import * as fse from 'fs-extra';
import * as path from 'path';
import { createComponentTestContent } from './test';

describe('When test content for component', () => {
  it('Can build content for component test file', async () => {
    const result = createComponentTestContent({
      componentName: 'my-app'
    });

    const expectedOutputPath = path.join(__dirname, 'tests/expected/test.tsx');

    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
});
