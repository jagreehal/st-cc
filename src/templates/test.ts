import { convertComponentNameToComponentClassName } from '../utils';
export function createShadowComponentUnitTest(componentName: string): string {
  const componentClassName = convertComponentNameToComponentClassName(
    componentName
  );
  return `import { newSpecPage } from '@stencil/core/testing';
import { ${componentClassName} } from './${componentName}';

describe('${componentName} unit tests', () => {
  let page;
  let shadowRoot;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [${componentClassName}],
      html: '<${componentName} first="Peter" last="Parker"></${componentName}>',
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
`;
}

export function createComponentUnitTest(componentName: string): string {
  const componentClassName = convertComponentNameToComponentClassName(
    componentName
  );
  return `import { newSpecPage } from '@stencil/core/testing';
import { ${componentClassName} } from './${componentName}';

describe('${componentName} unit tests', () => {
  let page;
  let element;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [${componentClassName}],
      html: '<${componentName} first="Peter" last="Parker"></${componentName}>'
    });
    element = await page.doc.querySelector('${componentName}');
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
`;
}

export function createComponente2eTest(componentName: string): string {
  const componentClassName = convertComponentNameToComponentClassName(
    componentName
  );
  return `import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('${componentName} e2e tests', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: '<${componentName} first="Peter" last="Parker"></${componentName}>'
    });
    element = await page.find('${componentName}');
  });

  it('should work with both the first and the last name', async () => {
    expect(element).toEqualText('Hello, my name is Peter Parker');
  });

  it('should be able to change first and the last name', async () => {
    element.setProperty('first', 'Bruce');
    element.setProperty('last', 'Wayne');

    await page.waitForChanges();

    expect(element.textContent).toEqualText('Hello, my name is Bruce Wayne');
  });
});
`;
}

export function createShadowComponente2eTest(componentName: string): string {
  const componentClassName = convertComponentNameToComponentClassName(
    componentName
  );
  return `import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

async function getContentElement(element: E2EElement) {
  return await element.shadowRoot.querySelector('div');
}

describe('component-css-shadow e2e tests', () => {
  let page: E2EPage;
  let element: E2EElement;
  let contentElement: any;

  beforeEach(async () => {
    page = await newE2EPage({
      html: '<${componentName} first="Peter" last="Parker"></${componentName}>'
    });
    element = await page.find('${componentName}');
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
`;
}
