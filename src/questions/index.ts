import { validateComponentName } from '../utils';
import { styleExtension } from '../types';

export type TypeAnswers = {
  currentDir: string;
  componentName?: string;
  isShadow: boolean;
  styleExtension: styleExtension,
  createTestFile: boolean;
  createStoryFile: boolean;
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
    type: 'list',
    name: 'styleExtension',
    default: 'css',
    message: 'What type of style file?',
    choices: ['scss', 'css', 'none'],
    filter(val: string) {
      return val.toLowerCase();
    }
  },
  {
    type: 'confirm',
    name: 'createTestFile',
    message: 'Create test file?',
    default: true
  },
  {
    type: 'confirm',
    name: 'createStoryFile',
    message: 'Create storybook file?',
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
