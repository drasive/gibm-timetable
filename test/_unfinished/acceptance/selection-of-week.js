module.exports = {
  "Acceptance test - Selection of profession (Spec 5)" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible('body', 300)
      
      .waitForElementVisible('#profession', 3000) // Wait for professions to load
	  .click("#profession option[value='10']") // Select "Informatiker/innen"
      
      .waitForElementVisible('#class', 3000) // Wait for classes to load
	  .click("#class option[value='2467010']") // Select "IAP 14-18 B"
      
      .waitForElementVisible('#lessons-result', 3000) // Wait for lessons to load
      
      .end();
  }
};
