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
  
  // সাইন আপ পপ-আপের রেজিস্টার বাটনে ক্লিক এবং অ্যালার্ট হ্যান্ডেল করা
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Sign up successful.');
    await dialog.accept();
  });
  await page.click('#signInModal .btn-primary');

  
});