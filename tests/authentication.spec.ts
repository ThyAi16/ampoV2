import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
    await page.goto('https://staging:coderpusher-only@staging.ampo.vn/');
    await page.locator('[data-test="login-btn"]').click();
})
test.describe('Verify login', () => {

   test('Test case 1: The phone number invalid', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('035286428');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
             
   })
   test('Testcase 2: unregister phone number', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864288');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    // Assert that the error message is displayed
    const errorMessage = await page.locator('text=Incorrect phone number (0352864288) or password'); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText('Incorrect phone number (0352864288) or password');
   })
   test('Testcase 3: Phone number contains spaces', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('035286429 ');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 4: Phone number contain letters', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('035286429a');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 5: Phone number is gmail', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('thyai@nanoco.com.vn');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 6: Phone number is empty', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
    expect(page.getByRole('alert', { name: 'Đây là thông tin cần thiết.' }));
   })
   test('Testcase 7: Phone number is the country code and phone number', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('+84352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();
    // Assert that the error message is displayed
    const errorMessage = await page.locator('text=Công ty không tồn tại'); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText('Công ty không tồn tại');
    
   })
   test('Testcase 8: Phone number is wrong the country code and phone number', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('+85352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();
    // Assert that the error message is displayed
    const errorMessage = await page.locator('text=Công ty không tồn tại'); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText('Công ty không tồn tại');
    
   })
   test('Testcase 9: Phone numbers contain specical charaters', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('03528642$*');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 10: Phone numbers less than 10 characters', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('03528642');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 11: Phone numbers greater than 10 charaters', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('03528642999');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 11: Phone numbers contains hyphen', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('035-234-6749');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 11: invalid prefix', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('13528642999');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ' }));
   })
   test('Testcase 12: Wrong password', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('password01')
    await page.locator('[data-test="submit-login-form"]').click();

     // Assert that the error message is displayed
     const errorMessage = await page.locator('text=Incorrect phone number (0352864299) or password'); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText('Incorrect phone number (0352864299) or password');
   })
   test('Testcase 13: Password contains space', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('0352864299Ai@  ')
    await page.locator('[data-test="submit-login-form"]').click();

     // Assert that the error message is displayed
     const errorMessage = await page.locator('text=Incorrect phone number (0352864299) or password'); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText('Incorrect phone number (0352864299) or password');
   })
   test('Testcase 14: Password is empty', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Đây là thông tin cần thiết.' }));
   })
   test('Testcase 15: Password less than 6 charaters', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('11111')
    await page.locator('[data-test="submit-login-form"]').click();

    expect(page.getByRole('alert', { name: 'Mật khẩu tối thiểu 6 kí tự'}));
   })
   test('Testcase 16: Account inactive', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('0352864299Ai@')
    await page.locator('[data-test="submit-login-form"]').click();

    // Assert that the error message is displayed
    const errorMessage = await page.locator('text=Your account is inactive. Please contact your manager.'); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText('Your account is inactive. Please contact your manager.');
   })
   test('Testcase 17: Phone number and password is valid', async({page}) => {
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.getByPlaceholder('Nhập mật khẩu').fill('0352864299Ai@')
    await page.locator('[data-test="submit-login-form"]').click();

    await expect(page.locator('//a[@class="__2kkiyLbL"]').nth(1)).toHaveText("Đặt hàng nhanh");
   })
})

test.describe('Verify register', () => {

})

test.describe('Verify forgot password', () => {

    //Verify phone number
   test('Testcase 18: Input a phone number that does not exist', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0342789968');
    await page.locator('//button[@id="signup"]').click();
    
    const errorMessage = await page.locator("text=User doesn't exist."); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("User doesn't exist.");

   })
   test('Testcase 19: Phone number is not registered', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864255');
    await page.locator('//button[@id="signup"]').click();

    const errorMessage = await page.locator("text=User doesn't verified."); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("User doesn't verified.");
   })
   test('Testcase 20: Phone number less than 10 characters', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('03528642');
    await page.locator('//button[@id="signup"]').click();
    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ'}));
   })
   test('Testcase 21: Phone number greather than 10 characters', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('035286429999');
    await page.locator('//button[@id="signup"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ'}));
   })
   test('Testcase 22: Phone number is letters', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('Test');
    await page.locator('//button[@id="signup"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ'}));
   })
   test('Testcase 23: Phone number contains special characters', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0357#$%^&^');
    await page.locator('//button[@id="signup"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ'}));
   })
   test('Testcase 24: Phone number is empty', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('');
    await page.locator('//button[@id="signup"]').click();

    expect(page.getByRole('alert', { name: 'Số điện thoại không hợp lệ'}));
    expect(page.getByRole('alert', { name: 'Đây là thông tin cần thiết.'}));
   })
   test('Testcase 25: Phone number is the country code and phone number', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('+84352864299');
    await page.locator('//button[@id="signup"]').click();

    const errorMessage = await page.locator("text=User doesn't exist."); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("User doesn't exist.");
   })

   //Verify OTP code
   test('Testcase 26: Fill in a valid OTP code', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');

    const errorMessage = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Gửi mã xác minh thành công");
   })
   test('Testcase 27: Fill in a invalid OTP code', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('7');

    //Expected send OTP success
    const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessageSendOTP).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Mã OTP không chính xác. Vui lòng kiểm tra lại!"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Mã OTP không chính xác. Vui lòng kiểm tra lại!");
   })
   test('Testcase 28: Fill the OTP code as text', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('t');
    await page.getByPlaceholder('0').nth(1).fill('e');
    await page.getByPlaceholder('0').nth(2).fill('s');
    await page.getByPlaceholder('0').nth(3).fill('t');

    //Expected send OTP success
    const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessageSendOTP).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Mã OTP không chính xác. Vui lòng kiểm tra lại!"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Mã OTP không chính xác. Vui lòng kiểm tra lại!");
   })
   test('Testcase 29: Fill the OTP code with special characters', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('*');
    await page.getByPlaceholder('0').nth(1).fill('*');
    await page.getByPlaceholder('0').nth(2).fill('%');
    await page.getByPlaceholder('0').nth(3).fill('#');

    //Expected send OTP success
    const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessageSendOTP).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Mã OTP không chính xác. Vui lòng kiểm tra lại!"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Mã OTP không chính xác. Vui lòng kiểm tra lại!");
   })
   test('Testcase 30: Fill the OTP code with a space', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill(' ');
    await page.getByPlaceholder('0').nth(1).fill(' ');
    await page.getByPlaceholder('0').nth(2).fill(' ');
    await page.getByPlaceholder('0').nth(3).fill(' ');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();

    //Expected send OTP success
    const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessageSendOTP).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Mã OTP không chính xác. Vui lòng kiểm tra lại!"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Mã OTP không chính xác. Vui lòng kiểm tra lại!");
   })
   test('Testcase 31: Fill the OTP code is not enought 4 codes', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('2');
    await page.getByPlaceholder('0').nth(1).fill('3');
    await page.getByPlaceholder('0').nth(3).fill('5');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();

    //Expected send OTP success
    const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessageSendOTP).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Mã OTP không chính xác. Vui lòng kiểm tra lại!"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Mã OTP không chính xác. Vui lòng kiểm tra lại!");
   })
   test('Testcase 32: Fill the OTP code incorrectly more than 3 time', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('1');
    await page.getByPlaceholder('0').nth(1).fill('1');
    await page.getByPlaceholder('0').nth(2).fill('1');
    await page.getByPlaceholder('0').nth(3).fill('1');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.waitForTimeout(100);
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.waitForTimeout(100);
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.waitForTimeout(100);
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.waitForTimeout(100);
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    
      //Expected fill the OTP code incorrectly more than 5 time
      const errorMessagethan3time = await page.locator("text=too many failed attempts"); // Replace with actual error message locator
      await expect(errorMessagethan3time).toBeVisible(); 
      // Verify the error message text
      await expect(errorMessagethan3time).toHaveText("too many failed attempts");
   })
   test('Testcase 33: OTP code validity period has expired', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.waitForTimeout(61000);
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();

    //Expected send OTP success
    const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessageSendOTP).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Your verification code does not exist"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Your verification code does not exist");
   })
   test('Testcase 34: Fill in the old OTP code', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.waitForTimeout(61000);
    await page.getByRole('button', {name: 'Gửi lại OTP'}).click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();

    //Expected send OTP success
    const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
    await expect(errorMessageSendOTP).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Your verification code does not exist"); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Your verification code does not exist");
   })
   test('Testcase 35: Fill in the old OTP code', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.waitForTimeout(61000);
    await page.getByRole('button', {name: 'Gửi lại OTP'}).click();
    await page.waitForTimeout(61000);
    await page.getByRole('button', {name: 'Gửi lại OTP'}).click();
    await page.waitForTimeout(61000);
    await page.getByRole('button', {name: 'Gửi lại OTP'}).click();
    await page.waitForTimeout(61000);
    await page.getByRole('button', {name: 'Gửi lại OTP'}).click();
    await page.waitForTimeout(61000);
    await page.getByRole('button', {name: 'Gửi lại OTP'}).click();

    //Expected verify fill in OTP
    const errorMessage = await page.locator("text=Bạn đã gửi quá nhiều yêu cầu SMS. Vui lòng thử lại sau."); // Replace with actual error message locator
    await expect(errorMessage).toBeVisible(); 
    // Verify the error message text
    await expect(errorMessage).toHaveText("Bạn đã gửi quá nhiều yêu cầu SMS. Vui lòng thử lại sau.");
   })
   //Create new password
   test('Testcase 36: Fill in password less than 6 characters', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.getByPlaceholder('Nhập mật khẩu').fill('11111');
    expect(page.getByRole('alert', { name: 'Mật khẩu tối thiểu 6 kí tự'}));
    
     //Expected send OTP success
     const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
     await expect(errorMessageSendOTP).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");
 
     //Expected verify fill in OTP
     const errorMessage = await page.locator("text=Xác thực thành công"); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText("Xác thực thành công");

   })
   test('Testcase 37: Leave the new password blank', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.getByPlaceholder('Nhập mật khẩu').fill('');
    await page.locator('//button[@id="new_password"]').click();
    expect(page.getByRole('alert', { name: 'Đây là thông tin cần thiết.'}));
    
     //Expected send OTP success
     const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
     await expect(errorMessageSendOTP).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");
 
     //Expected verify fill in OTP
     const errorMessage = await page.locator("text=Xác thực thành công"); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText("Xác thực thành công");

   })
   test('Testcase 37: Create a new valid password', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345a');
    
     //Expected send OTP success
     const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
     await expect(errorMessageSendOTP).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");
 
     //Expected verify fill in OTP
     const errorMessage = await page.locator("text=Xác thực thành công"); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText("Xác thực thành công");

   })
   //Confirm password
   test('Testcase 37: Fill in the wrong password', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345a');
    await page.getByPlaceholder('Xác nhận mật khẩu').fill('12345A');
    await page.getByRole('button', {name: 'Tiếp tục'});

    expect(page.getByRole('alert', { name: 'Mật khẩu không khớp'}));
    
     //Expected send OTP success
     const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
     await expect(errorMessageSendOTP).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");
 
     //Expected verify fill in OTP
     const errorMessage = await page.locator("text=Xác thực thành công"); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText("Xác thực thành công");
   })
   test('Testcase 38: Leave the password blank', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345a');
    await page.getByPlaceholder('Xác nhận mật khẩu').fill('');
    await page.getByRole('button', {name: 'Tiếp tục'});

    expect(page.getByRole('alert', { name: 'Đây là thông tin cần thiết.'}));
    
     //Expected send OTP success
     const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
     await expect(errorMessageSendOTP).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");
 
     //Expected verify fill in OTP
     const errorMessage = await page.locator("text=Xác thực thành công"); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText("Xác thực thành công");
   })
   test('Testcase 39: Fill in password less than 6 characters', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345');
    await page.getByPlaceholder('Xác nhận mật khẩu').fill('');
    await page.getByRole('button', {name: 'Tiếp tục'});

    expect(page.getByRole('alert', { name: 'Mật khẩu không khớp'}));
    
     //Expected send OTP success
     const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
     await expect(errorMessageSendOTP).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");
 
     //Expected verify fill in OTP
     const errorMessage = await page.locator("text=Xác thực thành công"); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText("Xác thực thành công");
   })
   test('Testcase 40: Password created successfully', async({page}) => {
    await page.getByText('Quên mật khẩu').click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Nhập số điện thoại').fill('0352864299');
    await page.locator('//button[@id="signup"]').click();
    await page.getByPlaceholder('0').first().fill('0');
    await page.getByPlaceholder('0').nth(1).fill('6');
    await page.getByPlaceholder('0').nth(2).fill('0');
    await page.getByPlaceholder('0').nth(3).fill('6');
    await page.getByRole('button', {name: 'Tiếp tục'}).click();
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345Test');
    await page.getByPlaceholder('Xác nhận mật khẩu').fill('12345Test');
    await page.waitForTimeout(1000);
    await page.locator('//button[@id="new_password"]').click();

    //expect(page.locator('//h4[text()=""]'));
    expect(page.locator('h4', {hasText: "Thay đổi mật khẩu thành công"}));
    
     //Expected send OTP success
     const errorMessageSendOTP = await page.locator("text=Gửi mã xác minh thành công"); // Replace with actual error message locator
     await expect(errorMessageSendOTP).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageSendOTP).toHaveText("Gửi mã xác minh thành công");
 
     //Expected verify fill in OTP
     const errorMessageAuthen = await page.locator("text=Xác thực thành công"); // Replace with actual error message locator
     await expect(errorMessageAuthen).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessageAuthen).toHaveText("Xác thực thành công");

     //Expected verify successful password change
     const errorMessage = await page.locator("text=Thay đổi mật khẩu thành công"); // Replace with actual error message locator
     await expect(errorMessage).toBeVisible(); 
     // Verify the error message text
     await expect(errorMessage).toHaveText("Thay đổi mật khẩu thành công");

   })
   

})
