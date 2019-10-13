import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-no-css'
})
export class ComponentNoCss {
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
