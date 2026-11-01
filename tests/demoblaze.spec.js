import { test, expect } from '@playwright/test';

test('Demoblaze E2E Purchase Flow', async ({ page }) => {

  await page.goto('https://www.demoblaze.com/');

  // create a unique username for the test
  const username = `user_${Date.now()}`;
  const password = 'Password123';

  // 1. Sign up process
  await page.click('#signin2');
  
  // Wait for the modal's input boxes to be visible
  await page.waitForSelector('#sign-username', { state: 'visible' });
  
  await page.fill('#sign-username', username);
  await page.fill('#sign-password', password);
  
  // Wait for the dialog to appear after clicking the sign-up button
  const signUpDialogPromise = page.waitForEvent('dialog');
  await page.click('#signInModal .btn-primary');
  const signUpDialog = await signUpDialogPromise;
  expect(signUpDialog.message()).toContain('Sign up successful.');
  await signUpDialog.accept();

  // সাইন-আপ সম্পন্ন হওয়ার পর সার্ভারে ডেটা সিঙ্ক হওয়ার জন্য সামান্য বিরতি
  await page.waitForTimeout(1500);

  // 2 . Log in process
  await page.click('#login2');
  
  // Wait for the login modal's input boxes to be visible
  await page.waitForSelector('#loginusername', { state: 'visible' });

  await page.fill('#loginusername', username);
  await page.fill('#loginpassword', password);
  await page.click('#logInModal .btn-primary');

  // Validate login was successful (মোডাল চেক বাদ দিয়ে সরাসরি ওয়েলকাম টেক্সটের জন্য অপেক্ষা করা)
  const welcomeUser = page.locator('#nameofuser');
  await expect(welcomeUser).toHaveText(`Welcome ${username}`, { timeout: 20000 });

  // 3. Select Laptops category and product
  await page.click("text=Laptops");
  await page.click('.card-title a:has-text("Sony vaio i5")');

  // 4. Add product to cart 
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  });
  
  await page.click('text=Add to cart');

  // server-side processing and dialog handling for adding to cart
  await page.waitForTimeout(1500);

  // 5. Go to cart and validate the product is added
  await page.click('#cartur');
  
  // Wait for the cart page to load and the product to be visible
  const cartItem = page.locator('.success', { hasText: 'Sony vaio i5' });
  await expect(cartItem).toBeVisible({ timeout: 20000 });

  // 6. Click on Place Order button
  await page.click('button.btn.btn-success');

  // Wait for the order modal to be visible
  await page.waitForSelector('#name', { state: 'visible' });

  // Fill in the order form with valid data
  await page.fill('#name', 'Mehraj Hasan Riaj');
  await page.fill('#country', 'Bangladesh');
  await page.fill('#city', 'Chittagong');
  await page.fill('#card', '1234567890123456');
  await page.fill('#month', '12');
  await page.fill('#year', '2028');

  // click on Purchase button
  await page.click('#orderModal .btn-primary');

  // 7. Validate the success message after purchase
  const successMessage = page.locator('.sweet-alert.showSweetAlert h2');
  await expect(successMessage).toHaveText('Thank you for your purchase!');

  await page.click('.confirm.btn.btn-primary');
});