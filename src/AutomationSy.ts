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

  /**
   * Wait action for next action
   * @param milliseconds - set time in milliseconds
   */
  static async sleep(milliseconds: number): Promise<void> {
    await new Promise(_func => setTimeout(_func, milliseconds));
  }

  /**
   * Navigate to a page
   * @param url - set url link, e.g. `https://`.
   */
  static async navigate(url: string): Promise<void> {
    if (!this.isValidURL(url)) {
      throw new AutomationSyError('URL invalid');
    }
    try {
      await this.page.goto(url, { waitUntil: this.getWaitUntil() });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Type in fields
   * @param locator - set page locator
   * @param text - set text to type
   */
  static async type(locator: string, text: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].type(text);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Keep focus on page element
   * @param locator - set page locator
   */
  static async focus(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].focus();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Press a key on the keyboard
   * @param key - set keyboard keys only
   * @example
   * ```ts
   *  await AutomationSy.keyboard('Enter');
   * ```
   */
  static async keyboard(key: KeyInput): Promise<void> {
    try {
      await this.page.keyboard.press(key);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Clear the field
   * @param locator - set page locator
   */
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

  /**
   * Click on page element
   * @param locator - set page locator
   */
  static async click(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).click();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Go back one page
   */
  static async goBack(): Promise<void> {
    try {
      await this.page.goBack();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Go to a next page
   */
  static async goForward(): Promise<void> {
    try {
      await this.page.goForward();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Click on page element position
   * @param x - x position of element
   * @param y - y position of element
   */
  static async clickPosition(x: number, y: number): Promise<void> {
    try {
      await this.page.mouse.click(x, y, { button: 'left' });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Double click on page element
   * @param locator - set page locator
   */
  static async doubleClick(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).click({ clickCount: 2 });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Difference between typing, and filling information directly into the field value
   * @param locator - set page locator
   * @param text - set text to type
   */
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

  /**
   * Long click on page element
   * @param locator - set page locator
   * @param milliseconds - set time in milliseconds
   */
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

  /**
   * Select a dropdown by option value on page element
   * @param locator - set page locator
   * @param options - set a list of values, you can send only one or many of the select options
   * @example
   * * one
   * ```ts
   * await AutomationSy.selectByValue('locator', 'only');
   * ```
   * * many
   * ```ts
   * await AutomationSy.selectByValue('locator', 'first', 'second');
   * ```
   */
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

  /**
   * Select a dropdown by option index on page element
   * @param locator - set page locator
   * @param index - set select option index
   * @example
   * ```ts
   * await AutomationSy.selectByIndex('locator', 0);
   * ```
   */
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

  /**
   * Wait for a locator to appear on the page
   * @param locator - set page locator
   */
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

  /**
   * Switch tabs in browser
   * @param index - set browser tab index
   */
  static async switchPage(index: number): Promise<void> {
    await this.sleep(500);
    const allPages = await this.browser.pages();
    if (typeof allPages[index] === 'undefined') {
      throw new AutomationSyError('Index not exist in page tab');
    }
    await allPages[index].bringToFront();
    this.page = allPages[index];
  }

  /**
   * Exit browser tab
   * @param index - set browser tab index
   */
  static async quitPage(index: number): Promise<void> {
    const allPages = await this.browser.pages();
    if (typeof allPages[index] === 'undefined') {
      throw new AutomationSyError('Index not exist in page tab');
    }
    await allPages[index].close();
  }

  /**
   * Wait for the page locator to disappear
   * @param locator - set page locator
   */
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

  /**
   * Drag and drop an element to a position
   * @param locator - set page locator
   * @param positionX - x position of element
   * @param positionY - y position of element
   */
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

  /**
   * Drag and drop an element to a target
   * @param locator - set page locator
   * @param targetLocator - set page locator target
   */
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

  /**
   * Move the page scroll
   * @param distance - set distance in pixels
   */
  static async scroll(distance: number): Promise<void> {
    await this.page.evaluate(
      distance => window.scrollBy(0, distance),
      distance
    );
  }

  /**
   * Write HTML on the page
   * @param html - set HTML elements
   */
  static async setHTML(html: string): Promise<void> {
    await this.page.setContent(html);
  }

  /**
   * Remove HTML from page
   * @param locator - set page locator
   */
  static async removeHTML(locator: string): Promise<void> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      await elements[0].evaluate(element => (element as Element).remove());
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Screenshot of the test run
   * - The images folder is screenshots in the root of the test run
   */
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

  /**
   * Capture all test page context in PDF
   * - The capture results folder is pdf in the root of the test run
   */
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

  /**
   * Move page scroll vertically automatically, set distance and delay time for each distance
   * @param distance - set distance in pixels
   * @param delay - set time delay in milliseconds
   * @example
   * ```ts
   * await AutomationSy.autoScroll(100, 0);
   * ```
   */
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

  /**
   * Get field enabled or disabled value
   * @param locator - set page locator
   * @returns value true or false
   */
  static async isDisabled(locator: string): Promise<boolean> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0] !== null;
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Get field checked or unchecked value
   * @param locator - set page locator
   * @returns value true or false
   */
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

  /**
   * Get page title
   * @returns string
   */
  static async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get page url
   * @returns string
   */
  static getUrl(): string {
    return this.page.url();
  }

  /**
   * Get page element attributes
   * @param locator - set page locator
   * @param attribute - set element attribute
   * @returns string or null
   */
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

  /**
   * Get all page element attributes
   * @param locator - set page locator
   * @param attribute - set element attribute
   * @returns list of string
   */
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

  /**
   * Get text inside page element
   * @param locator - set page locator
   * @returns string or null
   */
  static async getText(locator: string): Promise<string | null> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return await elements[0].evaluate(element => element.textContent);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Get x position of page element
   * @param locator - set page locator
   * @returns number or undefined
   */
  static async getPositionX(locator: string): Promise<number | undefined> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0].boundingBox().then(element => element?.x);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Get y position of page element
   * @param locator - set page locator
   * @returns number or undefined
   */
  static async getPositionY(locator: string): Promise<number | undefined> {
    try {
      const elements = await this.getElementHandles(locator);
      await this.validateNthChild(elements);
      return elements[0].boundingBox().then(element => element?.y);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Get width of page element
   * @param locator - set page locator
   * @returns number or undefined
   */
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
   * Get height of page element
   * @param locator - set page locator
   * @returns number or undefined
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

  /**
   * Handle locator type on page when it is xpath or not
   * @param locator - set page locator
   * @returns list of handles elements
   */
  private static async getElementHandles(
    locator: string
  ): Promise<ElementHandle<Node>[]> {
    if (locator.startsWith('/') || locator.includes('//')) {
      return await this.page.$x(locator);
    }
    return this.page.$$(locator);
  }

  /**
   * Validates that the element exists on the page and contains more than one child
   * @param locators - set page locators
   */
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

  /**
   * Validates if the URL is valid
   * @param url - set url
   */
  private static isValidURL(url: string): boolean {
    return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(url);
  }
}
