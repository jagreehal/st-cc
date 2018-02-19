require('source-map-support').install();
import * as fse from 'fs-extra';
import * as path from 'path';
import { TypeAnswers } from '../questions';
import { createComponentContent } from '../templates/component';
import { createStyleContent } from '../templates/style';
import { createComponentTestContent } from '../templates/test';
import { styleExtension } from '../types';

export const COMPONENTS_PATH = 'src/components';

export async function create({
  componentName,
  isShadow = false,
  styleExtension = 'none',
  createTestFile = true,
  currentDir = process.cwd()
}: TypeAnswers) {
  const componentsPath = path.join(currentDir, COMPONENTS_PATH);
  const componentPath = path.resolve(componentsPath, componentName);
  const directoryExists = await componentDirectoryExists(componentPath);
  if (directoryExists) {
    throw new Error(
      `A directory already exists for the component ${componentName}`
    );
  }

  await createFolder({ componentPath });

  await createComponent({ componentName, componentPath, isShadow, styleExtension });

  if (styleExtension !== 'none') {
    await createComponentStyleFile({ componentName, componentPath, isShadow, styleExtension });
  }

  if (createTestFile) {
    await createComponentTestFile({ componentName, componentPath });
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
  componentPath,
  isShadow,
  styleExtension
}: {
    componentName: string;
    componentPath: string;
    isShadow: boolean;
    styleExtension: styleExtension
  }) {
  const componentContent = createComponentContent({
    componentName,
    isShadow,
    styleExtension
  });

  return await fse.writeFile(
    path.resolve(componentPath, createComponentFileName(componentName)),
    componentContent
  );
}

async function createComponentStyleFile({
  componentName,
  componentPath,
  isShadow,
  styleExtension
}: {
    componentName: string;
    componentPath: string;
    isShadow: boolean;
    styleExtension: string;
  }) {
  const componentStyleContent = createStyleContent({
    componentName,
    isShadow
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
