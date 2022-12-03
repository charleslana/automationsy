import AutomationSy from '../src/AutomationSy';

(async () => {
  await AutomationSy.init();
  await AutomationSy.navigate('https://letcode.in/dropable');
  await AutomationSy.dragAndDropByTarget('#draggable', '#droppable');
  await AutomationSy.scroll(350);
  await AutomationSy.sleep(1000);
  await AutomationSy.scroll(
    (await AutomationSy.getPositionY('text=TODO')) as number
  );
  await AutomationSy.removeHTML('nav');
})();
