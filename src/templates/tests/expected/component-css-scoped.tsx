import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-css-scoped',
  styleUrl: './component-css-scoped.css',
  scoped: true
})
export class ComponentCssScoped {
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
