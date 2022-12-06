"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    AutomationSy_1.default.setDefaultTimeout(5000);
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate('https://letcode.in/elements');
    await AutomationSy_1.default.type('input[name="username"]', 'charleslana');
    await AutomationSy_1.default.click('#search');
    await AutomationSy_1.default.waitForLocator("//span[text()='Public Repos']");
    await AutomationSy_1.default.clear('input[name="username"]');
    await AutomationSy_1.default.click('#search');
    await AutomationSy_1.default.waitForLocatorDisappear("//span[text()='Public Repos']");
    await AutomationSy_1.default.waitForLocatorDisappear('figure');
    await AutomationSy_1.default.dispose();
})();
