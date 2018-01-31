import { convertComponentNameToComponentClassName } from '../utiils';

type CreateComponentArgs = {
  componentName: string;
  styleFile?: string;
};

export function createComponentContent({
  componentName,
  styleFile
}: CreateComponentArgs) {
  return `import { Component, Prop } from '@stencil/core';

@Component({${
    styleFile
      ? `
  tag: '${componentName}',
  styleUrl: '${componentName}.${styleFile}'`
      : `
  tag: '${componentName}'`
  }
})
export class ${convertComponentNameToComponentClassName(componentName)} {
  @Prop() name: string;

  render() {
    return <div>My name is {this.name}</div>;
  }
}
`;
}
