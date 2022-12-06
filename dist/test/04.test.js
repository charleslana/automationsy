"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    AutomationSy_1.default.setHeadless(true);
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate('https://letcode.in/radio');
    console.log('radio yes', await AutomationSy_1.default.isChecked('#yes'));
    console.log('radio notfoo', await AutomationSy_1.default.isChecked('#notfoo'));
    console.log('checkbox', await AutomationSy_1.default.isChecked("(//input[@type='checkbox'])[1]"));
    await AutomationSy_1.default.dispose();
})();
