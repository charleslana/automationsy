import puppeteer from 'puppeteer';
import Singleton from './Singleton';
import { Config } from './Config';

export default abstract class Core extends Config {
  private static isInit = false;

  /**
   * @internal
   */
  public static async init(): Promise<void> {
    if (!this.isInit) {
      const args = ['--no-sandbox', '--incognito'];
      if (this.getMaximized()) {
        args.push('--start-maximized');
      }
      if (!this.getMaximized()) {
        args.push(
          `--window-size=${this.getWindowSize().w},${this.getWindowSize().h}`
        );
      }
      const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: this.getHeadless(),
        args: args,
        ignoreDefaultArgs: ['--disable-extensions'],
      });
      const page = await browser.newPage();
      page.setDefaultTimeout(this.getDefaultTimeout());
      page.setDefaultNavigationTimeout(this.getDefaultNavigationTimeout());
      await (await browser.pages())[0].close();
      Singleton.setBrowser(browser);
      Singleton.setPage(page);
      this.isInit = true;
    }
  }

  /**
   * @internal
   */
  public static setIsInit(isInit: boolean) {
    this.isInit = isInit;
  }
}
