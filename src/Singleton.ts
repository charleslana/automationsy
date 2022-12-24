import { Browser, Page } from 'puppeteer';

export default abstract class Singleton {
  private static page: Page;
  private static browser: Browser;

  /**
   * @internal
   */
  public static getPage(): Page {
    if (!Singleton.page) {
      Singleton.page = new Page();
    }
    return Singleton.page;
  }

  /**
   * @internal
   */
  public static setPage(page: Page): void {
    this.page = page;
  }

  /**
   * @internal
   */
  public static getBrowser(): Browser {
    if (!Singleton.browser) {
      Singleton.browser = new Browser();
    }
    return Singleton.browser;
  }

  /**
   * @internal
   */
  public static setBrowser(browser: Browser): void {
    this.browser = browser;
  }
}
