# AutomationSy Documentation

## π‘ Introduction

> _This documentation is in πΊπΈ English, however the Portuguese documentation from π§π· Brazil is available by
> clicking [here](README_PT_BR.md)_

**AutomationSy** is a test automation tool dedicated to QA.

However, the lib is only focused on automating tests dealing with page elements and actions with high speed.

AutomationSy has puppeteer as its core or dependency, in which it can connect with the browser and carry out interactions through a very extensive coding. Unlike puppeteer, AutomationSy becomes a solution that the user who is programming the tests, has less code effort and faster coding scenarios.

<br>

## πΎ Installation

Just clone the project or download the project to your environment.

```bash
git clone https://github.com/charleslana/automationsy.git
```

<br>

## π§ Initial setup

_Node installed required_

Run the installation of dependencies

```bash
npm i
```

<br>

## π Detailed documentation/API

You can access the documentation site [here](https://automationsy.netlify.app/docs-v2.html#start)

<br>

### π How to create my tests?

```javascript
const { Action, Config, Resource } = require('automationsy');

(async () => {
  Config.setHeadless(true);
  await Action.navigate('https://github.com/charleslana');
  await Resource.getText('.vcard-fullname');
  await Action.closeBrowser();
})();
```

<br>

## β±οΈ Running the tests

_Javascript_

```bash
node test.js
```

_Typescript_

```bash
tsc && node build/test.js
```

<br>

### π Which operating system does it support?

It has been tested on Linux only, you can test to see if it works on other OS.

<br>

## πͺ Contribution

Since the project is free to use as per the license, you can contribute new ideas and improvements, stay
free to comment, fork, create a pull request, or open an issue.

Contributions are always welcome!

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to get started.

Please follow the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) of this project.

<br>

## π₯ Demo

Access the demo recorder and use [YouTube](https://www.youtube.com/watch?v=rnipWaD5LEU)

<br>

## π License

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](LICENSE.md)

<br>

## π’ Author

- [@charleslana](https://www.github.com/charleslana)
