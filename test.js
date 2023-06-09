const { expect } = require('chai');
const { Builder } = require('selenium-webdriver');
const ChatBotPage = require('./chatbot_page');
const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');


describe("ChatBotPage", function() {
  let driver, page;

  beforeEach(async function() {
    let options = new chrome.Options();
    options.addArguments("--headless");
    driver = await new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .setChromeOptions(options)
  .build();
    page = await new ChatBotPage(driver).openChatbot();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("Verify the name and explain chatbots response", async function () {
    await page.clickChatWithBotBtn();
    const checkBotResponse = await page.getChatbotResponse();
    expect(checkBotResponse).includes("There’s lots I can show you but first please let me know your name.");
    await page.inputName('Ashar');
    await page.getNameMessage();
    await page.confirmName();
    await page.clickExplainButton();
    const checkExplainResponse = await page.getExplainResponse();
    expect(checkExplainResponse).includes("Basically, we chatbots are just software applications, like any other application you use on your computer. The important difference is that people interface with us using conversation. Shall I say more about this? 👀");
  });

  it("Verify the contact sales response", async function(){
    await page.clickContactSalesBtn();
    const checkSalesResponse = await page.getSalesResponse();
    expect(checkSalesResponse).includes("Can you please tell me your 📧 email?");
  });
});
