# AutomationSy Documentation

## 💡 Introdução

> _Está documentação se encontra em 🇺🇸 Inglês, no entanto está disponível a documentação em português do 🇧🇷 Brasil
> clicando [aqui](README_PT_BR.md)_

**AutomationSy** é um automatizador de testes dedicado para os QA.

Você pode criar seus testes com códigos em javascript ou typescript, além disso os testes podem ser interpretados de uma forma mais fácil, sem muitas complicações nas configurações dos testes ou no andamento das codificações dos testes

Contudo a biblioteca tem como foco somente a automação dos testes lidando com elementos da página e ações com alta velocidade.

AutomationSy tem como núcleo ou dependência o puppeteer, no qual consegue se conectar com o navegador e realizar interações por uma codificação bem extensa. Diferente do puppeteer, o AutomationSy se torna uma solução que o usuário que está programando os testes, tenha menos esforço de código e mais rapidez na codificação de cenários.

<br>

## 💾 Instalação

Basta clonar o projeto ou baixar o projeto para o seu ambiente.

```bash
git clone https://github.com/charleslana/automationsy.git
```

<br>

## 🔧 Configuração inicial

_É necessário node instalado_

Execute a instalação das dependências

```bash
npm i
```

<br>

## 📄 Documentação/API detalhada

Você pode acessar o site da documentação por [aqui](linkdoc)

<br>

### 📝 Como criar meus testes?

Abaixo é um exemplo de como navegar em uma página

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

## ⏱️ Executando os testes

_Javascript_

```bash
node test.js
```

_Typescript_

```bash
npm run build && node build/test.js
```

<br>

### 📌 Qual sistema operacional suporta?

Foi testado em apenas Linux, você pode testar para verificar se funciona em outros OS.

<br>

## 💪 Contribuição

Uma vez que o projeto é livre para uso conforme na licença, você pode contribuir com novas ideias e melhorias, fique
livre para opinar, faça um fork, crie uma pull request ou abra uma issue.

Contribuições são sempre bem-vindas!

Veja [`CONTRIBUTING.md`](CONTRIBUTING.md) para saber como começar.

Por favor, siga o [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) desse projeto.

<br>

## 🎥 Demonstração

Acesse o vídeo da demonstração e uso [YouTube](linkyoutube)

<br>

## 📄 Licença

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](LICENSE.md)

<br>

## 📢 Autor

- [@charleslana](https://www.github.com/charleslana)
