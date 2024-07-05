import { StepUtils } from "../helpers/stepUtils";
import { LoginPo } from "../pages/login.po";
import { createBdd } from 'playwright-bdd';

const { Given } = createBdd();
const loginPo: LoginPo = new LoginPo();

Given(/^пользователь № (\d+) авторизован в системе$/, async ({page}, userIndex: number) => {
  await StepUtils.addLog(`The user opens the Login Page '${loginPo.dataProvider.getUrlTestData().mainUrl}login'`);
  await loginPo.openLoginPage(page);

  await StepUtils.addLog(`The user types the user username '${loginPo.dataProvider.getUserTestData(userIndex).username}'`);
  await loginPo.typeValueInLoginInput(page, loginPo.dataProvider.getUserTestData(userIndex).username);

  await StepUtils.addLog(`The user types the user password '${loginPo.dataProvider.getUserTestData(userIndex).password}'`);
  await loginPo.typeValueInPasswordInput(page, loginPo.dataProvider.getUserTestData(userIndex).password);

  await StepUtils.addLog(`The user clicks on the Login button`);
  await loginPo.clickOnLoginButton(page);
});
