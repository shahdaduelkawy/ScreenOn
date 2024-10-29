it("Sign up successfully", () => {
  
  // Prevent uncaught exceptions from failing the test
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignore the error
  });
  
  cy.visit("https://dev.screenon.app/");
  
  // Click the first matching landing-nav-btn
  cy.get(".landing-nav-btn:first").click();
  
  // Fill out the sign-up form
  cy.get("#name").type("shahd"); // Correct name
  cy.get("#email").type("Manger@gmail.com"); // Correct email
  cy.get("#phone").type("01113782264"); // Correct phone
  cy.get("#password").type("shahd12345"); // Correct password
  cy.get("#password-confirm").type("shahd12345"); // Correct confirm password
  cy.get('[name="type_id"]').select("Screen Manger"); // Correct type
  cy.get('[name="country_id"]').select("Egypt"); // Correct country
  
  // Submit the form
  cy.get('[type="submit"]').click();
  
  // Check for successful signup
  cy.url().should("include", "/status"); // Successful login
  
 
 });
it("Error message is thrown after Hiting Register Button", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false; // Ignore the error
    });
  
    cy.visit("https://dev.screenon.app/");
    cy.get(".landing-nav-btn:first").click();
    cy.get("#name").type("shahd"); //correct name
    cy.get("#email").type("Manger@gmail.com"); //iccorrect email
    cy.get("#phone").type("8965446"); //iccorrect phone
    cy.get("#password").type("shahd1"); //iccorrect password
    cy.get("#password-confirm").type("shahd1"); //iccorrect confirm password
    cy.get('[name="type_id"]').select("Screen Manger"); //correct type
    cy.get('[name="country_id"]').select("Egypt"); //correct country
    cy.get('[type="submit"]').click();
    cy.wait(100);
    cy.get(".invalid-feedback", { timeout: 10000 }).eq(0)
      .should("be.visible")
      .and("contain", "The email has already been taken.");
      cy.get(".invalid-feedback", { timeout: 10000 }).eq(1)
      .should("be.visible")
      .and("contain", "The phone field must be between 11 and 15 digits.");
      cy.get(".invalid-feedback", { timeout: 10000 }).then($elements => {
        // Check for the first message
        if ($elements.eq(1).text().includes("The password field confirmation does not match.")) {
          cy.wrap($elements.eq(1))
            .should("be.visible")
            .and("contain", "The password field confirmation does not match.");
        } 
        // Check for the second message
        else if ($elements.eq(2).text().includes("The password field must be at least 8 characters.")) {
          cy.wrap($elements.eq(2))
            .should("be.visible")
            .and("contain", "The password field must be at least 8 characters.");
        }});  
 });
it("should toggle password visibility when clicking the eye icon", () => {
    // Ignore uncaught exceptions in the test
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false; // Ignore the error
    });
    
    cy.visit("https://dev.screenon.app/");
    cy.get(".landing-nav-btn:first").click();
  
    const passwordToType = "shahd12345"; // Use the correct password
    cy.get("#password")
      .type(passwordToType) // Typing the correct password
      .should("have.value", passwordToType); // Assertion matches the typed value
  
    // Wait for the eye icon to become visible before clicking
    cy.get(".square-24.pos-absolute.top-22.left-90.eye", { timeout: 10000 })
      .should("be.visible") // Ensure the icon is visible
      .first() // Click the first matching eye icon
      .click();
    
    // Check if the password is now visible (type changes to 'text')
    cy.get("#password").invoke("attr", "type").should("equal", "text");

    const passwordconToType = "shahd12345"; // Use the correct password
    cy.get("#password-confirm")
      .type(passwordconToType) // Typing the correct password
      .should("have.value", passwordconToType); // Assertion matches the typed value
  
    // Wait for the eye icon to become visible before clicking
    cy.get(".square-24.pos-absolute.top-22.left-90.eye", { timeout: 10000 })
      .should("be.visible") // Ensure the icon is visible
      .last() // Click the first matching eye icon
      .click();
    
    // Check if the password is now visible (type changes to 'text')
    cy.get("#password-confirm").invoke("attr", "type").should("equal", "text");
 });
 it.only("Sign up with a blank field", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignore the error
  });

  cy.visit("https://dev.screenon.app/");
  cy.get(".landing-nav-btn:first").click();

  cy.get('[type="submit"]').click();
});