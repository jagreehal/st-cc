import { validateComponentName } from '../utils';

export type TypeAnswers = {
  currentDir: string;
  componentName?: string;
  isShadow: boolean;
  createStyleFile: boolean;
  createTestFile: boolean;
}

export const QUESTIONS = [
  {
    type: 'input',
    name: 'componentName',
    default: 'my-app',
    message: 'What is name of the component you want to create?',
    validate: (value: string) => {
      const result = validateComponentName(value);
      if (result.SUCCESS) {
        return true;
      }
      return result.errorMessage;
    }
  },
  {
    type: 'confirm',
    name: 'isShadow',
    message: 'Is shadow component?',
    default: false
  },
  {
    type: 'confirm',
    name: 'createStyleFile',
    message: 'Create style file (.scss)?',
    default: true
  },
  {
    type: 'confirm',
    name: 'createTestFile',
    message: 'Create test file?',
    default: true
  }
];

export function getQuestions({
  hasProvidedComponentName = false
}: {
    hasProvidedComponentName?: boolean;
  }) {
  const questions = [...QUESTIONS];
  if (hasProvidedComponentName) {
    questions.shift();
  }
  return questions;
}
