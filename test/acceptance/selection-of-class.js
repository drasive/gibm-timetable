module.exports = {
  "Acceptance test - Selection of class influences displayed lessons (Spec. #6)" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible("body", 300)
      
      .waitForElementVisible("#profession", 5000) // Professions are loaded using AJAX
	  .click("#profession option[value='10']") // Select profession "Informatiker/innen"
	  .waitForElementVisible("#class", 5000) // Classes are loaded using AJAX
	  
	  .click("#class option[value='-']") // Select class "-" (nothing)
	  .waitForElementNotPresent("#class option[value != '-']", 500) // No lessons should be displayed
	  
	  .click("#class option[value='2467010']") // Select class "IAP 14-18 B"
	  .waitForElementVisible("#lessons", 5000) // Lessons are loaded using AJAX
	  .waitForElementVisible("#lessons #2586739", 200) // Subject "M431" should be displayed
	  .waitForElementVisible("#lessons #2586756", 200) // Subject "M301" should be displayed
	  .waitForElementVisible("#lessons #2586824", 200) // Subject "Allgemeinbildung" should be displayed
	  .waitForElementVisible("#lessons #2586875", 200) // Subject "M101" should be displayed
	  
	  .click("#class option[value='2467051']") // Select class "ISY 14-18 B"
	  .waitForElementVisible("#lessons", 5000) // Lessons are loaded using AJAX
	  .waitForElementVisible("#lessons #2552721", 200) // Subject "Allgemeinbildung" should be displayed
	  .waitForElementVisible("#lessons #2552755", 200) // Subject "M101" should be displayed
	  .waitForElementVisible("#lessons #2552823", 200) // Subject "Naturwissenschaftl. Grundlagen" should be displayed
	  .waitForElementVisible("#lessons #2552857", 200) // Subject "Turnen und Sport" should be displayed
	  
	  .click("#profession option[value='3']") // Select profession "Berufsmatura"
	  .waitForElementVisible("#class", 5000) // Classes are loaded using AJAX
	  
	  .click("#class option[value='2466850']") // Select class "BMI 14-18 A"
	  .waitForElementVisible("#lessons", 5000) // Lessons are loaded using AJAX
	  
	  .click("#class option[value='-']") // Select class "-" (nothing)
	  .waitForElementNotPresent("#class option[value != '-']", 500) // No lessons should be displayed
	  
	  .click("#class option[value='2466859']") // Select class "BMI 14-18 B"
	  .waitForElementVisible("#lessons", 5000) // Lessons are loaded using AJAX
	  .waitForElementVisible("#lessons #2469837", 200) // Subject "Mathematik" should be displayed
	  .waitForElementVisible("#lessons #2469871", 200) // Subject "Französisch" should be displayed
	  .waitForElementVisible("#lessons #2469922", 200) // Subject "Chemie" should be displayed
	  
      .end();
  }
};
