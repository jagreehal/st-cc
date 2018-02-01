import { convertComponentNameToComponentClassName } from '../utils';

type CreateComponentArgs = {
  componentName: string;
  styleFile?: string;
  isShadow?: boolean;
};

export function createComponentContent({
  componentName,
  styleFile,
  isShadow = false
}: CreateComponentArgs) {
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
