import { styleType } from './../types/index';
require('source-map-support').install();
import fsExtra from 'fs-extra';
import path from 'path';
import { TypeAnswers } from '../questions';
import { createComponentContent } from '../templates/component';
import { createStyleContent } from '../templates/style';
import {
  createShadowComponentUnitTest,
  createComponentUnitTest
} from '../templates/test';
import { styleExtension } from '../types';

export const COMPONENTS_PATH = 'src/components';

export async function create({
  componentName,
  styleType = 'standard',
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
  const isShadow = styleType === 'shadow';

  await createFolder({ componentPath });

  await createComponent({
    componentName,
    componentPath,
    styleType,
    styleExtension
  });

  if (styleExtension !== 'none') {
    await createComponentStyleFile({
      componentName,
      componentPath,
      isShadow,
      styleExtension
    });
  }

  if (createTestFile) {
    await createComponentUnitTestFile({
      componentName,
      componentPath,
      isShadow
    });
    await createComponente2eTestFile({
      componentName,
      componentPath,
      isShadow
    });
  }
}

async function componentDirectoryExists(componentName: string) {
  return await fsExtra.pathExists(componentName);
}

async function createFolder({ componentPath }: { componentPath: string }) {
  return await fsExtra.ensureDir(componentPath);
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
  styleType,
  styleExtension
}: {
  componentName: string;
  componentPath: string;
  styleType: styleType;
  styleExtension: styleExtension;
}) {
  const componentContent = createComponentContent({
    componentName,
    styleType,
    styleExtension
  });

  return await fsExtra.writeFile(
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

  return await fsExtra.writeFile(
    path.resolve(
      componentPath,
      createComponentFileName(componentName, styleExtension)
    ),
    componentStyleContent
  );
}

async function createComponentUnitTestFile({
  componentName,
  componentPath,
  isShadow
}: {
  isShadow: boolean;
  componentName: string;
  componentPath: string;
}) {
  const componentTestContent = isShadow
    ? createShadowComponentUnitTest(componentName)
    : createComponentUnitTest(componentName);

  const testFileName = `${componentName}.spec`;
  return await fsExtra.writeFile(
    path.resolve(componentPath, createComponentFileName(testFileName)),
    componentTestContent
  );
}

async function createComponente2eTestFile({
  componentName,
  componentPath,
  isShadow
}: {
  isShadow: boolean;
  componentName: string;
  componentPath: string;
}) {
  const componentTestContent = isShadow
    ? createShadowComponentUnitTest(componentName)
    : createComponentUnitTest(componentName);

  const testFileName = `${componentName}-e2e`;
  return await fsExtra.writeFile(
    path.resolve(componentPath, createComponentFileName(testFileName)),
    componentTestContent
  );
}
