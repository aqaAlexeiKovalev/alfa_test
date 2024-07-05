import { Locator, Page } from '@playwright/test';
import { ILocator } from '../dataTypes/dataTypes';

export class Actions {
  static async clearAndTypeText(page: Page, locator: ILocator, text: string): Promise<void> {
    const element: Locator = page.locator(locator.value);
    await element.clear();
    await element.pressSequentially(text);
    await page.waitForTimeout(1000);
  }

  static async click(page: Page, locator: ILocator): Promise<void> {
    const element: Locator = page.locator(locator.value);
    element.click();
    await page.waitForTimeout(1000);
  }

  static async getText(page: Page, locator: ILocator): Promise<string> {
    const element: Locator = page.locator(locator.value);
    return element.textContent();
  }

  static async getTextList(page: Page, locator: ILocator): Promise<string[]> {
    const element: Locator[] = await page.locator(locator.value).all();
    const textList = element.map((element: Locator) => element.textContent());
    return await Promise.all(textList);
  }

  static async isElementVisible(page: Page, locator: ILocator): Promise<boolean> {
    const element: Locator = page.locator(locator.value);

    try {
      return element.isVisible();
    } catch (error) {
      return false;
    }
  }
}
