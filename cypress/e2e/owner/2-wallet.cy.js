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
      
      cy.contains("Wallet").click();
  });

it("Ensure Add Wallet button is displayed", () => {
    
    cy.wait(1000);
    cy.get(':nth-child(5) > :nth-child(5) > .btn')
      .should('be.visible');
});
it.only("Ensure Add Wallet button is working", () => {
    
    cy.wait(1000);
   

    cy.get(':nth-child(8) > :nth-child(5) > .btn').click({ force: true });

});
it("Check Balance", () => {
    cy.wait(1000);

    cy.get('button[wire\\:click="showAdvertiserBalance(28)"]').click();
    cy.wait(3000);
});
it("Add Balance", () => {
    cy.wait(1000);

    cy.get('[data-target="#addBalance"]', { timeout: 10000 }).last().click({ force: true });

    cy.get('[name="add_balance"]').clear().type("1000");

    cy.get('[type="submit"]').last().click();

    cy.wait(4000);
    cy.get('.close').last().click();
});
it("Check Balance", () => {
    cy.wait(1000);

    cy.get('button[wire\\:click="showAdvertiserBalance(28)"]').click();

    cy.wait(3000);
});
it("Add Balance", () => {
    cy.wait(1000);

    cy.get('[data-target="#addBalance"]', { timeout: 10000 }).last().click({ force: true });

    cy.get('[name="add_balance"]').clear().type("-1000");

    cy.get('[type="submit"]').last().click();

    cy.get('#addBalance') 
      .should('be.visible'); 
    cy.get('body') 
      .contains('The add balance field must be at least 0.', { timeout: 10000 }) 
      .should('be.visible'); 
    cy.get('body').then((body) => {
        console.log(body.html()); 
    });
    cy.wait(4000);
    cy.get('.close').last().click();
});





});
