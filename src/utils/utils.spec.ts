import {
  convertComponentNameToComponentClassName,
  validateComponentName
} from './index';

describe('When using utils file', () => {
  it('Should be able to convert component name', () => {
    expect(convertComponentNameToComponentClassName('my-app')).toBe('MyApp');
  });

  it('Should return true if component name valid', () => {
    const result = validateComponentName('x-x');
    expect(result.SUCCESS).toBeTruthy();
    expect(result.errorMessage).toBeUndefined();
  });

  it('Should return false if component name is invalid', () => {
    const result = validateComponentName('x-x-');
    expect(result.SUCCESS).toBeFalsy();
    expect(result.errorMessage).toBeDefined();
  });
});
