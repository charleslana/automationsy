import AutomationSyError from './AutomationSyError';
import Singleton from './Singleton';
import { ElementHandle } from 'puppeteer';

/**
 * Handle locator type on page when it is xpath or not
 * @function getElementHandles
 * @param locator - set page locator
 * @returns list of handles elements
 */
export async function getElementHandles(
  locator: string
): Promise<ElementHandle<Node>[]> {
  if (locator.startsWith('/') || locator.includes('//')) {
    return await Singleton.getPage().$x(locator);
  }
  return Singleton.getPage().$$(locator);
}

/**
 * Validates that the element exists on the page and contains more than one child
 * @function validateNthChild
 * @param locators - set page locators
 */
export async function validateNthChild(
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
 * @function isValidURL
 * @param url - set url
 */
export function isValidURL(url: string): boolean {
  return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(url);
}
