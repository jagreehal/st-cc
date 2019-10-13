import { convertComponentNameToComponentClassName } from '../utils';
import { styleExtension, styleType } from '../types';

type CreateComponentArgs = {
  componentName: string;
  styleExtension?: styleExtension;
  styleType?: styleType;
};

export function createComponentContent({
  componentName,
  styleExtension = 'none',
  styleType = 'standard'
}: CreateComponentArgs) {
  const componentTags = [`tag: '${componentName}'`];
  if (styleExtension !== 'none') {
    componentTags.push(`styleUrl: './${componentName}.${styleExtension}'`);
  }

  if (styleType !== 'standard') {
    componentTags.push(`${styleType}: true`);
  }

  return `import { Component, Prop, h } from '@stencil/core';

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
