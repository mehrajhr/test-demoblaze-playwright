import { test, expect } from '@playwright/test';

test('Demoblaze E2E Purchase Flow', async ({ page }) => {

  await page.goto('https://www.demoblaze.com/');

  // create a unique username for the test
  const username = `user_${Date.now()}`;
  const password = 'Password123';

  // 1. sign up process
  await page.click('#signin2');
  await page.fill('#sign-username', username);
  await page.fill('#sign-password', password);
  
  // set up alert listener
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Sign up successful.');
    await dialog.accept();
  });
  await page.click('#signInModal .btn-primary');

  // 2. sign up pop-up fully closed and process completed
  await page.waitForTimeout(1000);

  // 3. login process
  await page.click('#login2');
  await page.fill('#loginusername', username);
  await page.fill('#loginpassword', password);
  await page.click('#logInModal .btn-primary');

  // login successful validation
  const welcomeUser = page.locator('#nameofuser');
  await expect(welcomeUser).toHaveText(`Welcome ${username}`, { timeout: 10000 });

  // 4. Select Laptops category and product
  await page.click("text=Laptops");
  await page.click('.card-title a:has-text("Sony vaio i5")');

  // 5. Add product to cart (Dialog Listener handled correctly)
  const dialogPromise = page.waitForEvent('dialog');
  await page.click('text=Add to cart');
  const dialog = await dialogPromise;
  expect(dialog.message()).toContain('Product added');
  await dialog.accept();

  // 6. Go to cart and validate the product is added
  await page.click('#cartur');
  
  // Validate that the product is present in the cart
  const cartItem = page.locator('#tbodyid tr.success td', { hasText: 'Sony vaio i5' });
  await expect(cartItem).toBeVisible({ timeout: 10000 });

  // 7. Click on Place Order button
  await page.click('button.btn.btn-success');

  // Fill in the order form with valid data
  await page.fill('#name', 'Mehraj Hasan Riaj');
  await page.fill('#country', 'Bangladesh');
  await page.fill('#city', 'Chittagong');
  await page.fill('#card', '1234567890123456');
  await page.fill('#month', '12');
  await page.fill('#year', '2028');

  // click on Purchase button
  await page.click('#orderModal .btn-primary');

  // 8. Validate the success message after purchase
  const successMessage = page.locator('.sweet-alert.showSweetAlert h2');
  await expect(successMessage).toHaveText('Thank you for your purchase!');

  await page.click('.confirm.btn.btn-primary');
});