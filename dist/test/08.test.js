"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate('https://letcode.in/draggable');
    await AutomationSy_1.default.dragAndDropByPosition('#header', 100, 20);
})();
