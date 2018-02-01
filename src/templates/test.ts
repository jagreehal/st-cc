import { convertComponentNameToComponentClassName } from '../utils';

type CreateComponentArgs = {
  componentName: string;
};

export function createComponentTestContent({
  componentName
}: CreateComponentArgs) {
  const componentClassName = convertComponentNameToComponentClassName(
    componentName
  );

  return `import { render, flush } from '@stencil/core/testing';
import { ${componentClassName} } from './${componentName}';

describe('${componentName}', () => {
  it('should build', () => {
    expect(new ${componentClassName}()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [${componentClassName}],
        html: '<${componentName}></${componentName}>'
      });
    });

    it('should work with both the first and the last name', async () => {
      element.first = 'Peter';
      element.last = 'Parker';
      await flush(element);
      expect(element.textContent).toEqual('Hello, my name is Peter Parker');
    });
  });
});
`;
}
