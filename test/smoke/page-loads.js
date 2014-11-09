module.exports = {
  "Smoke test - Page loads" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible("body", 500)
      
      .waitForElementVisible(".content", 5000)
      
      .end();
  }
};
