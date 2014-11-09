module.exports = {
  "Acceptance test - Selection of class influences displayed lessons (Spec. #6)" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible("body", 300)
      
      .waitForElementVisible("#profession option[value = '10']", 5000) // Professions are loaded using AJAX
      .click("#profession option[value = '10']") // Select profession "Informatiker/innen"
	  .waitForElementVisible("#class option[value = '2467010']", 5000) // Classes are loaded using AJAX
	  
      .click("#class option[value = '-']") // Select class "-" (nothing)
      .waitForElementNotVisible("#lessons-container", 500) // No lessons should be displayed
      
      .click("#class option[value = '2467010']") // Select class "IAP 14-18 B"
      .waitForElementVisible("#lessons-result", 5000) // Lessons are loaded using AJAX
      .waitForElementVisible("#lessons-result #l2586739", 500) // Subject "M431" should be displayed
      .waitForElementVisible("#lessons-result #l2586756", 500) // Subject "M301" should be displayed
      .waitForElementVisible("#lessons-result #l2586824", 500) // Subject "Allgemeinbildung" should be displayed
      .waitForElementVisible("#lessons-result #l2586875", 500) // Subject "M101" should be displayed
      
      .click("#class option[value = '2467051']") // Select class "ISY 14-18 B"
      .waitForElementVisible("#lessons-result", 5000) // Lessons are loaded using AJAX
      .waitForElementVisible("#lessons-result #l2552721", 500) // Subject "Allgemeinbildung" should be displayed
      .waitForElementVisible("#lessons-result #l2552755", 500) // Subject "M101" should be displayed
      .waitForElementVisible("#lessons-result #l2552823", 500) // Subject "Naturwissenschaftl. Grundlagen" should be displayed
      .waitForElementVisible("#lessons-result #l2552857", 500) // Subject "Turnen und Sport" should be displayed
      
      .click("#profession option[value = '3']") // Select profession "Berufsmatura"
      .waitForElementVisible("#class option[value = '2466850']", 5000) // Classes are loaded using AJAX
      
      .click("#class option[value = '2466850']") // Select class "BMI 14-18 A"
      .waitForElementVisible("#lessons-result", 5000) // Lessons are loaded using AJAX
	  .waitForElementVisible("#lessons-result #l2469956", 500) // Subject "Deutsch" should be displayed
      .waitForElementVisible("#lessons-result #l2470007", 500) // Subject "Chemie" should be displayed
      
      .click("#class option[value = '-']") // Select class "-" (nothing)
      .waitForElementNotVisible("#lessons-container", 500) // No lessons should be displayed
      
      .click("#class option[value = '2466859']") // Select class "BMI 14-18 B"
      .waitForElementVisible("#lessons-result", 5000) // Lessons are loaded using AJAX
      .waitForElementVisible("#lessons-result #l2469837", 500) // Subject "Mathematik" should be displayed
      .waitForElementVisible("#lessons-result #l2469871", 500) // Subject "Französisch" should be displayed
      .waitForElementVisible("#lessons-result #l2469922", 500) // Subject "Chemie" should be displayed
      
      .end();
  }
};
