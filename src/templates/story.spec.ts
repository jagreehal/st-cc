import * as fse from 'fs-extra';
import * as path from 'path';
import { createComponentStoryContent } from './story';

describe('When story content for component', () => {
  it('Can build content for component story file', async () => {
    const result = createComponentStoryContent({
      componentName: 'my-app'
    });

    const expectedOutputPath = path.join(__dirname, 'tests/expected/story.tsx');

    const expectedOutput = await fse.readFile(expectedOutputPath);

    expect(result).toBe(expectedOutput.toString());
  });
});
