"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    const url = 'https://letcode.in/buttons';
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate(url);
    await AutomationSy_1.default.click('#home');
    await AutomationSy_1.default.goBack();
    const x = await AutomationSy_1.default.getPositionX('button.button.is-link.is-outlined');
    console.log('x:', x);
    const y = await AutomationSy_1.default.getPositionY("//button[text()='Find Location']");
    console.log('y:', y);
    const w = await AutomationSy_1.default.getWidth('#position');
    console.log('w:', w);
    const h = await AutomationSy_1.default.getHeight('#position');
    console.log('h:', h);
    await AutomationSy_1.default.clickPosition((await AutomationSy_1.default.getPositionX('#home')) + 1, (await AutomationSy_1.default.getPositionY('#home')) + 1);
    await AutomationSy_1.default.goBack();
    await AutomationSy_1.default.doubleClick('#position');
    await AutomationSy_1.default.autoScroll(1000, 0);
    await AutomationSy_1.default.longClick("(//button[@id='isDisabled'])[2]", 1000);
    await AutomationSy_1.default.dispose();
})();
