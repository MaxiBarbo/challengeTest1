// login-page.ts
import { Page } from 'playwright';
import accessGoogleSheet from '../../utils/googleSheetAcces';
import accessExcelSheet from '../../utils/excelSheets';

export class Elements {
    public static readonly UsernameInput = '[data-test="username"]';
    public static readonly PasswordInput = '[data-test="password"]';
    public static readonly SubmitButton = 'input[type="submit"]';

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async enterUsername(username: string): Promise<void> {
        await this.page.fill(Elements.UsernameInput, username);
        console.log(`Entering username: ${username}`);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.page.fill(Elements.PasswordInput, password);
        console.log(`Entering password: ${password}`);
    }

    public async clickSubmit(): Promise<void> {
        await this.page.waitForSelector(Elements.SubmitButton);
        await this.page.click(Elements.SubmitButton);
        console.log('Clicking submit button');
    }

    public async loginUser(username: string, password: string): Promise<void> {
        const spreadsheetId = '1N2_if3nb_-VFPVxs3g3n5j9L1Agtw886CivwWUpO9DM';
        const apiKey = 'AIzaSyBeuLvEvy5QXAiJnq-7YGa1TWTqYsBdJlU';
        const range = 'login!A1:J38';
        let userName = await accessGoogleSheet(spreadsheetId, apiKey, range, 1, 0)
        let userPass = await accessGoogleSheet(spreadsheetId, apiKey, range, 1, 1)

        await this.page.waitForSelector(Elements.UsernameInput)
        await this.page.fill(Elements.UsernameInput, username)
        await this.page.waitForSelector(Elements.PasswordInput)
        await this.page.fill(Elements.PasswordInput, password)

        // console.log(userName)
        // console.log(userPass)
    }

    public async dataSheets(){
        let excelData = 'src/templates/dataLogin.xlsx'
        let dataExcel = accessExcelSheet(excelData)

        
    }
}
