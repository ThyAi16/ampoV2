import { Page } from '@playwright/test';
import { LoginPage } from './../poms/loginPage';
import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('https://staging:coderpusher-only@staging.ampo.vn/');
    await page.locator('[data-test="login-btn"]').click();
})

test.describe('Verify login', () => {
    test('Test case: The phone number invalid', async ({ page }) => {
      const loginPage = new LoginPage(page);
  
      // Array of invalid phone numbers
      const phoneNumbers = [
        { phone: '123', expect: "//div[@role='alert' and text()='Số điện thoại không hợp lệ']"},
        { phone: '03528645232', expect: "//div[@role='alert' and text()='Số điện thoại không hợp lệ']" },
        { phone: '12345test', expect: "//div[@role='alert' and text()='Số điện thoại không hợp lệ']" },
      ];
  
      const password = '123eyyuh';
  
      for (const phoneEntry of phoneNumbers) {
        await test.step(`Test case: Invalid phone number "${phoneEntry.phone}"`, async () => {
          await loginPage.navigationToLoginPage();
          await page.waitForTimeout(1000); // Optional delay for visibility or can be removed
  
          // Log in with invalid phone number and password
          await loginPage.logIn(phoneEntry.phone, password);
  
          await page.waitForTimeout(1000);
          // Assert that the error alert appears
           await expect(page.locator(phoneEntry.expect)).toBeVisible();
        //   if (phoneEntry.expect) {
        //     await expect(page.locator(phoneEntry.expect)).toBeVisible();
        //   } else {
        //     throw new Error(`Expected XPath is missing for phone number: ${phoneEntry.phone}`);
        //   }
         
        });
      }
    });
  });

