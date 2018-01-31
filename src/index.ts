import * as inquirer from 'inquirer';
import { create, CreateArgs } from './creator';
const chalk = require('chalk');


console.log(chalk.blue(`Stencil component creator`));

const questions = [
    {
        type: 'input',
        name: 'componentName',
        default: 'my-app',
        message: 'What is name of the component you want to create?',
        validate: (value: string) => {
            const pass = value.match(/^(?!-)(?=.*-)([a-z-]+){2,}(?:[^-])$/g);
            if (pass) {
                return true;
            }
            return 'Please enter a component name with at least one dash e.g. my-app';
        }
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
    },
    {
        type: 'confirm',
        name: 'addToStencilConfig',
        message:
            'Add component to stencil.config? (Warning this may reformat your stencil.config.js file)',
        default: false
    }
];

inquirer.prompt(questions).then((answers: CreateArgs) => {
    create(answers)
        .then(() => {
            console.log(chalk.green('All done!'));
        })
        .catch((e: any) => {
            console.log(chalk.red(`On no: ${e}`));
        });
});
