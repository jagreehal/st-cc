type CreateStyleArgs = {
  componentName: string;
  isShadow?: boolean;
};

export function createStyleContent({
  componentName,
  isShadow = false
}: CreateStyleArgs) {
  return `${isShadow ? ':host' : componentName} {
  display: block; /* by default, custom elements are display: inline */
}
`;
}
