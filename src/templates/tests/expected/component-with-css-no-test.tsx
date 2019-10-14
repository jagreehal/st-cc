import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-with-css-no-test',
  styleUrl: 'component-with-css-no-test.css'
})
export class ComponentWithCssNoTest {
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
