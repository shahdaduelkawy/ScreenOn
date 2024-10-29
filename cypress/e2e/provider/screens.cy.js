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
      cy.contains("Screens").click();
  });
  it("Ensure Search is Functional", () => {
    // Type into the search input
    cy.get('[type="search"]')
      .type("screen")
      .should("have.value", "screen"); // Assert the input value

    // Click the search button
    cy.get(".input-group-append .btn").click();

    // Assert that the search results are displayed
    cy.get(".d-flex", { timeout: 10000 }) // Increase timeout if necessary
      .should("be.visible")
      .and("contain", "screen");
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
it("add a new screen succefully", () => {
  cy.contains("Add Screen").click();
  cy.get("#screen_name").type("screen sport");
  cy.get("#description").type("screen sport!!!!!!!!!!!");
  cy.get("#location").find('option[value="4"]').should("have.text", "Pyramids Gardens, Al Haram, Egypt");
  cy.get("#location").select("4");
  cy.get("#pac-input").type("355 Elgiesh Rd, Al Haram, Giza Governorate 3510204, Egypt");
  cy.get("#ip").type("192.168.1.18");
  cy.get("#chosen-hour").type("02:00");
  cy.get('[name="close_to"]').type("02:00");
cy.get('[type="submit"]').click();
cy.get(".alert", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Added Successfully");



});
it("add a new screen with a duplicate screen name", () => {
  cy.contains("Add Screen").click();
  cy.get("#screen_name").type("screen sport");
  cy.get("#description").type("screen sport!!!!!!!!!!!");
  cy.get("#location").find('option[value="4"]').should("have.text", "Pyramids Gardens, Al Haram, Egypt");
  cy.get("#location").select("4");
  cy.get("#pac-input").type("355 Elgiesh Rd, Al Haram, Giza Governorate 3510204, Egypt");
  cy.get("#ip").type("192.168.1.18");
  cy.get("#chosen-hour").type("02:00");
  cy.get('[name="close_to"]').type("02:00");
cy.get('[type="submit"]').click();
cy.contains("Screen name must be unique").click();
cy.get(".text-danger", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Screen name must be unique");


});
it("add a new screen with description less than 10 characters", () => {
    cy.contains("Add Screen").click();
    cy.get("#screen_name").type("screen sport");
    cy.get("#description").type("screen");
    cy.get("#location").find('option[value="4"]').should("have.text", "Pyramids Gardens, Al Haram, Egypt");
    cy.get("#location").select("4");
    cy.get("#pac-input").type("355 Elgiesh Rd, Al Haram, Giza Governorate 3510204, Egypt");
    cy.get("#ip").type("192.168.1.18");
    cy.get("#chosen-hour").type("02:00");
    cy.get('[name="close_to"]').type("02:00");
  cy.get('[type="submit"]').click();
  cy.contains("Screen name must be unique").click();
  cy.get(".text-danger", { timeout: 10000 })
        .should("be.visible")
        .and("contain", "The description field must be at least 10 characters.");
});
it("delete screen", () => {
  cy.get('.actions-dropdown ').last().click();
      cy.contains("Delete").click({ force: true });
      cy.get('[type="submit"].delete-btn').click({ force: true });
      cy.get(".alert", { timeout: 10000 })
              .should("be.visible")
            .and("contain", "Screen Deleted Successfully");
});
it("active or inactive", () => {
  cy.contains("Active").last().click();
  cy.wait(3000);
  cy.contains("Inactive").last().click();
});
// it.only("edit screen data", () => {
//   cy.contains("Details ").last().click({ force: true });
//   cy.get(':nth-child(2) > :nth-child(1) > .justify-content-between > a > img').click();
//   cy.get("#screen_name").clear().type("screensport");
//   cy.get("#description").clear().type("screen sporttttttttttt");
//   cy.get('#pac-input').type("355 Elgiesh Rd, Al Haram, Giza Governorate 3510204, Egypt").click();

//   cy.wait(6000);
//   cy.get(".alert", { timeout: 10000 })
//     .should("be.visible")
//     .and("contain", "Updated Successfully");
// });
it("edit screen attribute", () => {
  cy.contains("Details ").last().click({ force: true });
  cy.get(':nth-child(2) > :nth-child(2) > .justify-content-between > a > img').click();
cy.get('[name="Class_Audience_value_id"]').select("2");
cy.get(":nth-child(5) > .form-control").select("8");
cy.get('[name="Type_value_id"]').select("18");
cy.get('[name="Age_Audience_value_id"]').select("22");

cy.get('[type="submit"]').first().click();
cy.get(".alert", { timeout: 10000 })
    .should("be.visible")
    .and("contain", "Updated Successfully");
  });
it("edit screen price", () => {
  cy.contains("Details ").last().click({ force: true });
  cy.get(':nth-child(3) > :nth-child(1) > .justify-content-between > a > img').click();
  
  cy.get(':nth-child(9) > #slot_price').clear().type("200");
  cy.get(':nth-child(10) > #slot_price').clear().type("300");
  
  cy.get('[type="submit"]').first().click();
  cy.get(".alert", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Slots Data updated Successfully");
  
});
it("add screen image", () => {
  cy.contains("Details ").last().click({ force: true });
  cy.get(':nth-child(3) > :nth-child(2) > .d-flex > a > img').click();
  
  // Click the "Upload" button to open the file input
  cy.get('label[for="images"]').click();

  cy.get('input[type="file"]').attachFile('white.jpeg');

  cy.get('[type="submit"]').first().click();
  // Optional wait to ensure upload completes if necessary
  cy.wait(3000);
});
it("choose screen cover", () => {
  cy.contains("Details ").last().click({ force: true });
  cy.get(':nth-child(3) > :nth-child(2) > .d-flex > a > img').click();
  
  cy.get(':nth-child(2) > .d-flex > .btn-ornery-tangerine-outline').click();
  cy.wait(1000);
    cy.get(".alert", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Cover Image Updated Successfully");
});
it("delete screen image", () => {
  cy.contains("Details ").last().click({ force: true });
  cy.get(':nth-child(3) > :nth-child(2) > .d-flex > a > img').click();
  cy.get(':nth-child(2) > .d-flex > .col-1 > .btn > img').click();
 
});




});







