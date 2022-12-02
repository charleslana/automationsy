export default abstract class AutomationSyConfig {
  private static headless = false;
  private static maximized = false;
  private static width = 800;
  private static height = 600;
  private static defaultTimeout = 0;

  static setHeadless(headless: boolean): void {
    this.headless = headless;
  }

  static setMaximized(maximized: boolean): void {
    this.maximized = maximized;
  }

  static setWindowSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  static setDefaultTimeout(milliseconds: number): void {
    this.defaultTimeout = milliseconds;
  }

  static getHeadless(): boolean {
    return this.headless;
  }

  static getMaximized(): boolean {
    return this.maximized;
  }

  static getWindowSize(): {
    w: number;
    h: number;
  } {
    const w = this.width;
    const h = this.height;
    return { w, h };
  }

  static getDefaultTimeout(): number {
    return this.defaultTimeout;
  }
}
