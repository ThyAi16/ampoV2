import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://staging.ampo.vn/');

  await test.step("Accpect Dialog", async()=>
    {
      page.once('dialog', async dialog => 
      {
        await page.getByRole('textbox').fill('staging');
        await page.getByText('Password').fill('coderpusher-only');
        await page.waitForTimeout(1000);
        await dialog.accept();       
      }
      )
    }
    )
  await page.locator('[data-test="login-btn"]').click();
  await page.getByPlaceholder('Nhập số điện thoại').click();
  await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
  await page.getByPlaceholder('Nhập mật khẩu').click();
  await page.getByPlaceholder('Nhập mật khẩu').fill('0352864299Ai@');
  await page.locator('[data-test="submit-login-form"]').click();
  await page.getByLabel('Đặt hàng nhanh').click();
  await page.getByRole('button', { name: 'down Thiết bị điện xây dựng' }).click();
  await page.locator('.rrcGXAoI > button').first().click();
  await page.locator('.rrcGXAoI > button').first().click();
  await page.locator('div:nth-child(5) > .ant-row > div:nth-child(3) > .__67qpPMT2 > div > .ant-input-group > .rrcGXAoI > button').first().click();
  await page.locator('.rrcGXAoI > button:nth-child(2)').first().click();
  await page.locator('div:nth-child(5) > .ant-row > div:nth-child(3) > .__67qpPMT2 > div:nth-child(2) > .ant-input-group > .rrcGXAoI > button:nth-child(2)').click();
  await page.locator('[data-test="order-btn-instant-deal-v2"]').click();
  await page.getByRole('button', { name: 'Mua hàng' }).click();
  await page.getByRole('button', { name: 'Đặt hàng ngay' }).click();
  await page.getByLabel('Tiếp theo').click();
  await page.getByLabel('Xác nhận đơn hàng').click();
});

test("Prompt Dialog error", async ({ page }) => {
  await page.goto('https://staging.ampo.vn/');
  page.on("dialog", async (dialog) => {
    await page.goto('https://staging.ampo.vn/');
    expect(dialog.type()).toContain("prompt");
    expect(dialog.message()).toContain("https://staging.ampo.vn/");
    expect(dialog.defaultValue()).toContain("");
    await dialog.accept("Username");
    await dialog.accept("Password");
  })

  await page.getByLabel('Username').fill('staging');
  await page.getByLabel('Password').fill('coderpusher-only');
  await page.getByText("Sign in").click();
  await page.waitForTimeout(1000);
});

//Method 1: authen
test('test with page.authenticate', async ({ page, context }) => {
  // Set authentication credentials
  await context.setHTTPCredentials({
      username: 'staging',
      password: 'coderpusher-only'
  });

  await page.goto('https://staging.ampo.vn/');
  await page.waitForTimeout(1000);
});

//Method 2: authen
test('basic auth', async ({ page }) => {
  await page.goto('https://staging:coderpusher-only@staging.ampo.vn/');
  await page.locator('[data-test="login-btn"]').click();
})

//Method 1: checkout order
test('test with basic auth', async ({ page }) => {
  await page.goto('https://staging:coderpusher-only@staging.ampo.vn/');
  await page.locator('[data-test="login-btn"]').click();
  await page.getByPlaceholder('Nhập số điện thoại').click();
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
  await page.getByPlaceholder('Nhập mật khẩu').click();
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Nhập mật khẩu').fill('0352864299Ai@');
  await page.waitForTimeout(1000);
  await page.locator('[data-test="submit-login-form"]').click();
  await page.getByLabel('Đặt hàng nhanh').click();
  await page.getByRole('button', { name: 'down Thiết bị điện xây dựng' }).click();
  await page.waitForTimeout(1000);
  await page.locator('.rrcGXAoI > button').first().click();
  await page.locator('.rrcGXAoI > button').first().click();
  await page.locator('div:nth-child(5) > .ant-row > div:nth-child(3) > .__67qpPMT2 > div > .ant-input-group > .rrcGXAoI > button').first().click();
  await page.locator('.rrcGXAoI > button:nth-child(2)').first().click();
  await page.locator('div:nth-child(5) > .ant-row > div:nth-child(3) > .__67qpPMT2 > div:nth-child(2) > .ant-input-group > .rrcGXAoI > button:nth-child(2)').click();
  await page.locator('[data-test="order-btn-instant-deal-v2"]').click();
  await page.getByRole('button', { name: 'Mua hàng' }).click();
  await page.getByRole('button', { name: 'Đặt hàng ngay' }).click();
  await page.waitForTimeout(3000);
  await page.getByLabel('Tiếp theo').click();
  await page.getByLabel('Xác nhận đơn hàng').click();
  //await page.waitForTimeout(2000);
});

//Method 2: checkout order
test('Checkout order', async({page}) => {

  //Authen
  await page.goto('https://staging:coderpusher-only@staging.ampo.vn/');
   //Click on button Dang nhap
  await page.locator('[data-test="login-btn"]').click();
  //or
  //await page.locator('.ant-btn ant-btn-primary apBIBmnh').click();
  await page.waitForTimeout(500);
  //Nhap phone
  await page.getByPlaceholder('Nhập số điện thoại').click();
  
  await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
  //or
  //await page.locator('.ant-input ant-input-lg').fill('0352864299');

  //Nhap pass
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Nhập mật khẩu').fill('0352864299Ai@');
  //or
  //await page.locator('//input[@id="password"]').fill('0352864299Ai@');

  //Click Tiep tuc -> Verify account
  await page.locator('[data-test="submit-login-form"]').click();

  //Navigate to Dat hang nhanh
  await page.getByLabel('Đặt hàng nhanh').click();

  //Down Danh sach san pham
  await page.getByRole('button', {name: 'Thiết bị điện xây dựng'}).click();
  //or
  //await page.locator('.ant-btn ant-btn-text TV2vsLFz').first().click();
  await page.waitForTimeout(1000);
  //Click increase amount first for product 1
  await page.locator('//button[@data-test="increase"]').first().click();

  //Click increase amount first for product 2
  await page.locator('//button[@data-test="increase"]').nth(1).click();

  await page.waitForTimeout(1000);
  //Click decrease amount first product 1
  await page.locator('//button[@data-test="decrease"]').first().click();

  //Click button Dat hang ngay
  await page.getByRole('button', {name: 'Đặt hàng ngay'}).click();
  //or
  //await page.locator('[data-test="order-btn-instant-deal-v2"]').click();

  //Click button Mua hang
  await page.getByRole('button', {name: 'Mua hàng'}).click();

  //Click button Dat hang ngay
  await page.getByRole('button', {name: 'Đặt hàng ngay'}).click();

  await page.waitForTimeout(2000);
  //Click button Tiep theo
  await page.getByRole('button', {name: 'Tiếp theo'}).click();
  await page.waitForTimeout(3000);
  //Click button Xac nhan don hang
  await page.getByRole('button', {name: 'Xác nhận đơn hàng'}).click();
  await page.waitForTimeout(2000);


})










