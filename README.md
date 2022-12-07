# AutomationSy Documentation

## 💡 Introduction

> _This documentation is in 🇺🇸 English, however the Portuguese documentation from 🇧🇷 Brazil is available by
> clicking [here](README_PT_BR.md)_

**AutomationSy** is a test automation tool dedicated to QA.

However, the lib is only focused on automating tests dealing with page elements and actions with high speed.

AutomationSy has puppeteer as its core or dependency, in which it can connect with the browser and carry out interactions through a very extensive coding. Unlike puppeteer, AutomationSy becomes a solution that the user who is programming the tests, has less code effort and faster coding scenarios.

<br>

## 💾 Installation

Just clone the project or download the project to your environment.

```bash
git clone https://github.com/charleslana/automationsy.git
```

<br>

## 🔧 Initial setup

_Node installed required_

Run the installation of dependencies

```bash
npm i
```

<br>

## 📄 Detailed documentation/API

You can access the documentation site [here](linkdoc)

<br>

### 📝 How to create my tests?

```javascript
import { AutomationSy } from 'automationsy';
//const { AutomationSy } = require('automationsy');

(async () => {
  await AutomationSy.init();
  await AutomationSy.navigate('https://github.com/charleslana');
  await AutomationSy.dispose();
})();
```

<br>

## ⏱️ Running the tests

_Javascript_

```bash
node test.js
```

_Typescript_

```bash
npm run build && node build/test.js
```

<br>

### 📌 Which operating system does it support?

It has been tested on Linux only, you can test to see if it works on other OS.

<br>

## 💪 Contribution

Since the project is free to use as per the license, you can contribute new ideas and improvements, stay
free to comment, fork, create a pull request, or open an issue.

Contributions are always welcome!

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to get started.

Please follow the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) of this project.

<br>

## 🎥 Demo

Access the demo recorder and use [YouTube](linkyoutube)

<br>

## 📄 License

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](LICENSE.md)

<br>

## 📢 Author

- [@charleslana](https://www.github.com/charleslana)
