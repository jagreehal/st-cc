import { convertComponentNameToComponentClassName } from '../utils';
import { styleExtension } from '../types';

type CreateComponentArgs = {
  componentName: string;
  styleExtension?: styleExtension;
  isShadow?: boolean;
};

export function createComponentContent({
  componentName,
  styleExtension = 'none',
  isShadow = false
}: CreateComponentArgs) {
  const componentTags = [`tag: '${componentName}'`];
  if (styleExtension !== 'none') {
    componentTags.push(`styleUrl: '${componentName}.${styleExtension}'`);
  }

  if (isShadow) {
    componentTags.push(`shadow: true`);
  }

  return `import { Component, Prop } from '@stencil/core';

@Component({
  ${componentTags.join(`,\n  `)}
})
export class ${convertComponentNameToComponentClassName(componentName)} {
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
