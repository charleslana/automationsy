import AutomationSy from '../src/AutomationSy';

(async () => {
  AutomationSy.setHeadless(true);
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/radio');
  console.log('radio yes', await AutomationSy.isChecked('#yes'));
  console.log('radio notfoo', await AutomationSy.isChecked('#notfoo'));
  console.log(
    'checkbox',
    await AutomationSy.isChecked("(//input[@type='checkbox'])[1]")
  );
  await AutomationSy.dispose();
})();
