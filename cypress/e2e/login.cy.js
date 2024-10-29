it("login successfuly", () => {
  // Prevent uncaught exceptions from failing the test
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignore the error
  });

  cy.visit("https://dev.screenon.app/");

  // Click the first matching landing-nav-btn
  cy.get(".landing-nav-btn:last").click();
  cy.fixture('ValidProvider').then(user => {
    cy.get("#email").type(user.email); // Correct email
    cy.get("#password").type(user.password); // Correct password
  })
  cy.get('[type="submit"]').click();
  cy.url().should("include", "/home"); //Successful login
  cy.contains("Logout").click();
  cy.wait(100);
});
it("Error message is thrown after Hiting Login Button", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignore the error
  });

  cy.visit("https://dev.screenon.app/");
  cy.get(".landing-nav-btn:last").click();

  cy.get("#email").type("provider@gmail.com"); //incorrect email
  cy.get("#password").type("1234567"); //incorrect password
  cy.get('[type="submit"]').click();
  cy.get(".invalid-feedback", { timeout: 10000 })
    .should("be.visible")
    .and("contain", "These credentials do not match our records.");
  cy.wait(100);
});
it("Verify that user logs out if token expires ", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignore the error
  });

  cy.visit("https://dev.screenon.app/");
  cy.get(".landing-nav-btn:last").click();

  cy.fixture('ValidProvider').then(user => {
    cy.get("#email").type(user.email); // Correct email
    cy.get("#password").type(user.password); // Correct password
  })
  cy.get('[type="submit"]').click();
  cy.wait(1000);
  // Assert that the user is redirected to the navigation page
  cy.url().should("include", "/home"); //Successful login
  cy.wait(1000);
  cy.clearCookies();
  cy.wait(500);
  cy.reload();
  cy.wait(2000);
  cy.url({ timeout: 10000 }).should("eq", "https://dev.screenon.app/login");
});
it("should toggle password visibility when clicking the eye icon", () => {
  // Ignore uncaught exceptions in the test
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignore the error
  });

  // Visit the application and navigate to the login page
  cy.visit("https://dev.screenon.app/");
  cy.get(".landing-nav-btn:last").click();

  // Type the correct password in the input field
  const passwordToType = "testpassword";
  cy.get("#password")
    .type(passwordToType) // Typing the correct password
    .should("have.value", passwordToType); // Assertion matches the typed value
  cy.wait(500);

  // Wait for the eye icon to become visible before clicking
  cy.get(".square-24.pos-absolute.top-22.left-90.eye")
    .should("be.visible") // Ensure the icon is visible
    .click();
  cy.wait(500);

  // Check if the password is now visible (type changes to 'text')
  cy.get("#password").invoke("attr", "type").should("equal", "text");
});
it("Login with a blank field", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false; // Ignore the error
    });
  
    cy.visit("https://dev.screenon.app/");
    cy.get(".landing-nav-btn:last").click();
  
    cy.get('[type="submit"]').click();
  });