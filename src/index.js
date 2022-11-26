import AutomationSy from './automationsy.js';

let url;

// First test
// url = 'https://letcode.in/test';
// await AutomationSy.init();
// await AutomationSy.navigate(url);
// await AutomationSy.dispose();

// Second test
url = 'https://letcode.in/edit';
// AutomationSy.maximized = true;
// AutomationSy.width = 1366;
// AutomationSy.height = 768;
await AutomationSy.init();
await AutomationSy.navigate(url);
await AutomationSy.type("//input[@class='input is-focused']", 'Hello world');
await AutomationSy.focus('#join');
await AutomationSy.keyboard('Tab');
const getValue = await AutomationSy.getValue('#getMe');
console.log('getValue:', getValue);
const getClass = await AutomationSy.getClass('#getMe');
console.log('getClass:', getClass);
const isDisabled = await AutomationSy.isDisabled(
  "(//label[text()='Confirm edit field is disabled']/following::input)[1]"
);
console.log('isDisabled:', isDisabled);
await AutomationSy.clear('#clearMe');
await AutomationSy.sleep(1000);
await AutomationSy.dispose();
