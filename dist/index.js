#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const creator_1 = require("./creator");
const utils_1 = require("./utils");
const questions_1 = require("./questions");
const chalk = require('chalk');
console.log(chalk.blue(`Stencil component creator`));
const componentNameFromArgs = process.argv[2];
const hasProvidedComponentName = componentNameFromArgs !== undefined;
let welcomeMessage;
if (hasProvidedComponentName) {
    welcomeMessage = `Creating Stencil component ${componentNameFromArgs}`;
}
else {
    welcomeMessage = `Stencil component creator`;
}
console.log(chalk.blue(welcomeMessage));
if (hasProvidedComponentName) {
    const validationResult = utils_1.validateComponentName(componentNameFromArgs);
    if (validationResult.SUCCESS === false) {
        console.error(chalk.red(validationResult.errorMessage));
        process.exit(1);
    }
}
const questions = questions_1.getQuestions({
    hasProvidedComponentName
});
inquirer
    .prompt(questions)
    .then((answers) => {
    if (hasProvidedComponentName) {
        answers.componentName = componentNameFromArgs;
    }
    return creator_1.create(answers);
})
    .then(() => {
    console.log(chalk.green('All done!'));
})
    .catch((e) => {
    console.error(chalk.red(`${e}`));
});
//# sourceMappingURL=index.js.map