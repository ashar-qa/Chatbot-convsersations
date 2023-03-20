const {By, until, Key} = require("selenium-webdriver");
const { elementTextContains } = require("selenium-webdriver/lib/until");
require("chromedriver");

class ChatBotPage {
  constructor(driver) {
    this.driver = driver;
    this.chatbotIcon = By.css('#sntch_button');
    this.chatbotIframe = By.css('#sntch_iframe');
    this.salesBtn = By.css('.owl-item.active:nth-child(2)');
    this.salesMessage = By.css('.message.ng-star-inserted:nth-child(5)');
    this.chatBotBtn = By.css('.owl-item.active:nth-child(1)');
    this.chatMessage = By.css('.message.ng-star-inserted:nth-child(5)');
    this.inputChat = By.css('[data-test="input-chat"]');
    this.nameMessage = By.css('.message.ng-star-inserted:nth-child(7)');
    this.yesButton = By.css('[data-test="message-suggested-btn"]:nth-child(1)');
    this.explainButton = By.css('[data-test="message-suggested-btn"]:nth-child(1)');
    this.explainResponse = By.css('.message.ng-star-inserted:nth-child(13)');
  }

  async openChatbot() {
    await this.driver.get('https://snatchbot.me/');
    await this.driver.wait(until.elementLocated(this.chatbotIcon), 30000);
    await this.driver.manage().window().maximize();
    const button = await this.driver.findElement(this.chatbotIcon);
    await button.click();
    const iframe = await this.driver.wait(until.elementLocated(this.chatbotIframe), 30000);
    await this.driver.switchTo().frame(iframe);
    return this;
  }

  async clickContactSalesBtn() {
      const salesBtn = await await this.driver.wait(until.elementLocated(this.salesBtn), 30000);
      await this.driver.wait(until.elementTextContains(salesBtn, "😊 Contact Sales"), 30000);
      await salesBtn.click();
  }

  async getSalesResponse() {
      const salesele = await this.driver.wait(until.elementLocated(this.salesMessage), 30000);
      await this.driver.wait(until.elementTextContains(salesele, "Can you please tell me your 📧 email?"), 30000);
      return salesele.getText();
  }

  async clickChatWithBotBtn() {
    const chatBotBtn = await this.driver.wait(until.elementLocated(this.chatBotBtn), 30000);
    await this.driver.wait(until.elementTextContains(chatBotBtn, "🤖 Chat With a Bot"), 30000);
    await chatBotBtn.click();
  }

  async getChatbotResponse() {
    const chatel = await this.driver.wait(until.elementLocated(this.chatMessage), 30000);
    await this.driver.wait(until.elementTextContains(chatel, "There’s lots I can show you but first please let me know your name."), 30000);
    return chatel.getText();
  }

  async inputName(name) {
    await this.driver.findElement(this.inputChat, 30000).sendKeys(name, Key.ENTER);
  }

  async getNameMessage() {
    const nameel = await this.driver.wait(until.elementLocated(this.nameMessage), 30000);
    await this.driver.wait(until.elementTextContains(nameel, "Hi Ashar! Good to chat to you. Did I get your name right?"), 30000);
    return nameel.getText();
  }

  async confirmName(){
    const yesButton = await this.driver.wait(until.elementLocated(this.yesButton), 30000);
    await this.driver.wait(until.elementTextContains(yesButton, "Yes"), 30000);
    await yesButton.click();
  }

  async clickExplainButton(){
    const explainButton = await this.driver.wait(until.elementLocated(this.explainButton), 30000);
    await this.driver.wait(until.elementTextContains(explainButton, "Explain chatbots"), 30000);
    await explainButton.click();
  }

  async getExplainResponse(){
    const explainele = await this.driver.wait(until.elementLocated(this.explainResponse), 50000);
    await this.driver.wait(until.elementTextContains(explainele, "Basically, we chatbots are just software applications"), 30000);
    return explainele.getText();
  }
}

module.exports = ChatBotPage;
