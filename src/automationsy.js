import puppeteer, { Browser, Page } from 'puppeteer';

export default class AutomationSy {
  static #page = new Page();
  static #browser = new Browser();
  static #isMaximized = false;
  static #width = null;
  static #height = null;

  static async init() {
    const args = ['--no-sandbox', '--incognito'];
    if (this.maximized) {
      args.push('--start-maximized');
    }
    if (this.width != null) {
      args.push(`--window-size=${this.width},${this.height}`);
    }
    this.#browser = await puppeteer.launch({
      defaultViewport: null,
      headless: false,
      args: args,
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    this.#page = await this.#browser.newPage();
    this.#page.setDefaultTimeout(0);
  }

  static set width(width) {
    this.#width = width;
  }

  static get width() {
    return this.#width;
  }

  static set height(height) {
    this.#height = height;
  }

  static get height() {
    return this.#height;
  }

  static set maximized(isMaximized) {
    this.#isMaximized = isMaximized;
  }

  static get maximized() {
    return this.#isMaximized;
  }

  static async dispose() {
    await this.#browser.close();
  }

  static async navigate(url) {
    if (url === undefined || url.trim() === '') {
      throw new Error('Enter a URL to browse a page');
    }
    this.#check();
    await (await this.#browser.pages())[0].close();
    await this.#page.goto(url);
  }

  static async type(locator, text) {
    if (locator === undefined || locator.trim() === '') {
      throw new Error('Enter a locator element');
    }
    if (text === undefined || text.trim() === '') {
      throw new Error('Enter a text to type');
    }
    this.#check();
    if (locator.startsWith('/') || locator.includes('//')) {
      const xpath = await this.#page.$x(locator);
      await xpath[0].type(text);
      return;
    }
    const locators = await this.#page.$$(locator);
    if (locators.length > 1) {
      throw new Error(
        'Locator has more than 1 child, total: ' + locators.length
      );
    }
    await this.#page.type(locator, text);
  }

  static async focus(locator) {
    if (locator === undefined || locator.trim() === '') {
      throw new Error('Enter a locator element');
    }
    this.#check();
    if (locator.startsWith('/') || locator.includes('//')) {
      throw new Error('Xpath no supported');
    }
    const locators = await this.#page.$$(locator);
    if (locators.length > 1) {
      throw new Error(
        'Locator has more than 1 child, total: ' + locators.length
      );
    }
    await this.#page.focus(locator);
  }

  static async keyboard(key) {
    if (key === undefined || key.trim() === '') {
      throw new Error('Enter a keyboard');
    }
    this.#check();
    await this.#page.keyboard.press(key);
  }

  static async clear(locator) {
    if (locator === undefined || locator.trim() === '') {
      throw new Error('Enter a locator element');
    }
    this.#check();
    const locators = await this.#page.$$(locator);
    if (locators.length > 1) {
      throw new Error(
        'Locator has more than 1 child, total: ' + locators.length
      );
    }
    await locators[0].click({ clickCount: 3 });
    await locators[0].press('Backspace');
  }

  static async isDisabled(locator) {
    if (locator === undefined || locator.trim() === '') {
      throw new Error('Enter a locator element');
    }
    this.#check();
    if (locator.startsWith('/') || locator.includes('//')) {
      return (await this.#page.$x(locator).length) !== 0;
    }
    const locators = await this.#page.$$(locator);
    if (locators.length > 1) {
      throw new Error(
        'Locator has more than 1 child, total: ' + locators.length
      );
    }
    return (await this.#page.$(locator)) !== null;
  }

  static async getValue(locator) {
    if (locator === undefined || locator.trim() === '') {
      throw new Error('Enter a locator element');
    }
    this.#check();
    return await this.#page.$eval(locator, element =>
      element.getAttribute('value')
    );
  }

  static async getClass(locator) {
    if (locator === undefined || locator.trim() === '') {
      throw new Error('Enter a locator element');
    }
    this.#check();
    return await this.#page.$eval(locator, element =>
      element.getAttribute('class')
    );
  }

  static async sleep(milliseconds = 5000) {
    await new Promise(_func => setTimeout(_func, milliseconds));
  }

  static #check() {
    if (this.#page === undefined) {
      throw new Error(
        'The page was not started, check the init method started'
      );
    }
  }
}
