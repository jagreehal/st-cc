"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function createComponentContent({ componentName, styleFile, isShadow = false }) {
    const componentTags = [`tag: '${componentName}'`];
    if (styleFile) {
        componentTags.push(`styleUrl: '${componentName}.${styleFile}'`);
    }
    if (isShadow) {
        componentTags.push(`shadow: true`);
    }
    return `import { Component, Prop } from '@stencil/core';

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