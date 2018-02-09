#!/usr/bin/env node
'use strict';
import * as inquirer from 'inquirer';
import { create } from './creator';
import { validateComponentName } from './utils';
import { TypeAnswers, getQuestions } from './questions';

const chalk = require('chalk');

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

async function run() {
  try {
    const answers = await inquirer.prompt(questions) as TypeAnswers;

    if (hasProvidedComponentName) {
      answers.componentName = componentNameFromArgs;
    }
    console.log(chalk.green(`🚀 Stencil component ${answers.componentName} created!`));

    await create(answers);
  } catch (error) {
    console.error(chalk.red(`${error}`));
  }

}

run();