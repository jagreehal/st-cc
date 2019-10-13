import { newSpecPage } from '@stencil/core/testing';
import { ComponentWithCss } from './component-with-css';

describe('component-with-css unit tests', () => {
  let page;
  let element;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ComponentWithCss],
      html: '<component-with-css first="Peter" last="Parker"></component-with-css>'
    });
    element = await page.doc.querySelector('component-with-css');
  });

  it('should work with both the first and the last name', async () => {
    expect(element.textContent).toEqual('Hello, my name is Peter Parker');
  });

  it('should be able to change first and the last name', async () => {
    element.first = 'Bruce';
    element.last = 'Wayne';
    await page.waitForChanges();
    expect(element.textContent).toEqual('Hello, my name is Bruce Wayne');
  });
});
