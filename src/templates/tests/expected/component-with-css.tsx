import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-with-css',
  styleUrl: './component-with-css.css'
})
export class ComponentWithCss {
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
