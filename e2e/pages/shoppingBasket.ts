import { Page } from '@playwright/test';
import { ILocator, INoteDataType } from '../dataTypes/dataTypes';
import { BasePo } from './base.po';
import { Actions } from '../helpers/actions';
import { Waiters } from '../helpers/waiters';

export class ShoppingBasketPo extends BasePo {
  private basketDropdownLink: ILocator = {value: 'a#dropdownBasket', definition: 'Basket Dropdown Link'};
  private basketDropdown: ILocator = {value: 'div.dropdown-menu.show', definition: 'Basket Dropdown'};
  private goBasketButton: ILocator = {value: 'a.btn-primary', definition: 'Go Basket Button'};
  private clearBasketButton: ILocator = {value: 'a.btn-danger', definition: 'Clear Basket Button'};
  private basketCounter: ILocator = {value: 'span.basket-count-items', definition: 'Basket Counter'};
  private basketItemTitle: ILocator = {value: 'span.basket-item-title', definition: 'Basket Item Title'};
  private basketItemPrice: ILocator = {value: 'span.basket-item-price', definition: 'Bbasket Item Price'};
  private basketItemCount: ILocator = {value: 'span.basket-item-count', definition: 'Bbasket Item Count'};
  private basketPrice: ILocator = {value: 'span.basket_price', definition: 'Basket Price'};
  private itemListName: ILocator = {value: 'div.note-list div.product_name', definition: 'Item List Name'};

  private itemByName(name: string): ILocator {
    return {value: `//div[text()="${name}"]/parent::div/button`, definition: `Item By Name '${name}'`};
  }

  private itemBuyCountByName(name: string): ILocator {
    return {value: `//div[text()="${name}"]/parent::div//input`, definition: `Item Buy Count By Name '${name}'`};
  }

  private pageLinkByNumber(number: number): ILocator {
    return {value: `a[data-page-number="${number}"]`, definition: `Page Link By Number '${number}'`};
  }

  public async clearBasket(page: Page): Promise<void> {
    const currentValue: string = await Actions.getText(page, this.basketCounter)

    if (currentValue === '9') {
      await Actions.click(page, this.itemByName(this.dataProvider.getNoteTestData(1).name));
      await Actions.click(page, this.basketDropdownLink);
      await Waiters.waitForElementToBeVisible(page, this.basketDropdown);
      await Actions.click(page, this.clearBasketButton);
      await Waiters.waitForTextChange(page, this.basketCounter, currentValue);
    } else if (currentValue !== '0') {
      await Actions.click(page, this.basketDropdownLink);
      await Waiters.waitForElementToBeVisible(page, this.basketDropdown);
      await Actions.click(page, this.clearBasketButton);
      await Waiters.waitForTextChange(page, this.basketCounter, currentValue);
    }
  }

  public async addItemToBasket(page: Page, isOnSale: string, itemNumber: number): Promise<void> {
    const noteList: INoteDataType[] = this.dataProvider.getNoteListTestData();
    let noteIndex: number;

    if (isOnSale !== null) {
      noteIndex = noteList.findIndex((note: INoteDataType) => note.discount > 0);
      this.localStorage.setItem('noteIndex', String(noteIndex));
    } else {
      noteIndex = noteList.findIndex((note: INoteDataType) => note.discount === 0);
      this.localStorage.setItem('noteIndex', String(noteIndex));
    }

    if (itemNumber > 1) {
      await Actions.clearAndTypeText(page, this.itemBuyCountByName(noteList[noteIndex].name), String(itemNumber));
    }

    await Actions.click(page, this.itemByName(noteList[noteIndex].name));
  }

  public async addItemToBasketByNameAndNumber(page: Page, itemName: string, itemNumber: number): Promise<void> {
    const nameList: string[] = await Actions.getTextList(page, this.itemListName);
    let nameIndex: number = nameList.findIndex((name: string) => name === itemName);
    let pageNumber: number = 1;

    if (nameIndex === -1) {
      await Actions.click(page, this.pageLinkByNumber(pageNumber + 1));
      const nameList: string[] = await Actions.getTextList(page, this.itemListName);
      nameIndex = nameList.findIndex((name: string) => name === itemName);
      pageNumber += 1;
    }

    if (itemNumber > 1) {
      await Actions.clearAndTypeText(page, this.itemBuyCountByName(itemName), String(itemNumber));
    }

    await Actions.click(page, this.itemByName(itemName));
  }

  public async calculateBasketPrice(page: Page): Promise<number> {
    let itemPriceList: string[] = await Actions.getTextList(page, this.basketItemPrice);
    itemPriceList = itemPriceList.map((itemPrice: string) => itemPrice.match(/\d+/g).join(''));
    const itemCountList: string[] = await Actions.getTextList(page, this.basketItemCount);
    let basketPrice: number = 0;

    for (let i: number = 0; i < itemPriceList.length; i++) {
      basketPrice += (Number(itemPriceList[i]) * Number(itemCountList[i]));
    }

    return basketPrice;
  }

  public async clickOnBasketDropdownLink(page: Page): Promise<void> {
    await Actions.click(page, this.basketDropdownLink);
  }

  public async clickOnGoBasketButton(page: Page): Promise<void> {
    await Actions.click(page, this.goBasketButton);
  }

  public async getBasketItemNumber(page: Page): Promise<number> {
    const itemNumber: string = await Actions.getText(page, this.basketCounter);

    return Number(itemNumber);
  }

  public async getBasketItemTitle(page: Page): Promise<string> {
    const itemTitle: string = await Actions.getText(page, this.basketItemTitle);

    return itemTitle;
  }

  public async getBasketItemPrice(page: Page): Promise<number> {
    const itemPrice: string = await Actions.getText(page, this.basketItemPrice);

    return Number(itemPrice.match(/\d+/g).join(''));
  }

  public async getBasketPrice(page: Page): Promise<number> {
    const itemTitle: string = await Actions.getText(page, this.basketPrice);

    return Number(itemTitle);
  }

  public async isBasketDropdownVisible(page: Page): Promise<boolean> {
    return await Actions.isElementVisible(page, this.basketDropdown);
  }
}
