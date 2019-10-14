import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-with-less',
  styleUrl: 'component-with-less.less'
})
export class ComponentWithLess {
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
