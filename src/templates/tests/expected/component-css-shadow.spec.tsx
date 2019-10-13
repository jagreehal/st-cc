import { newSpecPage } from '@stencil/core/testing';
import { ComponentCssShadow } from './component-css-shadow';

describe('component-css-shadow unit tests', () => {
  let page;
  let shadowRoot;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ComponentCssShadow],
      html: '<component-css-shadow first="Peter" last="Parker"></component-css-shadow>',
      supportsShadowDom: true
    });
    shadowRoot = page.root.shadowRoot;
  });

  it('should work with both the first and the last name', async () => {
    expect(shadowRoot.textContent).toEqual('Hello, my name is Peter Parker');
  });

  it('should be able to change first and the last name', async () => {
    page.root.first = 'Bruce';
    page.root.last = 'Wayne';

    await page.waitForChanges();

    expect(shadowRoot.textContent).toEqual('Hello, my name is Bruce Wayne');
  });
});
