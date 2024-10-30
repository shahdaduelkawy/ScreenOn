describe("User Authentication Tests", () => {
  beforeEach(() => {
    // Prevent uncaught exceptions from failing the test
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false; // Ignore the error
    });

    // Visit the application and perform login
    cy.visit("https://dev.screenon.app/");
    cy.get(".landing-nav-btn:last").click();
    cy.fixture('ValidProvider').then(user => {
      cy.get("#email").type(user.email); // Correct email
      cy.get("#password").type(user.password); // Correct password
    })
    cy.get('[type="submit"]').click();
  });
  it("edit user profile successfully", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);
    cy.get('[name="name"]')
      .clear() // This clears the field
      .type("Advertiser"); // Then types "Advertiser"
    cy.get('[name="email"]')
      .clear() // This clears the field
      .type("ScreenManger@gmail.com"); // Then types "Advertiser"
    cy.get('[name="phone"]')
      .clear() // This clears the field
      .type("01111111111"); // Then types "Advertiser"

    cy.get('[name="country_id"]').select("Egypt"); //correct type
    cy.get("#submit-editing").click();
    cy.get(".alert.alert-success", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Profile updated successfully.");
  });
  it("edit user profile with blank fields", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);

    // Clear the fields
    cy.get('[name="name"]').clear();
    cy.get('[name="email"]').clear();
    cy.get('[name="phone"]').clear();
    cy.wait(1000);

    // Submit the form
    cy.get("#submit-editing").click();

    // Check for the alert box
    cy.get(".alert.alert-danger").should("be.visible"); // Ensure the alert box is visible

    // Check for the required field validation messages
    cy.get(".alert.alert-danger ul li").should("have.length", 3); // Ensure there are three items
    cy.get(".alert.alert-danger ul li")
      .eq(0)
      .should("contain", "The name field is required.");
    cy.get(".alert.alert-danger ul li")
      .eq(1)
      .should("contain", "The email field is required.");
    cy.get(".alert.alert-danger ul li")
      .eq(2)
      .should("contain", "The phone field is required.");
  });
  it("edit user profile with invalid data", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);
    cy.get('[name="name"]')
      .clear() // This clears the field
      .type("a#5"); // Then types "Advertiser"
    cy.get('[name="email"]')
      .clear() // This clears the field
      .type("advertisergmail.com"); // Then types "Advertiser"
    cy.get('[name="phone"]')
      .clear() // This clears the field
      .type("96556"); // Then types "Advertiser"

    cy.get('[name="country_id"]').select("Egypt"); //correct type
    cy.get("#submit-editing").click();
    cy.get(".alert.alert-danger ul li").should("have.length", 1); // Ensure there's one item
    cy.get(".alert.alert-danger ul li").should(
      "contain",
      "The email field must be a valid email address."
    );
  });
  it("edit user profile with already taken email", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);

    cy.get('[name="email"]')
      .clear() // This clears the field
      .type("Manager@gmail.com"); // Then types "Advertiser"

    cy.get('[name="country_id"]').select("Egypt"); //correct type
    cy.get("#submit-editing").click();
    cy.get(".alert.alert-danger ul li").should("have.length", 1); // Ensure there's one item
    cy.get(".alert.alert-danger ul li").should(
      "contain",
      "The email has already been taken."
    );
  });
  it("change password successfully", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);
    cy.get("#change-password").click();
    cy.get('[name="current_password"]').type("12345678");
    cy.get('[name="password"]').type("12345678");
    cy.get('[name="password_confirmation"]').type("12345678");
    cy.get("#confirm-password").click();
    cy.get(".alert.alert-success", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Password updated successfully.");
  });
  it("change password wrong current password", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);
    cy.get("#change-password").click();
    cy.get('[name="current_password"]').type("shahd123");
    cy.get('[name="password"]').type("12345678");
    cy.get('[name="password_confirmation"]').type("12345678");
    cy.get("#confirm-password").click();
    cy.get(".alert.alert-danger ul li", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "The provided current password is incorrect.");
  });
  it("change password with mismatching new passwords", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);
    cy.get("#change-password").click();
    cy.get('[name="current_password"]').type("12345678");
    cy.get('[name="password"]').type("12345678");
    cy.get('[name="password_confirmation"]').type("12345595");
    cy.get("#confirm-password").click();
    cy.get(".alert.alert-danger ul li", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "The new password confirmation does not match.");
  });
  it("hange password with minimum length of new password", () => {
    cy.get(".navbar-nav.navbar-list").click();
    cy.get("#edit-profile").click();
    cy.wait(1000);
    cy.get("#change-password").click();
    cy.get('[name="current_password"]').type("12345678");
    cy.get('[name="password"]').type("123456");
    cy.get('[name="password_confirmation"]').type("123456");
    cy.get("#confirm-password").click();
    cy.get(".alert.alert-danger ul li", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "The password field must be at least 8 characters.");
  });
});
