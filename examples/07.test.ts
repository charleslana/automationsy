import { Action } from '../src/';

(async () => {
  await Action.setHTML(
    '<h1>Hello world</h1><br><button onclick=window.close();>Close browser</button>'
  );
  await Action.sleep(2000);
  await Action.click('button');
  await Action.closeBrowser();
})();
