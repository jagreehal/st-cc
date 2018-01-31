require('source-map-support').install();
import * as fse from 'fs-extra';
import * as path from 'path';
import { createComponentContent } from '../templates/component';
import { createStyleContent } from '../templates/style';
import { createComponentTestContent } from '../templates/test';
import {
  addComponentToNewBundle,
  saveConfigFile
} from '../stencilConfigManager';

export const COMPONENTS_PATH = 'src/components';

export interface CreateArgs {
  currentDir: string;
  componentName: string;
  createStyleFile: boolean;
  createTestFile: boolean;
  addToStencilConfig: boolean;
}

export async function create({
  componentName,
  createStyleFile = true,
  createTestFile = true,
  addToStencilConfig = false,
  currentDir = process.cwd()
}: CreateArgs) {
  const componentsPath = path.join(currentDir, COMPONENTS_PATH);
  const componentPath = path.resolve(componentsPath, componentName);
  const directoryExists = await componentDirectoryExists(componentPath);
  if (directoryExists) {
    throw new Error(
      `A directory already exists for the component ${componentName}`
    );
  }

  await createFolder({ componentPath });

  await createComponent({ componentName, componentPath });

  if (createStyleFile) {
    await createComponentStyleFile({ componentName, componentPath });
  }

  if (createTestFile) {
    await createComponentTestFile({ componentName, componentPath });
  }

  if (addToStencilConfig) {
    await addComponentToStencilConfig({ componentName, currentDir });
  }
}

async function addComponentToStencilConfig({
  componentName,
  currentDir
}: {
  componentName: string;
  currentDir: string;
}) {
  let newStencilConfig;
  const configPath = path.resolve(currentDir, 'stencil.config.js');
  try {
    const stencilConfig = require(configPath);
    newStencilConfig = addComponentToNewBundle({
      stencilConfig,
      componentName
    });
  } catch (err) {
    throw new Error(
      `Cannot add component ${componentName} to Stencil config because config file ${configPath} could not be loaded`
    );
  }

  try {
    await saveConfigFile(configPath, newStencilConfig);
  } catch (error) {
    throw new Error(`Error writing config file: ${error}`);
  }
}

async function componentDirectoryExists(componentName: string) {
  return await fse.pathExists(componentName);
}

async function createFolder({ componentPath }: { componentPath: string }) {
  return await fse.ensureDir(componentPath);
}
function createComponentFileName(
  componentName: string,
  extension: string = 'tsx'
) {
  return `${componentName}.${extension}`;
}

async function createComponent({
  componentName,
  componentPath
}: {
  componentName: string;
  componentPath: string;
}) {
  const componentContent = createComponentContent({
    componentName,
    styleFile: 'scss'
  });

  return await fse.writeFile(
    path.resolve(componentPath, createComponentFileName(componentName)),
    componentContent
  );
}

async function createComponentStyleFile({
  componentName,
  componentPath,
  styleExtension = 'scss'
}: {
  componentName: string;
  componentPath: string;
  styleExtension?: string;
}) {
  const componentStyleContent = createStyleContent({
    componentName
  });

  return await fse.writeFile(
    path.resolve(
      componentPath,
      createComponentFileName(componentName, styleExtension)
    ),
    componentStyleContent
  );
}

async function createComponentTestFile({
  componentName,
  componentPath,
  testPattern = 'spec'
}: {
  componentName: string;
  componentPath: string;
  testPattern?: string;
}) {
  const componentTestContent = createComponentTestContent({
    componentName
  });

  const testFileName = `${componentName}.${testPattern}`;
  return await fse.writeFile(
    path.resolve(componentPath, createComponentFileName(testFileName)),
    componentTestContent
  );
}
