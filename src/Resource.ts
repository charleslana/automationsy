import AutomationSyError from './AutomationSyError';
import Core from './Core';
import IError from './IError';
import Singleton from './Singleton';
import { getElementHandles, validateNthChild } from './util';

export class Resource extends Core {
  /**
   * Get field enabled or disabled value
   * @param locator - set page locator
   * @returns value true or false
   */
  static async isDisabled(locator: string): Promise<boolean> {
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      return await elements[0].evaluate(
        (element: HTMLInputElement) => element.checked
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
    await Core.init();
    return await Singleton.getPage().title();
  }

  /**
   * Get page url
   * @returns string
   */
  static async getUrl(): Promise<string> {
    await Core.init();
    return Singleton.getPage().url();
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      return await elements[0].evaluate(
        (element: Element, attribute: string) =>
          element.getAttribute(attribute),
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      const attributes: string[] = [];
      for (const element of elements) {
        const attr = await element.evaluate(
          (el: Element, attribute: string) => el.getAttribute(attribute),
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      return await elements[0].evaluate(element => element?.textContent);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
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
    await Core.init();
    try {
      const elements = await getElementHandles(locator);
      await validateNthChild(elements);
      return elements[0].boundingBox().then(element => element?.height);
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }

  /**
   * Get element is visible or not
   * @param locator - set page locator
   * @returns value true or false
   */
  static async isVisible(locator: string): Promise<boolean> {
    await Core.init();
    try {
      return (await this.getWidth(locator)) != undefined;
    } catch (error) {
      throw new AutomationSyError((error as IError).message);
    }
  }
}
