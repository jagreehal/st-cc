#!/usr/bin/env node
'use strict';
import * as inquirer from 'inquirer';
import { create } from './creator';
import { validateComponentName } from './utils';
import { TypeAnswers, getQuestions } from './questions';

const chalk = require('chalk');

console.log(chalk.blue(`Stencil component creator`));

const componentNameFromArgs = process.argv[2];
const hasProvidedComponentName = componentNameFromArgs !== undefined;

let welcomeMessage;
if (hasProvidedComponentName) {
  welcomeMessage = `Creating Stencil component ${componentNameFromArgs}`;
} else {
  welcomeMessage = `Stencil component creator`;
}
console.log(chalk.blue(welcomeMessage));

if (hasProvidedComponentName) {
  const validationResult = validateComponentName(componentNameFromArgs);
  if (validationResult.SUCCESS === false) {
    console.error(chalk.red(validationResult.errorMessage));
    process.exit(1);
  }
}

const questions = getQuestions({
  hasProvidedComponentName
});

inquirer
  .prompt(questions)
  .then((answers: TypeAnswers) => {
    if (hasProvidedComponentName) {
      answers.componentName = componentNameFromArgs;
    }
    return create(answers);
  })
  .then(() => {
    console.log(chalk.green('All done!'));
  })
  .catch((e: any) => {
    console.error(chalk.red(`${e}`));
  });
