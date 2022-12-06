"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    AutomationSy_1.default.setWaitUntil('domcontentloaded');
    AutomationSy_1.default.setDefaultNavigationTimeout(5000);
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate('https://letcode.in/windows');
    await AutomationSy_1.default.click('#home');
    await AutomationSy_1.default.switchPage(1);
    console.log('second url:', AutomationSy_1.default.getUrl());
    console.log('second title:', await AutomationSy_1.default.getTitle());
    await AutomationSy_1.default.click("(//a[@class='card-footer-item'])[2]");
    await AutomationSy_1.default.switchPage(0);
    console.log('first url:', AutomationSy_1.default.getUrl());
    console.log('first title:', await AutomationSy_1.default.getTitle());
    await AutomationSy_1.default.click('.card-footer-item');
    console.log('url:', AutomationSy_1.default.getUrl());
    console.log('title:', await AutomationSy_1.default.getTitle());
    await AutomationSy_1.default.quitPage(1);
    await AutomationSy_1.default.dispose();
})();
