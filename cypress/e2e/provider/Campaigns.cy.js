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
      cy.contains("Campaigns Approvals").click();
  });
it("Show Content Campaign button", () => {
    // Click the "Show Content" button
    cy.get('a.btn.btn-ornery-tangerine-outline.br-2').first().click();
  
    
  });
  it("Accept Campaign button", () => {
    // Click the "Show Content" button
    cy.get('a.btn.btn-ornery-tangerine-outline.br-2').last().click();

    // Then, click the "Accept Campaign" button that opens the modal
    cy.get('button[data-bs-target="#acceptCampaignModal"]').click();
  
    // Assert that the modal opens successfully
    cy.get('#acceptCampaignModal').should('be.visible');
  
  // Click the first submit button in the modal
  cy.get('#acceptCampaignModal [type="submit"]').first().click();
  
});
  it("Reject Campaign button", () => {
    cy.get('a.btn.btn-ornery-tangerine-outline.br-2').last().click();
     // Then, click the "reject Campaign" button that opens the modal
     cy.get('button[data-bs-target="#rejectCampaignModal"]').click();
  
     // Assert that the modal opens successfully
     cy.get('#rejectCampaignModal').should('be.visible');
name="reason"
cy.get('[name="reason"]').type("bad offer");

    // Click the first submit button in the modal
  cy.get('#rejectCampaignModal [type="submit"]').first().click();
   


  });
  it("Delete Campaign button", () => {
    // Wait for the approve button to be visible and click
    cy.get('button.delete-btn').first().click();
});
  });