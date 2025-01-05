// Import packages
import { writeFile } from 'fs/promises';
import inquirer from 'inquirer';

// License badge links
const licenseBadges = {
  MIT: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
  'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
  'GPL 3.0': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
  'BSD 3-Clause': '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
  None: '',
};

// Questions for user input
const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is your project name?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide usage instructions:',
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Provide contribution guidelines:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None'],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

// Function to generate the README content
function generateReadMeContent(responses) {
  const licenseBadge = licenseBadges[responses.license];

  return `
# ${responses.projectName}

${licenseBadge}

## Description
${responses.description}

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Tests](#tests)
5. [License](#license)
6. [Questions](#questions)

## Installation
${responses.installation}

## Usage
${responses.usage}

## Contributing
${responses.contribution}

## Tests
${responses.tests}

## License
This project is licensed under the ${responses.license} license.

## Questions
If you have any questions, you can contact me at [${responses.email}](mailto:${responses.email}).

You can also find more of my work at [GitHub](https://github.com/${responses.githubUsername}).
  `;
}

// Function to write README file
async function writeToFile(fileName, data) {
  try {
    await writeFile(fileName, data);
    console.log('README.md has been generated successfully!');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

// Function to initialize app
async function init() {
  try {
    const responses = await inquirer.prompt(questions);
    const readMeContent = generateReadMeContent(responses);
    await writeToFile('README.md', readMeContent.trim());
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function call to initialize app
init();
