import { test, expect } from '@playwright/test';

test('Demoblaze E2E Purchase Flow', async ({ page }) => {

  await page.goto('https://www.demoblaze.com/');

  // generate a unique username for testing
  const username = `user_${Date.now()}`;
  const password = 'Password123';

  //sign up process
  await page.click('#signin2');
  await page.fill('#sign-username', username);
  await page.fill('#sign-password', password);
  
  // sign up button click and handle the alert
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Sign up successful.');
    await dialog.accept();
  });
  await page.click('#signInModal .btn-primary');

  // login process
  await page.click('#login2');
  await page.fill('#loginusername', username);
  await page.fill('#loginpassword', password);
  await page.click('#logInModal .btn-primary');

  // login success validation
  const welcomeUser = page.locator('#nameofuser');
  await expect(welcomeUser).toHaveText(`Welcome ${username}`, { timeout: 10000 });
  
});