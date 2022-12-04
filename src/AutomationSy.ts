import AutomationSyConfig from './AutomationSyConfig';
import AutomationSyError from './AutomationSyError';
import fs from 'fs';
import IError from './IError';
import path from 'path';
import process from 'process';
import puppeteer, {
  BoundingBox,
  Browser,
  ElementHandle,
  KeyInput,
  Page,
} from 'puppeteer';

/**
 * Easy automation core to call perform actions from test scope
 * Extends easy automation core settings {@link AutomationSyConfig}
 */
export default class AutomationSy extends AutomationSyConfig {
  private constructor() {
    super();
  }

  private static page: Page;
  private static browser: Browser;

  /**
   * Before initializing the test, this method must be executed
   */
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
    this.page.setDefaultTimeout(this.getDefaultTimeout());
    this.page.setDefaultNavigationTimeout(this.getDefaultNavigationTimeout());
    await (await this.browser.pages())[0].close();
    console.log('Launching the browser');
  }

  /**
   * Close browser and all recurring actions
   */
  static async dispose(): Promise<void> {
    console.log('Closing the browser');
    await this.browser.close();
  }

  static async sleep(milliseconds: number): Promise<void> {
    await new Promise(_func => setTimeout(_func, milliseconds));
  }

  static async navigate(url: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: this.getWaitUntil() });
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

  static async clickPosition(x: number, y: number): Promise<void> {
    try {
      await this.page.mouse.click(x, y, { button: 'left' });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async doubleClick(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).click({ clickCount: 2 });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async fill(locator: string, text: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].evaluate(
        (element, text) => ((element as HTMLInputElement).value = text),
        text
      );
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async longClick(locator: string, milliseconds: number): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).click({
        delay: milliseconds,
      });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async selectByValue(
    locator: string,
    ...options: string[]
  ): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].select(...options);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async selectByIndex(locator: string, index: number): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].evaluate(
        (element, index) =>
          ((element as HTMLSelectElement).selectedIndex = index),
        index
      );
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async waitForLocator(locator: string): Promise<void> {
    try {
      if (locator.startsWith('/') || locator.includes('//')) {
        await this.page.waitForXPath(locator);
        return;
      }
      await this.page.waitForSelector(locator);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async switchPage(index: number): Promise<void> {
    await this.sleep(500);
    const allPages = await this.browser.pages();
    if (typeof allPages[index] === 'undefined') {
      throw new AutomationSyError('Index not exist in page tab');
    }
    await allPages[index].bringToFront();
    this.page = allPages[index];
  }

  static async quitPage(index: number): Promise<void> {
    const allPages = await this.browser.pages();
    if (typeof allPages[index] === 'undefined') {
      throw new AutomationSyError('Index not exist in page tab');
    }
    await allPages[index].close();
  }

  static async waitForLocatorDisappear(locator: string): Promise<void> {
    try {
      if (locator.startsWith('/') || locator.includes('//')) {
        await this.page.waitForXPath(locator, { hidden: true });
        return;
      }
      await this.page.waitForSelector(locator, { hidden: true });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async dragAndDropByPosition(
    locator: string,
    positionX: number,
    positionY: number
  ): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      const boundingBox = (await elements[0].boundingBox()) as BoundingBox;
      const bX = boundingBox.x + boundingBox.width / 2;
      const bY = boundingBox.y + boundingBox.height / 2;
      await this.page.mouse.move(bX, bY);
      await this.page.mouse.down();
      await this.page.mouse.move(bX + positionX, bY + positionY, { steps: 2 });
      await this.page.mouse.up();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async dragAndDropByTarget(
    locator: string,
    targetLocator: string
  ): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      const targetElements = await this.getElementHandles(targetLocator);
      await this.validateNthChild(targetElements);
      const boundingBox = (await elements[0].boundingBox()) as BoundingBox;
      const bX = boundingBox.x + boundingBox.width / 2;
      const bY = boundingBox.y + boundingBox.height / 2;
      const targetBoundingBox =
        (await targetElements[0].boundingBox()) as BoundingBox;
      const tBX = targetBoundingBox.x + targetBoundingBox.width / 2;
      const tBY = targetBoundingBox.y + targetBoundingBox.height / 2;
      await this.page.mouse.move(bX, bY);
      await this.page.mouse.down();
      await this.page.mouse.move(tBX, tBY);
      await this.page.mouse.up();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async scroll(distance: number): Promise<void> {
    await this.page.evaluate(
      distance => window.scrollBy(0, distance),
      distance
    );
  }

  static async setHTML(html: string): Promise<void> {
    await this.page.setContent(html);
  }

  static async removeHTML(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].evaluate(element => (element as Element).remove());
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async screenshot(): Promise<void> {
    try {
      const dir = path.join(process.cwd(), 'screenshots');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const date = new Date();
      const screenshotDir = `${date
        .toLocaleString()
        .replace(/\//g, '-')}:${date.getMilliseconds()}.png`;
      const file = path.join(dir, screenshotDir);
      await this.page.screenshot({ path: file });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async pdf(): Promise<void> {
    try {
      const dir = path.join(process.cwd(), 'pdf');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const date = new Date();
      const screenshotDir = `${date
        .toLocaleString()
        .replace(/\//g, '-')}:${date.getMilliseconds()}.pdf`;
      const file = path.join(dir, screenshotDir);
      await this.page.pdf({ path: file, format: 'A4' });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async autoScroll(distance = 100, delay = 100): Promise<void> {
    while (
      await this.page.evaluate(
        () =>
          (document.scrollingElement as Element).scrollTop +
            window.innerHeight <
          (document.scrollingElement as Element).scrollHeight
      )
    ) {
      await this.page.evaluate(y => {
        (document.scrollingElement as Element).scrollBy(0, y);
      }, distance);
      await this.sleep(delay);
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

  static async isChecked(locator: string): Promise<boolean> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return await elements[0].evaluate(
        element => (element as HTMLInputElement).checked
      );
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async getTitle(): Promise<string> {
    return await this.page.title();
  }

  static getUrl(): string {
    return this.page.url();
  }

  static async getByAttribute(
    locator: string,
    attribute: string
  ): Promise<string | null> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return await elements[0].evaluate(
        (element, attribute) => (element as Element).getAttribute(attribute),
        attribute
      );
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async getAllByAttribute(
    locator: string,
    attribute: string
  ): Promise<string[]> {
    try {
      const elements = await this.getElementHandles(locator);
      const attributes: string[] = [];
      for (const element of elements) {
        const attr = await element.evaluate(
          (el, attribute) => (el as Element).getAttribute(attribute),
          attribute
        );
        attributes.push(attr as string);
      }
      return attributes;
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  static async getText(locator: string): Promise<string | null> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return await elements[0].evaluate(element => element.textContent);
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

  static async getWidth(locator: string): Promise<number | undefined> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0].boundingBox().then(element => element?.width);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Get height of locator
   * @param locator - A locator to query page for
   * @returns The height of the element in pixels.
   */
  static async getHeight(locator: string): Promise<number | undefined> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0].boundingBox().then(element => element?.height);
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
    if (locators.length === 0) {
      throw new AutomationSyError('No locator found');
    }
    if (locators.length > 1) {
      throw new AutomationSyError(
        'Locator has more than 1 child, total: ' + locators.length
      );
    }
  }
}
