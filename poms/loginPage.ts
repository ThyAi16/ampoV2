import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {

    //Property Login Page
    xpathBtnLogin = '[data-test="login-btn"]';
    xpathInputPhoneNumber = 'Nhập số điện thoại';
    xpathInputPassword = 'Nhập mật khẩu';
    xpathBtnSubmitLogin = '[data-test="submit-login-form"]';
    static navigationToLoginPage: any;

    constructor(page: Page) {
        super(page);
    }

    async navigationToLoginPage(){
        await this.navigationTo("https://staging:coderpusher-only@staging.ampo.vn/");
        await this.page.locator(this.xpathBtnLogin).click();
    }
    async fillPhoneNumber(phonenumber: string) {
        await this.page.getByPlaceholder(this.xpathInputPhoneNumber).fill(phonenumber);
    }
    async fillPassword(password: string) {
        await this.page.getByPlaceholder(this.xpathInputPassword).fill(password);
    }
    async clickBtnSubmitLogin() {
        await this.page.locator(this.xpathBtnSubmitLogin);
    }
    async logIn(phonenumber: string, password: string) {
        await this.fillPhoneNumber(phonenumber);
        await this.fillPassword(password);
        await this.clickBtnSubmitLogin();

    }

}