module.exports = {
  "Acceptance test - Selection of profession influences selectable classes (Spec. #5)" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible("body", 300)
      
      .waitForElementVisible("#profession", 5000) // Professions are loaded using AJAX
	  
	  .click("#profession option[value='-']") // Select profession "-" (nothing)
	  .waitForElementNotPresent("#class option[value != '-']", 500) // No class should be selectable
	  
	  .click("#profession option[value='10']") // Select profession "Informatiker/innen"
	  .waitForElementVisible("#class", 5000) // Classes are loaded using AJAX
	  .waitForElementVisible("#class option[value = '2467010']", 5) // Class "IAP 14-18 B" should be selectable
	  .waitForElementVisible("#class option[value = '2522819']", 5) // Class "IBE 14-18 B" should be selectable
	  .waitForElementVisible("#class option[value = '2467051']", 5) // Class "ISY 14-18 B" should be selectable
	  
	  .click("#profession option[value='15']") // Select profession "Metallbauer/innen"
	  .waitForElementVisible("#class", 5000) // Classes are loaded using AJAX
	  .waitForElementVisible("#class option[value = '2467116']", 200) // Class "MB 14-18 B" should be selectable
	  
	  .click("#profession option[value='-']") // Select profession "-" (nothing)
	  .waitForElementNotPresent("#class option[value != '-']", 500) // No class should be selectable
	  
	  .click("#profession option[value='3']") // Select profession "Berufsmatura"
	  .waitForElementVisible("#class", 5000) // Classes are loaded using AJAX
	  .waitForElementVisible("#class option[value = '2466850']", 200) // Class "BMI 14-18 A" should be selectable
	  .waitForElementVisible("#class option[value = '2466859']", 200) // Class "BMI 14-18 B" should be selectable
	  
      .end();
  }
};
