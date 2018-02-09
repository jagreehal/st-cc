#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const creator_1 = require("./creator");
const utils_1 = require("./utils");
const questions_1 = require("./questions");
const chalk = require('chalk');
const componentNameFromArgs = process.argv[2];
const hasProvidedComponentName = componentNameFromArgs !== undefined;
let welcomeMessage;
if (hasProvidedComponentName) {
    welcomeMessage = `💖 Creating Stencil component ${componentNameFromArgs}`;
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const answers = yield inquirer.prompt(questions);
            if (hasProvidedComponentName) {
                answers.componentName = componentNameFromArgs;
            }
            console.log(chalk.green(`🚀 Stencil component ${answers.componentName} created!`));
            yield creator_1.create(answers);
        }
        catch (error) {
            console.error(chalk.red(`${error}`));
        }
    });
}
run();
//# sourceMappingURL=index.js.map