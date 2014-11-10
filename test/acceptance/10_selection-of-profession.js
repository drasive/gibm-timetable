module.exports = {
  "Acceptance test - Selection of profession influences selectable classes (Spec. #5)" : function (browser) {
    browser
      .url("http://localhost:8080/index.html")
      .waitForElementVisible("body", 500)
      
      .waitForElementVisible("#profession option[value = '10']", 5000) // Professions "Informatiker/innen" should be selectable
      
      .click("#profession option[value = '-']") // Select profession "-" (nothing)
      .waitForElementNotVisible("#class", 500) // No class should be selectable
      
      .click("#profession option[value = '10']") // Select profession "Informatiker/innen"
      .waitForElementVisible("#class option[value = '2467010']", 5000) // Class "IAP 14-18 B" should be selectable
      .waitForElementVisible("#class option[value = '2522819']", 50) // Class "IBE 14-18 B" should be selectable
      .waitForElementVisible("#class option[value = '2467051']", 50) // Class "ISY 14-18 B" should be selectable
      
      .click("#profession option[value = '15']") // Select profession "Metallbauer/innen"
      .waitForElementVisible("#class option[value = '2467116']", 5000) // Class "MB 14-18 B" should be selectable
      
      .click("#profession option[value = '-']") // Select profession "-" (nothing)
      .waitForElementNotVisible("#class", 500) // No class should be selectable
      
      .click("#profession option[value = '3']") // Select profession "Berufsmatura"
      .waitForElementVisible("#class option[value = '2466850']", 5000) // Class "BMI 14-18 A" should be selectable
      .waitForElementVisible("#class option[value = '2466859']", 50) // Class "BMI 14-18 B" should be selectable
      
      .end();
  }
};
