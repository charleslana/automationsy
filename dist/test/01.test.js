"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    const url = 'https://letcode.in/edit';
    AutomationSy_1.default.setWindowSize(1024, 768);
    AutomationSy_1.default.setHeadless(false);
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate(url);
    await AutomationSy_1.default.type("//input[@class='input is-focused']", 'Hello world');
    await AutomationSy_1.default.focus('#join');
    await AutomationSy_1.default.keyboard('Tab');
    const isDisabled = await AutomationSy_1.default.isDisabled("(//label[text()='Confirm edit field is disabled']/following::input)[1]");
    console.log('isDisabled:', isDisabled);
    await AutomationSy_1.default.clear('#clearMe');
    await AutomationSy_1.default.fill('#clearMe', 'Fill');
    console.log('text:', await AutomationSy_1.default.getText('.card-footer-item'));
    console.log('href:', await AutomationSy_1.default.getByAttribute('text=Watch tutorial', 'href'));
    console.log('all inputs:', await AutomationSy_1.default.getAllByAttribute("//input[@class='input']", 'id'));
    await AutomationSy_1.default.sleep(1000);
    await AutomationSy_1.default.dispose();
})();
