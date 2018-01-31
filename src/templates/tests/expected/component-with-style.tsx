import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {
  @Prop() name: string;

  render() {
    return <div>My name is {this.name}</div>;
  }
}
