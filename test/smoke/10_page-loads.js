module.exports = {
  "Smoke test - Page loads" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible("body", 1000)
      
      .waitForElementVisible(".content", 10000)
      
      .end();
  }
};
