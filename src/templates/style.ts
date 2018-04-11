type CreateStyleArgs = {
  componentName: string;
  isShadow?: boolean;
};

export function createStyleContent({
  componentName,
  isShadow = false
}: CreateStyleArgs) {
  return `${isShadow ? ':host' : componentName} {}`;
}
