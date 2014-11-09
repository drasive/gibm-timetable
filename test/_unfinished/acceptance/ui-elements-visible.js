module.exports = {
  "Acceptance test - Selection of profession (Spec. #5)" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible('body', 300)
      
      .waitForElementVisible('#profession', 5000) // Professions are loaded using AJAX
	  
	  .click("#profession option[value='-']") // Select "-" (nothing)
	  .waitForElementNotVisible('#class-container', 500) // Class selection should be hidden
	  .waitForElementNotVisible('#lesson-container', 500) // Lessons should be hidden
	  
	  .click("#profession option[value='10']") // Select "Informatiker/innen"
	  .waitForElementVisible('#class', 5000) // Classes are loaded using AJAX
	  
	  .click("#class option[value='-']") // Select "-" (nothing)
	  .waitForElementNotVisible('#class-container', 500) // Class selection should be hidden
	  .waitForElementNotVisible('#lesson-container', 500) // Lessons should be hidden
	  
	  .waitForElementNotVisible('#lesson-container', 500) // Wait for professions to be hidden
	  
	  .click("#profession option[value='10']") // Select "Informatiker/innen"
      
      .waitForElementVisible('#class', 3000) // Wait for classes to load
	  ..waitForElementVisible("#class option[value='2467010']") // Select "IAP 14-18 B"
      
      .waitForElementVisible('#lessons-result', 3000) // Wait for lessons to load
      
      .end();
  }
};
