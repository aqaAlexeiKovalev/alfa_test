import { Locator, Page } from '@playwright/test';
import { Actions } from './actions';
import { ILocator } from '../dataTypes/dataTypes';

export class Waiters {
  private static timeout: number = 10000;

  static async waitForElementToBeVisible(page: Page, locator: ILocator, timeout: number = this.timeout): Promise<void> {
    const element: Locator = page.locator(locator.value);
    try {
      await element.waitFor({
        timeout: timeout,
        state: 'visible'
      });
    } catch {
      throw new Error(`Waiting for the '${locator.definition}' to be visible.
      The element with locator '${locator.value}' is not visible after ${timeout} ms`)
    }
  }

  static async waitForTextChange(page: Page, locator: ILocator, textValueBefore: string, timeout: number = this.timeout): Promise<void> {
    let elementText: string = await Actions.getText(page, locator);
    let counter: number = 0;

    while (elementText === textValueBefore && counter < timeout) {
      await page.waitForTimeout(500);
      elementText = await Actions.getText(page, locator);
      counter = counter + 100;
    }

    if (counter === timeout) {
      throw new Error(`Waiting for the text '${textValueBefore}' to be changed in the '${locator.definition}'.
      The text '${textValueBefore}' isn't changed in the element with locator '${locator.value}' after timeout ${timeout}`);
    }
  }
}
