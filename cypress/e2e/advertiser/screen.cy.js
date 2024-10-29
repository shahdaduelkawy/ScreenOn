describe("Owner Requests", () => {
    beforeEach(() => {
      // Prevent uncaught exceptions from failing the test
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false; // Ignore the error
      });
  
      // Visit the application and perform login
      cy.visit("https://dev.screenon.app/");
      cy.get(".landing-nav-btn:last").click();
      cy.fixture('ValidAdvertiser').then(user => {
        cy.get("#email").type(user.email); // Correct email
        cy.get("#password").type(user.password); // Correct password
      })
      cy.get('[type="submit"]').click();
      
      // Navigate to 'Requests' page
      cy.contains("Screens").click();
  });

 it("Ensure Search for a screen using the form", () => {
    cy.get('.col-md-7 > .nav > :nth-child(2) > .nav-link').click();
    cy.get(':nth-child(3) > .form-control').select("A,B,C");
    cy.get(':nth-child(5) > .form-control').select("gamers");
    cy.get(':nth-child(7) > .form-control').select("digital");
    cy.get(':nth-child(9) > .form-control').select("adult");
    cy.get(':nth-child(10) > .form-control').type("100");
    cy.get(':nth-child(11) > .form-control').type("100");
    cy.get('.my-3 > .btn').click();
    cy.get(".d-flex", { timeout: 10000 })
    .should("be.visible")
    .and("contain", "Available Screens");
});
it.only("Ensure Search for a screen using blank form", () => {
    cy.get('.col-md-7 > .nav > :nth-child(2) > .nav-link').click();
    cy.get('.my-3 > .btn').click();


    cy.get('.col-md-7 > .nav > :nth-child(2) > .nav-link').click();

    cy.get(".text-danger", { timeout: 10000 })
    .should("be.visible")
    .and("contain", "The class audience field is required.")
    .and("contain", "The type audience field is required.")
    .and("contain", "The type field is required.")
    .and("contain", "The age audience field is required.")
    .and("contain", "The slots num field is required.")
    .and("contain", "The slot price field is required.");


});
it("Ensure Search for a screen using the description", () => {
    cy.get('form > .form-control').type("price is 200");
    cy.get('.mt-3 > .btn').click();
    cy.get(".d-flex", { timeout: 10000 })
    .should("be.visible")
    .and("contain", "Available Screens");
});
it("choose screen", () => {
    cy.get('form > .form-control').type("price is 200");
    cy.get('.mt-3 > .btn').click();
    cy.get('form > .btn').click();
    cy.get(':nth-child(1) > .col-lg-3 > .m-auto > .btn').click();
    cy.get('#date_from').type("2024-10-31");
    cy.get('#date_to').type("2024-11-11");
    cy.get('#chosen-hour').type("02:00");
    cy.get('#filter-btn').click();
    cy.get(':nth-child(1) > [data-col="4"]').click();
    cy.get('.px-4.py-3 > .px-4 > .mt-3').click();
    cy.get('.border-ornery-tangerine > img').click();
    cy.get('input[type="file"]').attachFile('red.png');
    cy.get('form.image-container > .btn > .fas').click();
    cy.get('.btn-ornery-tangerine').click();
    cy.get('.btn-ornery-tangerine').click();

});








});
  