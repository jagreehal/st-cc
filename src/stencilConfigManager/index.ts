import * as fse from 'fs-extra';

export function addComponentToNewBundle({
  stencilConfig,
  componentName
}: {
  stencilConfig: any;
  componentName: string;
}) {
  stencilConfig.config = stencilConfig.config || {};
  stencilConfig.config.bundles = stencilConfig.config.bundles || [];
  stencilConfig.config.bundles.push({
    components: [`${componentName}`]
  });

  return createJsonToConfig(stencilConfig);
}

export async function saveConfigFile(configFile: string, content: string) {
  return await fse.outputFile(configFile, content);
}

export function createJsonToConfig(stencilConfig: any) {
  return Object.keys(stencilConfig)
    .map(key => {
      return `exports.${key} = ${JSON.stringify(stencilConfig[key])};`;
    })
    .join('\n\n');
}
