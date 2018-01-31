"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utiils_1 = require("../utiils");
function createComponentTestContent({ componentName }) {
    const componentClassName = utiils_1.convertComponentNameToComponentClassName(componentName);
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
exports.createComponentTestContent = createComponentTestContent;
//# sourceMappingURL=test.js.map