import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'component-with-scss',
  styleUrl: 'component-with-scss.scss'
})
export class ComponentWithScss {
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
