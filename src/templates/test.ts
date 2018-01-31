import { convertComponentNameToComponentClassName } from '../utiils';

type CreateComponentArgs = {
  componentName: string;
};

export function createComponentTestContent({
  componentName
}: CreateComponentArgs) {
  const componentClassName = convertComponentNameToComponentClassName(
    componentName
  );

  return `import { render } from '@stencil/core/testing';
import { ${componentClassName} } from './${componentName}';

describe('${componentName}', () => {
  it('should build', () => {
    expect(new ${componentClassName}()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [${componentClassName}],
        html: '<${componentName}></${componentName}>'
      });
    });
  });
});
`;
}
