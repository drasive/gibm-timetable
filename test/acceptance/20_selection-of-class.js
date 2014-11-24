module.exports = {
  "Acceptance test - Selection of class displays correct lessons (Spec. #6, #7)" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible("body", 1000)
      
      .waitForElementVisible("#profession option[value = '10']", 10000) // Professions "Informatiker/innen" should be selectable
      .click("#profession option[value = '10']") // Select profession "Informatiker/innen"
      .waitForElementVisible("#class option[value = '2467010']", 10000) // Classes "IAP 14-18 B" should be selectable
      
      .click("#class option[value = '-']") // Select class "-" (nothing)
      .waitForElementNotVisible("#lessons-container", 1000) // No lessons should be displayed
      
      .click("#class option[value = '2467010']"); // Select class "IAP 14-18 B"
    
    // TODO: Implement dynamic solution (issue #2)
    browser.waitForElementVisible("#week-current", 10000); // Week selection should be available
    for (var i = 0 ; i < 3; i++) {
      browser.click("#week-previous"); // Go to previous week until current week is 45 - 2014
    }
    
    browser
      .waitForElementVisible("#lessons-result #l2586739", 10000) // Subject "M431" should be displayed
      .waitForElementVisible("#lessons-result #l2586756", 50) // Subject "M301" should be displayed
      .waitForElementVisible("#lessons-result #l2586824", 50) // Subject "Allgemeinbildung" should be displayed
      .waitForElementVisible("#lessons-result #l2586875", 50) // Subject "M101" should be displayed
      
      .click("#class option[value = '2467051']") // Select class "ISY 14-18 B"
      .waitForElementVisible("#lessons-result #l2552721", 10000) // Subject "Allgemeinbildung" should be displayed
      .waitForElementVisible("#lessons-result #l2552755", 50) // Subject "M101" should be displayed
      .waitForElementVisible("#lessons-result #l2552823", 50) // Subject "Naturwissenschaftl. Grundlagen" should be displayed
      .waitForElementVisible("#lessons-result #l2552857", 50) // Subject "Turnen und Sport" should be displayed
      
      .click("#profession option[value = '3']") // Select profession "Berufsmatura"
      .waitForElementVisible("#class option[value = '2466850']", 10000) // Class "BMI 14-18 A" should be selectable
      
      .click("#class option[value = '2466850']") // Select class "BMI 14-18 A"
      .waitForElementVisible("#lessons-result #l2469956", 10000) // Subject "Deutsch" should be displayed
      .waitForElementVisible("#lessons-result #l2470007", 50) // Subject "Chemie" should be displayed
      
      .click("#class option[value = '-']") // Select class "-" (nothing)
      .waitForElementNotVisible("#lessons-container", 1000) // No lessons should be displayed
      
      .click("#class option[value = '2466859']") // Select class "BMI 14-18 B"
      .waitForElementVisible("#lessons-result #l2469837", 10000) // Subject "Mathematik" should be displayed
      .waitForElementVisible("#lessons-result #l2469871", 50) // Subject "Französisch" should be displayed
      .waitForElementVisible("#lessons-result #l2469922", 50) // Subject "Chemie" should be displayed
      
      .end();
  }
};
