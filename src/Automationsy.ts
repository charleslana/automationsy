import AutomationSyError from './Error';
import IError from './IError';
import puppeteer, { Browser, ElementHandle, KeyInput, Page } from 'puppeteer';

export default class AutomationSy {
  private constructor() {
    //
  }

  private static page = new Page();
  private static browser = new Browser();
  private static headless = false;
  private static maximized = false;
  private static width = 800;
  private static height = 600;

  static async init(): Promise<void> {
    const args = ['--no-sandbox', '--incognito'];
    if (this.maximized) {
      args.push('--start-maximized');
    }
    if (!this.maximized) {
      args.push(`--window-size=${this.width},${this.height}`);
    }
    this.browser = await puppeteer.launch({
      defaultViewport: null,
      headless: this.headless,
      args: args,
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(0);
    console.log('Launching the browser');
  }

  static setHeadless(headless: boolean): void {
    this.headless = headless;
  }

  static setWindowSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  static setMaximized(maximized: boolean): void {
    this.maximized = maximized;
  }

  static async dispose(): Promise<void> {
    await this.browser.close();
  }

  static async navigate(url: string): Promise<void> {
    try {
      await (await this.browser.pages())[0].close();
      await this.page.goto(url);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async type(locator: string, text: string): Promise<void> {
    try {
      if (locator.startsWith('/') || locator.includes('//')) {
        const xpath = await this.page.$x(locator);
        await xpath[0].type(text);
        return;
      }
      await this.validateNthChild(locator);
      await this.page.type(locator, text);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async focus(locator: string): Promise<void> {
    if (locator.startsWith('/') || locator.includes('//')) {
      throw new AutomationSyError('Xpath no supported');
    }
    try {
      await this.validateNthChild(locator);
      await this.page.focus(locator);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async keyboard(key: KeyInput): Promise<void> {
    try {
      await this.page.keyboard.press(key);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async clear(locator: string): Promise<void> {
    try {
      const locators = await this.validateNthChild(locator);
      await locators[0].click({ clickCount: 3 });
      await locators[0].press('Backspace');
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async isDisabled(locator: string): Promise<boolean> {
    if (locator.startsWith('/') || locator.includes('//')) {
      const exist = await this.page.$x(locator);
      return exist.length !== 0;
    }
    await this.validateNthChild(locator);
    return (await this.page.$(locator)) !== null;
  }

  static async getValue(locator: string): Promise<string | null> {
    try {
      return await this.page.$eval(locator, element =>
        element.getAttribute('value')
      );
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async getClass(locator: string): Promise<string | null> {
    try {
      return await this.page.$eval(locator, element =>
        element.getAttribute('class')
      );
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async sleep(milliseconds: number): Promise<void> {
    await new Promise(_func => setTimeout(_func, milliseconds));
  }

  private static async validateNthChild(
    locator: string
  ): Promise<ElementHandle<Element>[]> {
    try {
      const locators = await this.page.$$(locator);
      if (locators.length > 1) {
        throw new AutomationSyError(
          'Locator has more than 1 child, total: ' + locators.length
        );
      }
      return locators;
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }
}
