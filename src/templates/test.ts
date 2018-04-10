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

  return `import { TestWindow } from '@stencil/core/testing';
import { ${componentClassName} } from './${componentName}';

describe('${componentName}', () => {
  it('should build', () => {
    expect(new ${componentClassName}()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    let window;

    beforeEach(async () => {
      window = new TestWindow();
      element = await window.load({
        components: [${componentClassName}],
        html: '<${componentName}></${componentName}>'
      });
    });

    it('should work with both the first and the last name', async () => {
      element.first = 'Peter';
      element.last = 'Parker';
      await window.flush();
      expect(element.textContent).toEqual('Hello, my name is Peter Parker');
    });
  });
});
`;
}
