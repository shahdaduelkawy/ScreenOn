describe("Owner Requests", () => {
    beforeEach(() => {
      // Prevent uncaught exceptions from failing the test
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false; // Ignore the error
      });
  
      // Visit the application and perform login
      cy.visit("https://dev.screenon.app/");
      cy.get(".landing-nav-btn:last").click();
      cy.fixture('ValidOwner').then(user => {
        cy.get("#email").type(user.email); // Correct email
        cy.get("#password").type(user.password); // Correct password
      })
      cy.get('[type="submit"]').click();
      
      // Navigate to 'Requests' page
      cy.contains("Screen Properties").click();
  });

  it("Ensure Search is Functional", () => {
    // Type into the search input
    cy.get('[type="search"]').type("class");
  
    // Click the search button
    cy.get('[type="submit"]').first().click();
  
    // Wait for the results to be visible and assert they contain "test slot"
    cy.get(".atributes-menu", { timeout: 10000 }) // 10 seconds timeout
      .should("be.visible")
      .and("contain", "class");
});
it('should display the attribute description correctly', () => {
    cy.get('.actions .fa-info').first().click();

    // Step 3: Verify the Presence of the Attribute Description
    cy.get('.description').should('be.visible');

    // Step 4: Validate the Content of the Attribute Description
    cy.get('.description p').first().should('have.text', 'Description');
    cy.get('.description p').eq(1).should('have.text', 'Audience categorized by their class level.');

    // Step 5: Verify the Close Icon is Displayed
    cy.get('.close').should('be.visible');
});
it('search at the audience', () => {
    // Step 1: Navigate to the Show Attribute Page
    cy.visit('https://dev.screenon.app/Owner/attributes/show/1');
// Type into the search input
cy.get('[type="search"]').type("B");
  
// Click the search button
cy.get('[type="submit"]').first().click();

// Wait for the results to be visible and assert they contain "test slot"
cy.get(".table-responsive", { timeout: 10000 }) // 10 seconds timeout
  .should("be.visible")
  .and("contain", "B");
   



});
 it('Edit Audience name', () => {
        // Step 1: Navigate to the Show Attribute Page
        cy.visit('https://dev.screenon.app/Owner/attributes/show/1');

        // Step 2: Click the Edit Icon
        cy.get('.fa-edit').first().click();

        cy.get('#attribute_value').type(",C");
        cy.get('[type="submit"]').click();
        cy.get(".table-responsive", { timeout: 10000 }) // 10 seconds timeout
        .should("be.visible")
        .and("contain", "C");
    });
    it('add Audience', () => {
        // Step 1: Navigate to the Show Attribute Page
        cy.visit('https://dev.screenon.app/Owner/attributes/show/1');
        cy.get('.btn-ornery-tangerine').click();
        cy.get('#attribute_value').type("test");
        cy.get('[type="submit"]').click();
        cy.get(".table-responsive", { timeout: 10000 }) // 10 seconds timeout
        .should("be.visible")
        .and("contain", "test");
    });
    it('delete Audience', () => {
      // Step 1: Navigate to the Show Attribute Page
      cy.visit('https://dev.screenon.app/Owner/attributes/show/1');
      cy.get('.fa-trash').last().click();
  });
    it('add attribute', () => {
        cy.get('[type="button"]').first().click();
        cy.get('#attribute_name').type("test");
        cy.get('#description').type("test");
        cy.get('[type="submit"]').first().click();


    });
    it('add attribute with an empty description', () => {
        cy.get('[type="button"]').first().click();
        cy.get('#attribute_name').type("test");
        cy.get('[type="submit"]').first().click();

    });
    it('delete attribute', () => {
      cy.get(':nth-child(1) > .actions > form > button > img').first().click({ force: true });
    });
    


    
});





