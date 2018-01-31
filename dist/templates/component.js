"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utiils_1 = require("../utiils");
function createComponentContent({ componentName, styleFile }) {
    return `import { Component, Prop } from '@stencil/core';

@Component({${styleFile
        ? `
  tag: '${componentName}',
  styleUrl: '${componentName}.${styleFile}'`
        : `
  tag: '${componentName}'`}
})
export class ${utiils_1.convertComponentNameToComponentClassName(componentName)} {
  @Prop() name: string;

  render() {
    return <div>My name is {this.name}</div>;
  }
}
`;
}
exports.createComponentContent = createComponentContent;
//# sourceMappingURL=component.js.map