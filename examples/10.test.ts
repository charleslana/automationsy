import { Action, Resource } from '../src/';

(async () => {
  await Action.navigate('https://the-internet.herokuapp.com/hovers');
  console.log(
    'isVisible before:',
    await Resource.isVisible("(//div[@class='figcaption'])[1]")
  );
  await Action.hover("(//img[@alt='User Avatar'])[1]");
  console.log(
    'isVisible after:',
    await Resource.isVisible("(//div[@class='figcaption'])[1]")
  );
  await Action.closeBrowser();
})();
