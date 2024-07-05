import { Assertions } from '../helpers/assertions'
import { StepUtils } from '../helpers/stepUtils';
import { ShoppingBasketPo } from "../pages/shoppingBasket";
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();
const shoppingBasketPo: ShoppingBasketPo = new ShoppingBasketPo();

Given(/^пользователь очищает корзину$/, async ({page}) => {
  await shoppingBasketPo.clearBasket(page);
});

When(/^пользователь добавляет в корзину товар( со скидкой)* в количестве (\d+)$/, async ({page}, isOnSale: string, itemNumber: number) => {
  await shoppingBasketPo.addItemToBasket(page, isOnSale, itemNumber);
});

When(/^пользователь нажимает на иконку корзины$/, async ({page}) => {
  await shoppingBasketPo.clickOnBasketDropdownLink(page);
});

When(/^пользователь нажимает на кнопку Перейти в корзину$/, async ({page}) => {
  await shoppingBasketPo.clickOnGoBasketButton(page);
});

When(/^пользователь добавляет в корзину товар № (\d+) в количестве (\d+)$/, async ({page}, itemIndex: number, itemNumber: number) => {
  const itemName: string = shoppingBasketPo.dataProvider.getNoteTestData(itemIndex).name;

  await StepUtils.addLog(`Пользователь добавляет в корзину товар '${itemName}' в количестве ${itemNumber}`);
  await shoppingBasketPo.addItemToBasketByNameAndNumber(page, itemName, itemNumber);
});

Then(/^окно корзины отображается$/, async ({page}) => {
  Assertions.expectToBeTrue(await shoppingBasketPo.isBasketDropdownVisible(page), `Окно корзины не отображается`);
});

Then(/^пользователь на странице корзины$/, async ({page}) => {
  const currentUrl: string = page.url();

  Assertions.expectToInclude(currentUrl, '/basket', `Пользователь не перешёл на страницу корзины`);
});

Then(/^количество товаров в корзине равно (\d+)$/, async ({page}, itemNumber: number) => {
  Assertions.expectToEqual(await shoppingBasketPo.getBasketItemNumber(page), itemNumber, `Количество товаров в корзине не равно ${itemNumber}`);
});

Then(/^наименование добавленного в корзину товара указано верно$/, async ({page}) => {
  const itemIndex: number = Number(shoppingBasketPo.localStorage.getItem('noteIndex'));
  const itemName: string = shoppingBasketPo.dataProvider.getNoteTestData(itemIndex).name;

  Assertions.expectToEqual(await shoppingBasketPo.getBasketItemTitle(page), itemName, `Наименование товара ${itemName} указано не верно`);
});

Then(/^цена добавленного в корзину товара( со скидкой)* указано верно$/, async ({page}, isOnSale: string) => {
  const itemIndex: number = Number(shoppingBasketPo.localStorage.getItem('noteIndex'));
  const itemName: string = shoppingBasketPo.dataProvider.getNoteTestData(itemIndex).name;
  let itemPrice: number;

  if (isOnSale !== null) {
    itemPrice = shoppingBasketPo.dataProvider.getNoteTestData(itemIndex).price - shoppingBasketPo.dataProvider.getNoteTestData(itemIndex).discount;
  } else {
    itemPrice = shoppingBasketPo.dataProvider.getNoteTestData(itemIndex).price;
  }

  Assertions.expectToEqual(await shoppingBasketPo.getBasketItemPrice(page), itemPrice, `Цена товара ${itemName} указано не верно`);
});

Then(/^общая сумма добавленного в корзину товара указано верно$/, async ({page}) => {
  Assertions.expectToEqual(await shoppingBasketPo.getBasketPrice(page), await shoppingBasketPo.calculateBasketPrice(page), `Общая сумма товара указано не верно`);
});
