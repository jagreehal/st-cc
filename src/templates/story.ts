import { convertComponentNameToComponentClassName } from '../utils';

type CreateComponentArgs = {
  componentName: string;
};

export function createComponentStoryContent({
  componentName
}: CreateComponentArgs) {
  const componentClassName = convertComponentNameToComponentClassName(
    componentName
  );

  return `import { storiesOf } from '@storybook/polymer';
const stories = storiesOf('${componentClassName} component', module);
stories.add('default', () => ('<${componentName}></${componentName}>'));
`;
}
