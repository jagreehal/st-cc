type CreateStyleArgs = {
  componentName: string;
};

export function createStyleContent({ componentName }: CreateStyleArgs) {
  return `${componentName} {
}
`;
}
