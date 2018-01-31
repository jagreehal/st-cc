import { convertComponentNameToComponentClassName } from './index';

describe('When using utils file', () => {
  it('Should be able to convert component name', () => {
    expect(convertComponentNameToComponentClassName('my-app')).toBe('MyApp');
  });
});
