import { Page } from '@playwright/test';
import { ILocator } from '../dataTypes/dataTypes';
import { BasePo } from './base.po';
import { Actions } from '../helpers/actions';

export class LoginPo extends BasePo {
  private loginInput: ILocator = {value: 'input#loginform-username', definition: 'Login Input'};
  private passwordInput: ILocator = {value: 'input#loginform-password', definition: 'Password Input'};
  private loginButton: ILocator = {value: 'button[name="login-button"]', definition: 'Login Button'};

  public getLoginUrl(): string {
    return `${this.dataProvider.getUrlTestData().mainUrl}login`;
  }

  public async openLoginPage(page: Page): Promise<void> {
    await page.goto(this.getLoginUrl());
  }

  public async typeValueInLoginInput(page: Page, value: string): Promise<void> {
    await Actions.clearAndTypeText(page, this.loginInput, value);
  }

  public async typeValueInPasswordInput(page: Page, value: string): Promise<void> {
    await Actions.clearAndTypeText(page, this.passwordInput, value);
  }

  public async clickOnLoginButton(page: Page): Promise<void> {
    await Actions.click(page, this.loginButton);
  }
}
