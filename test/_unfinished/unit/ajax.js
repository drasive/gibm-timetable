module.exports = {
  "Smoketest - Page loads" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
	  .waitForElementVisible('body', 300)
	  
      .waitForElementVisible('#content', 3000)
      
      .end();
  }
};
