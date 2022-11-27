import AutomationSy from '../src/AutomationSy';

(async () => {
  const url = 'https://letcode.in/buttons';
  await AutomationSy.init();
  await AutomationSy.navigate(url);
  await AutomationSy.click('#home');
  await AutomationSy.goBack();
  const x = await AutomationSy.getPositionX(
    'button.button.is-link.is-outlined'
  );
  console.log('x:', x);
  const y = await AutomationSy.getPositionY("//button[text()='Find Location']");
  console.log('y:', y);
})();
