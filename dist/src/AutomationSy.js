"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSyConfig_1 = __importDefault(require("./AutomationSyConfig"));
const AutomationSyError_1 = __importDefault(require("./AutomationSyError"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const puppeteer_1 = __importDefault(require("puppeteer"));
/**
 * Easy automation core to call perform actions from test scope
 * Extends easy automation core settings {@link AutomationSyConfig}
 */
class AutomationSy extends AutomationSyConfig_1.default {
    constructor() {
        super();
    }
    /**
     * Before initializing the test, this method must be executed
     */
    static async init() {
        const args = ['--no-sandbox', '--incognito'];
        if (this.getMaximized()) {
            args.push('--start-maximized');
        }
        if (!this.getMaximized()) {
            args.push(`--window-size=${this.getWindowSize().w},${this.getWindowSize().h}`);
        }
        this.browser = await puppeteer_1.default.launch({
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
    static async dispose() {
        console.log('Closing the browser');
        await this.browser.close();
    }
    /**
     * Wait action for next action
     * @param milliseconds - set time in milliseconds
     */
    static async sleep(milliseconds) {
        await new Promise(_func => setTimeout(_func, milliseconds));
    }
    /**
     * Navigate to a page
     * @param url - set url link, e.g. `https://`.
     */
    static async navigate(url) {
        if (!this.isValidURL(url)) {
            throw new AutomationSyError_1.default('URL invalid');
        }
        try {
            await this.page.goto(url, { waitUntil: this.getWaitUntil() });
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Type in fields
     * @param locator - set page locator
     * @param text - set text to type
     */
    static async type(locator, text) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].type(text);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Keep focus on page element
     * @param locator - set page locator
     */
    static async focus(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].focus();
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
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
    static async keyboard(key) {
        try {
            await this.page.keyboard.press(key);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Clear the field
     * @param locator - set page locator
     */
    static async clear(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].click({ clickCount: 3 });
            await elements[0].press('Backspace');
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Click on page element
     * @param locator - set page locator
     */
    static async click(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].click();
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Go back one page
     */
    static async goBack() {
        try {
            await this.page.goBack();
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Go to a next page
     */
    static async goForward() {
        try {
            await this.page.goForward();
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Click on page element position
     * @param x - x position of element
     * @param y - y position of element
     */
    static async clickPosition(x, y) {
        try {
            await this.page.mouse.click(x, y, { button: 'left' });
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Double click on page element
     * @param locator - set page locator
     */
    static async doubleClick(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].click({ clickCount: 2 });
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Difference between typing, and filling information directly into the field value
     * @param locator - set page locator
     * @param text - set text to type
     */
    static async fill(locator, text) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].evaluate((element, text) => (element.value = text), text);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Long click on page element
     * @param locator - set page locator
     * @param milliseconds - set time in milliseconds
     */
    static async longClick(locator, milliseconds) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].click({
                delay: milliseconds,
            });
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
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
    static async selectByValue(locator, ...options) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].select(...options);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
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
    static async selectByIndex(locator, index) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].evaluate((element, index) => (element.selectedIndex = index), index);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Wait for a locator to appear on the page
     * @param locator - set page locator
     */
    static async waitForLocator(locator) {
        try {
            if (locator.startsWith('/') || locator.includes('//')) {
                await this.page.waitForXPath(locator);
                return;
            }
            await this.page.waitForSelector(locator);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Switch tabs in browser
     * @param index - set browser tab index
     */
    static async switchPage(index) {
        await this.sleep(500);
        const allPages = await this.browser.pages();
        if (typeof allPages[index] === 'undefined') {
            throw new AutomationSyError_1.default('Index not exist in page tab');
        }
        await allPages[index].bringToFront();
        this.page = allPages[index];
    }
    /**
     * Exit browser tab
     * @param index - set browser tab index
     */
    static async quitPage(index) {
        const allPages = await this.browser.pages();
        if (typeof allPages[index] === 'undefined') {
            throw new AutomationSyError_1.default('Index not exist in page tab');
        }
        await allPages[index].close();
    }
    /**
     * Wait for the page locator to disappear
     * @param locator - set page locator
     */
    static async waitForLocatorDisappear(locator) {
        try {
            if (locator.startsWith('/') || locator.includes('//')) {
                await this.page.waitForXPath(locator, { hidden: true });
                return;
            }
            await this.page.waitForSelector(locator, { hidden: true });
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async dragAndDropByPosition(locator, positionX, positionY) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            const boundingBox = (await elements[0].boundingBox());
            const bX = boundingBox.x + boundingBox.width / 2;
            const bY = boundingBox.y + boundingBox.height / 2;
            await this.page.mouse.move(bX, bY);
            await this.page.mouse.down();
            await this.page.mouse.move(bX + positionX, bY + positionY, { steps: 2 });
            await this.page.mouse.up();
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async dragAndDropByTarget(locator, targetLocator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            const targetElements = await this.getElementHandles(targetLocator);
            await this.validateNthChild(targetElements);
            const boundingBox = (await elements[0].boundingBox());
            const bX = boundingBox.x + boundingBox.width / 2;
            const bY = boundingBox.y + boundingBox.height / 2;
            const targetBoundingBox = (await targetElements[0].boundingBox());
            const tBX = targetBoundingBox.x + targetBoundingBox.width / 2;
            const tBY = targetBoundingBox.y + targetBoundingBox.height / 2;
            await this.page.mouse.move(bX, bY);
            await this.page.mouse.down();
            await this.page.mouse.move(tBX, tBY);
            await this.page.mouse.up();
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async scroll(distance) {
        await this.page.evaluate(distance => window.scrollBy(0, distance), distance);
    }
    static async setHTML(html) {
        await this.page.setContent(html);
    }
    static async removeHTML(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            await elements[0].evaluate(element => element.remove());
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async screenshot() {
        try {
            const dir = path_1.default.join(process_1.default.cwd(), 'screenshots');
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir);
            }
            const date = new Date();
            const screenshotDir = `${date
                .toLocaleString()
                .replace(/\//g, '-')}:${date.getMilliseconds()}.png`;
            const file = path_1.default.join(dir, screenshotDir);
            await this.page.screenshot({ path: file });
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async pdf() {
        try {
            const dir = path_1.default.join(process_1.default.cwd(), 'pdf');
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir);
            }
            const date = new Date();
            const screenshotDir = `${date
                .toLocaleString()
                .replace(/\//g, '-')}:${date.getMilliseconds()}.pdf`;
            const file = path_1.default.join(dir, screenshotDir);
            await this.page.pdf({ path: file, format: 'A4' });
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async autoScroll(distance = 100, delay = 100) {
        while (await this.page.evaluate(() => document.scrollingElement.scrollTop +
            window.innerHeight <
            document.scrollingElement.scrollHeight)) {
            await this.page.evaluate(y => {
                document.scrollingElement.scrollBy(0, y);
            }, distance);
            await this.sleep(delay);
        }
    }
    static async isDisabled(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return elements[0] !== null;
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async isChecked(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return await elements[0].evaluate(element => element.checked);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async getTitle() {
        return await this.page.title();
    }
    static getUrl() {
        return this.page.url();
    }
    static async getByAttribute(locator, attribute) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return await elements[0].evaluate((element, attribute) => element.getAttribute(attribute), attribute);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async getAllByAttribute(locator, attribute) {
        try {
            const elements = await this.getElementHandles(locator);
            const attributes = [];
            for (const element of elements) {
                const attr = await element.evaluate((el, attribute) => el.getAttribute(attribute), attribute);
                attributes.push(attr);
            }
            return attributes;
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async getText(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return await elements[0].evaluate(element => element.textContent);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async getPositionX(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return elements[0].boundingBox().then(element => element === null || element === void 0 ? void 0 : element.x);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async getPositionY(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return elements[0].boundingBox().then(element => element === null || element === void 0 ? void 0 : element.y);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async getWidth(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return elements[0].boundingBox().then(element => element === null || element === void 0 ? void 0 : element.width);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    /**
     * Get height of locator
     * @param locator - A locator to query page for
     * @returns The height of the element in pixels.
     */
    static async getHeight(locator) {
        try {
            const elements = await this.getElementHandles(locator);
            await this.validateNthChild(elements);
            return elements[0].boundingBox().then(element => element === null || element === void 0 ? void 0 : element.height);
        }
        catch (error) {
            throw new AutomationSyError_1.default(error.message);
        }
    }
    static async getElementHandles(locator) {
        if (locator.startsWith('/') || locator.includes('//')) {
            return await this.page.$x(locator);
        }
        return this.page.$$(locator);
    }
    static async validateNthChild(locators) {
        if (locators.length === 0) {
            throw new AutomationSyError_1.default('No locator found');
        }
        if (locators.length > 1) {
            throw new AutomationSyError_1.default('Locator has more than 1 child, total: ' + locators.length);
        }
    }
    static isValidURL(url) {
        return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(url);
    }
}
exports.default = AutomationSy;
