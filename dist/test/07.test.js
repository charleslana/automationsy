"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.setHTML('<h1>Hello world</h1><br><button onclick=window.close();>Close browser</button>');
    await AutomationSy_1.default.sleep(2000);
    await AutomationSy_1.default.click('button');
})();
