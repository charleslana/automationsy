"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Test customization settings
 */
class AutomationSyConfig {
    /**
     * Set headless mode
     * @param headless - by default it is false, when set to true the browser will not appear, it will run in headless mode
     */
    static setHeadless(headless) {
        this.headless = headless;
    }
    /**
     * Set browser with screen maximized
     * @param maximized - by default it is false, when set to true the browser will open in screen maximized
     */
    static setMaximized(maximized) {
        this.maximized = maximized;
    }
    /**
     * Set browser screen size
     * @param width - set browser width in pixel
     * @param height - set browser height in pixel
     * @example
     * - Screen of an iPhone 4
     * ```ts
     * AutomationSy.setWindowSize(320, 480);
     * ```
     * - Screen LED monitor 27
     * ```ts
     * AutomationSy.setWindowSize(1920, 1080);
     * ```
     */
    static setWindowSize(width, height) {
        this.width = width;
        this.height = height;
    }
    /**
     * Set the maximum time for the actions to occur,
     * if the action time does not occur it will generate a timed-out error exception
     * @param milliseconds - set time in milliseconds
     */
    static setDefaultTimeout(milliseconds) {
        this.defaultTimeout = milliseconds;
    }
    /**
     * Set how long the browser continues next actions
     * @param option - by default it is load, use the following options:
     * load, domcontentloaded, networkidle0 and networkidle2
     * * load - considers navigation closed when everything is loaded
     * * domcontentloaded - considers the navigation closed
     * when only the page elements have loaded
     * * networkidle0 - considers browsing terminated when
     * there are no more than 0 network connections for at least 500ms
     * * networkidle2 - considers browsing terminated when
     * there are no more than 2 network connections for at least 500ms
     */
    static setWaitUntil(option) {
        this.waitUntil = option;
    }
    /**
     * Set the maximum navigation time,
     * if the navigation time does not occur it will generate a timed-out error exception
     * @param milliseconds - set time in milliseconds
     */
    static setDefaultNavigationTimeout(milliseconds) {
        this.defaultNavigationTimeout = milliseconds;
    }
    /**
     * Get headless mode
     * @returns the boolean value of headless mode
     */
    static getHeadless() {
        return this.headless;
    }
    /**
     * Get maximized value
     * @returns the maximized value of window
     */
    static getMaximized() {
        return this.maximized;
    }
    /**
     * Get width and height of window
     * @returns the height and width of the window
     */
    static getWindowSize() {
        const w = this.width;
        const h = this.height;
        return { w, h };
    }
    /**
     * Get default timeout
     * @returns the default timeout for each action
     */
    static getDefaultTimeout() {
        return this.defaultTimeout;
    }
    /**
     * Get option wait until
     * @returns option wait until
     */
    static getWaitUntil() {
        return this.waitUntil;
    }
    /**
     * Get navigation default timeout
     * @returns navigation default timeout
     */
    static getDefaultNavigationTimeout() {
        return this.defaultNavigationTimeout;
    }
}
exports.default = AutomationSyConfig;
AutomationSyConfig.headless = false;
AutomationSyConfig.maximized = false;
AutomationSyConfig.width = 800;
AutomationSyConfig.height = 600;
AutomationSyConfig.defaultTimeout = 0;
AutomationSyConfig.waitUntil = 'load';
AutomationSyConfig.defaultNavigationTimeout = 0;
