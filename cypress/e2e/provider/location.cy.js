describe("Owner Requests", () => {
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
      
      // Navigate to 'Requests' page
      cy.contains("Location").click();
  });
it("Ensure Search is Functional", () => {
    // Type into the search input
    cy.get('[type="search"]')
      .type("test")
      .should("have.value", "test"); // Assert the input value

    // Click the search button
    cy.get(".input-group-append .btn").click();

    // Assert that the search results are displayed
    cy.get(".d-flex", { timeout: 10000 }) // Increase timeout if necessary
      .should("be.visible")
      .and("contain", "test");
});
it("Ensure Search with invalid word is Functional", () => {
    // Type into the search input
    cy.get('[type="search"]')
      .type("jnmdfkdk")
      .should("have.value", "jnmdfkdk"); // Assert the input value

    // Click the search button
    cy.get(".input-group-append .btn").click();

    // Assert that the search results are displayed
    cy.get(".d-flex", { timeout: 10000 }) // Increase timeout if necessary
      .should("be.visible")
      .and("not.contain", "jnmdfkdk");
});
it("add a new location successfully", () => {
    cy.get('.content-header > .d-flex > .btn').click(); 
    cy.get('#title').type("cairo university 20");
    cy.get('#search-box').type("cairo university{enter}"); // Press Enter after typing
    cy.get('#selectedCategory').select("Education");
    cy.get('#selectedType').select("University");
    cy.get('#phone').type("01113782264");
    cy.get('#email').type("shahd@gmail.com");
    cy.get('.btn-ornery-tangerine').click();
    cy.get(".alert", { timeout: 10000 }) // Increase timeout if necessary
    .should("be.visible")
    .and("contain", "Location created successfully.");
});
it("add a new location with a duplicate location name", () => {
    cy.get('.content-header > .d-flex > .btn').click(); 
    cy.get('#title').type("cairo university 20");
    cy.get('#search-box').type("cairo university{enter}"); // Press Enter after typing
    cy.get('#selectedCategory').select("Education");
    cy.get('#selectedType').select("University");
    cy.get('#phone').type("01113782264");
    cy.get('#email').type("shahd@gmail.com");
    cy.get('.btn-ornery-tangerine').click();
  cy.get(".text-danger", { timeout: 10000 })
        .should("be.visible")
        .and("contain", "Location name must be unique");
  });
it("edit location data", () => {
    cy.get(':nth-child(5) > .gap-10 > .actions-dropdown > .bg-transparent > img').click();
    cy.get(':nth-child(5) > .gap-10 > .actions-dropdown > .actions-dropdown-content > :nth-child(1) > .btn').click();
    cy.get('#title').clear().type("cairo university 22");
    cy.get('#phone').clear().type("01113722333");
    cy.get('#email').clear().type("shahdabd@gmail.com");
    cy.get('.btn-ornery-tangerine').click();
    cy.get(".alert", { timeout: 10000 }) // Increase timeout if necessary
    .should("be.visible")
    .and("contain", "Location updated successfully.");
  });
  it("delete location", () => {
    cy.get(':nth-child(5) > .gap-10 > .actions-dropdown > .bg-transparent > img').click();
    cy.get(':nth-child(5) > .gap-10 > .actions-dropdown > .actions-dropdown-content > :nth-child(2) > .m-0 > .btn').click();
    cy.get('.d-flex > .m-0 > .btn').click();
    cy.get(".alert", { timeout: 10000 }) // Increase timeout if necessary
    .should("be.visible")
    .and("contain", "Location deleted successfully.");
  });
});