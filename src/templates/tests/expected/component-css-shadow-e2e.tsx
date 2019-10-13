import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

async function getContentElement(element: E2EElement) {
  return await element.shadowRoot.querySelector('div');
}

describe('component-css-shadow e2e tests', () => {
  let page: E2EPage;
  let element: E2EElement;
  let contentElement: any;

  beforeEach(async () => {
    page = await newE2EPage({
      html: '<component-css-shadow first="Peter" last="Parker"></component-css-shadow>'
    });
    element = await page.find('component-css-shadow');
    contentElement = await element.shadowRoot.querySelector('div');
  });

  it('should work with both the first and the last name', async () => {
    expect(contentElement).toEqual('Hello, my name is Peter Parker');
  });

  it('should be able to change first and the last name', async () => {
    element.setProperty('first', 'Bruce');
    element.setProperty('last', 'Wayne');

    await page.waitForChanges();

    contentElement = await getContentElement(element);

    expect(contentElement).toEqualText('Hello, my name is Bruce Wayne');
  });
});
