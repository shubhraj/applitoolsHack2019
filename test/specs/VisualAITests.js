require('dotenv').config();
const assert = require('assert')
const { Eyes, Target } = require('@applitools/eyes.webdriverio')

const eyes = new Eyes();

//V1 URLS.
const loginUrlV1 = 'https://demo.applitools.com/hackathon.html';
const dashboardURLV1 = "https://demo.applitools.com/hackathonApp.html";

//V2 URLS.
const loginUrlV2 = 'https://demo.applitools.com/hackathonV2.html';
const dashboardURLV2 = "https://demo.applitools.com/hackathonAppV2.html";

const testurl = loginUrlV1;
const dashBoardUrl = dashboardURLV1;

eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
eyes.setBatch("Visual Test", "Tester : Shubham");

async function inputCreds(){
    await browser.setValue('#username', 'valid@user.com');
    await browser.setValue('#password','hunter2');
}

describe('Applitools Visual Test', async ()=> {

    describe('Login Page' , async () => {

        beforeEach(async () => {
            await browser.url(testurl);
            await browser.windowHandleFullscreen();
        });

        it('Should test Login Page content and styling', async () => {
            try{
                const viewportSize = await browser.getViewportSize();
                await eyes.open(browser, 'Login Page content Validation', 'Login Page', viewportSize);
                await eyes.checkElementBySelector('div.auth-box-w');
                await eyes.check('Login Page', Target.window());
                await eyes.close();
            } finally {
                await eyes.abortIfNotClosed();
            }
        });
    });

    describe('Login Page functionality', async () => {
        let viewportSize;

        beforeEach(async () => {
            await browser.url(testurl);
            await browser.windowHandleFullscreen();
            viewportSize = await browser.getViewportSize();
        });

        it('should not log in, you don’t enter the username and password and click the login button', async () => {
            try {
                await eyes.open(browser, 'Login functionality Validation', 'Login Page test-1', viewportSize);
                await eyes.check('Login Page before click on log in', Target.window());
                await browser.click('#log-in');
                await eyes.check('Login Page after click on log in', Target.window());
                await eyes.close();
            } finally {
                await eyes.abortIfNotClosed();
            }
        });

        it('should not log in, If you only enter the username and click the login button', async () => {
            try {
                await eyes.open(browser, 'Login functionality Validation', 'Login Page test-2', viewportSize);
                await eyes.check('Login Page before click on log in', Target.window());
                await browser.setValue('#username', 'valid@user.com');
                await browser.click('#log-in');
                await eyes.check('Login Page after click on log in', Target.window());
                await eyes.close();
            } finally {
                await eyes.abortIfNotClosed();
            }
        });

        it('should not log in, If you only enter the password and click the login button', async () => {
            try {
                await eyes.open(browser, 'Login functionality Validation', 'Login Page test-3', viewportSize);
                await eyes.check('Login Page before click on log in', Target.window());
                await browser.setValue('#password','hunter2');
                await browser.click('#log-in');
                await eyes.check('Login Page after click on log in', Target.window());
                await eyes.close();
            } finally {
                await eyes.abortIfNotClosed();
            }
        });

        it('should let you log in, If you enter both username (any value) and password (any value)', async () => {
            try {
                await eyes.open(browser, 'Login functionality Validation', 'Login Page test-4', viewportSize);
                await eyes.check('Login Page', Target.window());
                await inputCreds();
                await browser.click('#log-in');
                eyes.setForceFullPageScreenshot(true);
                await eyes.check('DashBoard', Target.window());
                await eyes.close();

            } finally {
                await eyes.abortIfNotClosed();
            }
        });
    });

    describe('DashBoard' , async () => {

        beforeEach(async () => {
            await browser.url(testurl);
        });

        it('Should check the difference after Table is Sort', async () => {
            try {
                browser.windowHandleFullscreen();
                const viewportSize = browser.getViewportSize();
                await eyes.open(browser, 'DashBoard', 'Table Sort test', viewportSize);
                await inputCreds();
                await browser.click('#log-in');
                eyes.setForceFullPageScreenshot(true);
                //await eyes.checkElementBySelector('div.table-responsive');
                await eyes.check('DashBoard before Sorting', Target.window());
                await browser.click('#amount');
                await eyes.check('DashBoard after Sorting', Target.window());
                await eyes.close();
            }finally {
                await eyes.abortIfNotClosed();
            }
        });
    });

    describe('Canvas Chart Test', async () => {

        beforeEach(async () => {
            await browser.url(testurl);
        });

        it('should test the Charts', async () => {
            try{
                browser.windowHandleFullscreen();
                await eyes.open(browser, 'Canvas', 'Expense Bar Chart', {width: 1200, height: 1000});
                await inputCreds();
                await browser.click('#log-in');
                await eyes.setForceFullPageScreenshot(true);
                await browser.click('#showExpensesChart');
                await eyes.check('Chart for expenses for the year 2017 and 2018', Target.window());
                await browser.click('#addDataset');
                await eyes.check('Chart for expenses for the year 2017, 2018 and 2019', Target.window());
                await eyes.close();
            }finally {
                await eyes.abortIfNotClosed();
            }
        });
    });

    describe('Dynamic Content Test', async () => {

        beforeEach(async () => {
            await browser.url(dashBoardUrl + "?showAd=true");
        });

        it('should test the Ad GIF\'s', async () => {
            try{
                eyes.setMatchLevel("Layout");
                browser.windowHandleFullscreen();
                const viewportSize = browser.getViewportSize();
                await eyes.open(browser, 'Dynamic Ads', 'Ads Gifs', viewportSize);
                eyes.setForceFullPageScreenshot(true);
                await eyes.check('Dynamic Ads', Target.window());
                await eyes.close();
            }finally {
                await eyes.abortIfNotClosed();
            }
        });
    });
});





