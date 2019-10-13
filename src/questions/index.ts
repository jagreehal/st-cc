import { validateComponentName } from '../utils';
import { styleExtension, styleType } from '../types';

export type TypeAnswers = {
  currentDir: string;
  componentName?: string;
  styleExtension: styleExtension;
  styleType?: styleType;
  createTestFile: boolean;
};

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
    type: 'list',
    name: 'styleType',
    message: 'What type of style?',
    choices: ['shadow', 'scoped', 'standard'],
    filter(val: string) {
      return val.toLowerCase();
    },
    when: answers => {
      return answers.styleExtension !== 'none';
    }
  },
  {
    type: 'confirm',
    name: 'createTestFile',
    message: 'Create test files',
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
