import AutomationSyConfig from './AutomationSyConfig';
import AutomationSyError from './AutomationSyError';
import IError from './IError';
import puppeteer, { Browser, ElementHandle, KeyInput, Page } from 'puppeteer';

export default class AutomationSy extends AutomationSyConfig {
  private constructor() {
    super();
  }

  private static page: Page;
  private static browser: Browser;

  static async init(): Promise<void> {
    const args = ['--no-sandbox', '--incognito'];
    if (this.getMaximized()) {
      args.push('--start-maximized');
    }
    if (!this.getMaximized()) {
      args.push(
        `--window-size=${this.getWindowSize().w},${this.getWindowSize().h}`
      );
    }
    this.browser = await puppeteer.launch({
      defaultViewport: null,
      headless: this.getHeadless(),
      args: args,
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(0);
    await (await this.browser.pages())[0].close();
    console.log('Launching the browser');
  }

  static async dispose(): Promise<void> {
    await this.browser.close();
  }

  static async sleep(milliseconds: number): Promise<void> {
    await new Promise(_func => setTimeout(_func, milliseconds));
  }

  static async navigate(url: string): Promise<void> {
    try {
      await this.page.goto(url);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async type(locator: string, text: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].type(text);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async focus(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].focus();
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
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).click({ clickCount: 3 });
      await (elements[0] as ElementHandle<Element>).press('Backspace');
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async click(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).click();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async goBack(): Promise<void> {
    try {
      await this.page.goBack();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async goForward(): Promise<void> {
    try {
      await this.page.goForward();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async isDisabled(locator: string): Promise<boolean> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0] !== null;
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
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

  static async getPositionX(locator: string): Promise<number | undefined> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0].boundingBox().then(element => element?.x);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async getPositionY(locator: string): Promise<number | undefined> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0].boundingBox().then(element => element?.y);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  private static async getElementHandles(
    locator: string
  ): Promise<ElementHandle<Node>[]> {
    if (locator.startsWith('/') || locator.includes('//')) {
      return await this.page.$x(locator);
    }
    return this.page.$$(locator);
  }

  private static async validateNthChild(
    locators: ElementHandle<Node>[]
  ): Promise<void> {
    try {
      if (locators.length === 0) {
        throw new AutomationSyError('No locator found');
      }
      if (locators.length > 1) {
        throw new AutomationSyError(
          'Locator has more than 1 child, total: ' + locators.length
        );
      }
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }
}
