"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutomationSy_1 = __importDefault(require("../src/AutomationSy"));
(async () => {
    await AutomationSy_1.default.init();
    await AutomationSy_1.default.navigate('https://letcode.in/dropable');
    await AutomationSy_1.default.pdf();
    await AutomationSy_1.default.screenshot();
    await AutomationSy_1.default.dragAndDropByTarget('#draggable', '#droppable');
    await AutomationSy_1.default.scroll(350);
    await AutomationSy_1.default.screenshot();
    await AutomationSy_1.default.sleep(1000);
    await AutomationSy_1.default.scroll((await AutomationSy_1.default.getPositionY('text=TODO')));
    await AutomationSy_1.default.removeHTML('nav');
    await AutomationSy_1.default.screenshot();
    await AutomationSy_1.default.pdf();
    await AutomationSy_1.default.dispose();
})();
