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
      cy.contains("Manage Advertisers").click();
      
              });
    it("Ensure Search is Functional", () => {

        // Add assertions if necessary
        cy.get('[name="query"]').type("testscreen");
    
        // Click the search button
        cy.get(".input-group-append .btn").click();
    
        cy.get(".text-center.text-nowrap", { timeout: 10000 }) // 10 seconds
        .should("be.visible")
        .and("contain", "testscreen");
      
      });
  
      it("suspend advertiser account ", () => {
        // Wait for the approve button to be visible and click
        cy.get('button[wire\\:click="suspend(22)"]', { timeout: 10000 })
          .should('be.visible') // Wait for the button to appear
          .click(); // Click the approve button
      cy.wait(1000);
    });

      it("Show Advertiser Account", () => {
       
        cy.wait(1000);
      // Click on the dropdown button to show options
      cy.get('.toggle-actions-dropdown', { timeout: 10000 })
      .first() // Ensure we're only clicking the first matching dropdown button
      .should('be.visible')
      .click(); // Click the dropdown button

  // Click the "Show" button within the dropdown
  cy.get('a.btn:contains("Show")', { timeout: 10000 })
      .first() // Click the first "Show" button found
      .should('be.visible')
      .click();
    });
    it("Block Advertiser Account", () => {
        cy.wait(1000);
    
        // Click on the dropdown button to show options
        cy.get('.toggle-actions-dropdown', { timeout: 10000 })
            .first() // Ensure we're only clicking the first matching dropdown button
            .should('be.visible')
            .click(); // Click the dropdown button
    
        // Click the "Show" button within the dropdown
        cy.get('a.btn:contains("Show")', { timeout: 10000 })
            .first() // Click the first "Show" button found
            .should('be.visible')
            .click();
    
        // Wait for the advertiser details to load (adjust the selector as necessary)
        cy.wait(1000); // Optional wait for the details to load
    
        // Click the "Block" button
        cy.get('button.btn.btn-dark:contains("Block")', { timeout: 10000 })
            .should('be.visible')
            .click(); // Click the Block button
    
            cy.wait(1000);
            cy.contains("Manage Advertisers").click();
    });
    

});

    
     
