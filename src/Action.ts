import AutomationSyError from './AutomationSyError';
import Core from './Core';
import fs from 'fs';
import IError from './IError';
import path from 'path';
import Singleton from './Singleton';
import { BoundingBox, ElementHandle, KeyInput } from 'puppeteer';
import { Config } from './Config';
import { getElementHandles, isValidURL, validateNthChild } from './util';

export class Action extends Config {
  /**
   * Close browser and all recurring actions
   */
  static async dispose(): Promise<void> {
    await Singleton.getBrowser().close();
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
    await Core.init();
    if (!isValidURL(url)) {
      throw new AutomationSyError('URL invalid');
    }
    try {
      await Singleton.getPage().goto(url, { waitUntil: this.getWaitUntil() });
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      await Singleton.getPage().keyboard.press(key);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Clear the field
   * @param locator - set page locator
   */
  static async clear(locator: string): Promise<void> {
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).click();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Go back one page
   */
  static async goBack(): Promise<void> {
    await Core.init();
    try {
      await Singleton.getPage().goBack();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Go to a next page
   */
  static async goForward(): Promise<void> {
    await Core.init();
    try {
      await Singleton.getPage().goForward();
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
    await Core.init();
    try {
      await Singleton.getPage().mouse.click(x, y, { button: 'left' });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Double click on page element
   * @param locator - set page locator
   */
  static async doubleClick(locator: string): Promise<void> {
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      if (locator.startsWith('/') || locator.includes('//')) {
        await Singleton.getPage().waitForXPath(locator);
        return;
      }
      await Singleton.getPage().waitForSelector(locator);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Switch tabs in browser
   * @param index - set browser tab index
   */
  static async switchPage(index: number): Promise<void> {
    await Core.init();
    await this.sleep(500);
    const allPages = await Singleton.getBrowser().pages();
    if (typeof allPages[index] === 'undefined') {
      throw new AutomationSyError('Index not exist in page tab');
    }
    await allPages[index].bringToFront();
    Singleton.setPage(allPages[index]);
  }

  /**
   * Exit browser tab
   * @param index - set browser tab index
   */
  static async quitPage(index: number): Promise<void> {
    await Core.init();
    const allPages = await Singleton.getBrowser().pages();
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
    await Core.init();
    try {
      if (locator.startsWith('/') || locator.includes('//')) {
        await Singleton.getPage().waitForXPath(locator, { hidden: true });
        return;
      }
      await Singleton.getPage().waitForSelector(locator, { hidden: true });
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
      await Core.init();
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      const boundingBox = (await elements[0].boundingBox()) as BoundingBox;
      const bX = boundingBox.x + boundingBox.width / 2;
      const bY = boundingBox.y + boundingBox.height / 2;
      await Singleton.getPage().mouse.move(bX, bY);
      await Singleton.getPage().mouse.down();
      await Singleton.getPage().mouse.move(bX + positionX, bY + positionY, {
        steps: 2,
      });
      await Singleton.getPage().mouse.up();
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
      await Core.init();
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      const targetElements = await getElementHandles(targetLocator);
      await validateNthChild(targetElements);
      const boundingBox = (await elements[0].boundingBox()) as BoundingBox;
      const bX = boundingBox.x + boundingBox.width / 2;
      const bY = boundingBox.y + boundingBox.height / 2;
      const targetBoundingBox =
        (await targetElements[0].boundingBox()) as BoundingBox;
      const tBX = targetBoundingBox.x + targetBoundingBox.width / 2;
      const tBY = targetBoundingBox.y + targetBoundingBox.height / 2;
      await Singleton.getPage().mouse.move(bX, bY);
      await Singleton.getPage().mouse.down();
      await Singleton.getPage().mouse.move(tBX, tBY);
      await Singleton.getPage().mouse.up();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Move the page scroll
   * @param distance - set distance in pixels
   */
  static async scroll(distance: number): Promise<void> {
    await Core.init();
    await Singleton.getPage().evaluate(
      distance => window.scrollBy(0, distance),
      distance
    );
  }

  /**
   * Write HTML on the page
   * @param html - set HTML elements
   */
  static async setHTML(html: string): Promise<void> {
    await Core.init();
    await Singleton.getPage().setContent(html);
  }

  /**
   * Remove HTML from page
   * @param locator - set page locator
   */
  static async removeHTML(locator: string): Promise<void> {
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
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
      await Singleton.getPage().screenshot({ path: file });
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Capture all test page context in PDF
   * - The capture results folder is pdf in the root of the test run
   */
  static async pdf(): Promise<void> {
    await Core.init();
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
      await Singleton.getPage().pdf({ path: file, format: 'A4' });
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
    await Core.init();
    while (
      await Singleton.getPage().evaluate(
        () =>
          (document.scrollingElement as Element).scrollTop +
            window.innerHeight <
          (document.scrollingElement as Element).scrollHeight
      )
    ) {
      await Singleton.getPage().evaluate(y => {
        (document.scrollingElement as Element).scrollBy(0, y);
      }, distance);
      await this.sleep(delay);
    }
  }

  /**
   * Hover over the element
   * @param locator - set page locator
   */
  static async hover(locator: string): Promise<void> {
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      await (elements[0] as ElementHandle<Element>).hover();
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }
}
