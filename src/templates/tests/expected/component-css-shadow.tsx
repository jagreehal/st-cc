import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-css-shadow',
  styleUrl: './component-css-shadow.css',
  shadow: true
})
export class ComponentCssShadow {
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
