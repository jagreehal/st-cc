"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function createComponentTestContent({ componentName }) {
    const componentClassName = utils_1.convertComponentNameToComponentClassName(componentName);
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
        html: '<${componentName}><${componentName}>'
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
exports.createComponentTestContent = createComponentTestContent;
//# sourceMappingURL=test.js.map