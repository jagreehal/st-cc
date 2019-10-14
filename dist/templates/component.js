"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function createComponentContent({ componentName, styleExtension = 'none', styleType = 'standard' }) {
    const componentTags = [`tag: '${componentName}'`];
    if (styleExtension !== 'none') {
        componentTags.push(`styleUrl: '${componentName}.${styleExtension}'`);
    }
    if (styleType !== 'standard') {
        componentTags.push(`${styleType}: true`);
    }
    return `import { Component, Prop, h } from '@stencil/core';

@Component({
  ${componentTags.join(`,\n  `)}
})
export class ${utils_1.convertComponentNameToComponentClassName(componentName)} {
  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
        Hello, my name is {this.first} {this.last}
      </div>
    );
  }
}
`;
}
exports.createComponentContent = createComponentContent;
//# sourceMappingURL=component.js.map