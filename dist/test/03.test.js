"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    AutomationSy_1.default.setDefaultTimeout(5000);
    AutomationSy_1.default.setMaximized(true);
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate('https://letcode.in/dropdowns');
    await AutomationSy_1.default.selectByValue('#fruits', '2');
    await AutomationSy_1.default.waitForLocator('.notification2');
    await AutomationSy_1.default.selectByIndex('#lang', 4);
    await AutomationSy_1.default.selectByValue('#superheros', 'aq', 'ta');
    await AutomationSy_1.default.dispose();
})();
