import { Action, Resource } from '../src/';

(async () => {
  await Action.navigate('https://letcode.in/dropable');
  await Action.pdf();
  await Action.screenshot();
  await Action.dragAndDropByTarget('#draggable', '#droppable');
  await Action.scroll(350);
  await Action.screenshot();
  await Action.sleep(1000);
  await Action.scroll((await Resource.getPositionY('text=TODO')) as number);
  await Action.removeHTML('nav');
  await Action.screenshot();
  await Action.pdf();
  await Action.dispose();
})();
