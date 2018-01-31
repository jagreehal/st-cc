export function convertComponentNameToComponentClassName(
  componentName: string = ''
) {
  return componentName
    .split('-')
    .map(w => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join('');
}
