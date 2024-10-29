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
          cy.contains("Requests").click();
          cy.get(".header.toggler.sidebar-link").click(); // Target the 'Requests' dropdown toggle
      
          // Then click on 'Advertisers' link in the dropdown
          cy.get('a[href="https://dev.screenon.app/Owner/advertiser-requests"]').click();
          
          // Add assertions if necessary
          cy.url().should('include', '/Owner/advertiser-requests');
                  });
        it("Ensure Search is Functional", () => {
            cy.contains("Requests").click();
      
            cy.get(".header.toggler.sidebar-link").click(); // Target the 'Requests' dropdown toggle
      
            // Then click on 'Advertisers' link in the dropdown
            cy.get('a[href="https://dev.screenon.app/Owner/advertiser-requests"]').click();
            
            // Add assertions if necessary
            cy.url().should('include', '/Owner/advertiser-requests'); // Verify if it navigates to the correct URL
            cy.get('[name="query"]').type("adv");
        
            // Click the search button
            cy.get(".input-group-append .btn").click();
        
            cy.get(".text-center.text-nowrap", { timeout: 10000 }) // 10 seconds
            .should("be.visible")
            .and("contain", "adv");
          
          });
      
          it("Approves a request and checks the advertiser appears in Manage Advertiser page", () => {
            // Wait for the approve button to be visible and click
            cy.get('button[wire\\:click="approve(9)"]', { timeout: 10000 })
              .should('be.visible') // Wait for the button to appear
              .click(); // Click the approve button
          cy.wait(1000);

           
    
              cy.get(".text-center.text-nowrap", { timeout: 10000 }) // 10 seconds
              .should("be.visible")
              .and("not.contain", "adv@gmail.com");
              cy.wait(1000);
           // Navigate to 'Manage Advertisers' page
            cy.visit('https://dev.screenon.app/Owner/all-advertisers');
        
            // Check that the advertiser data appears in the Manage Advertisers page
            cy.get('table').should('contain', 'adv@gmail.com');
          });
        
          it("Denies a request and checks the request is removed from the list", () => {
            // Wait for the deny button to be visible and click it
            cy.get('button[wire\\:click="denied (17)"]', { timeout: 10000 })
            .should('be.visible') // Wait for the button to appear
            .click(); // Click the approve button
          
     cy.get(".text-center.text-nowrap", { timeout: 10000 }) // 10 seconds
            .should("be.visible")
            .and("not.contain", "advtest@gmail.com");
          
          });
          it("Approves a Denies request and checks the request is removed from the list", () => {
            // Wait for the deny button to be visible and click it
           

            cy.visit('https://dev.screenon.app/Owner/denied-advertisers');
            cy.get('table').should('contain', 'advtest'); // Ensure the advertiser appears in the Denied Advertisers list

            cy.get('button[wire\\:click="approve(17)"]', { timeout: 10000 })
            .should('be.visible') // Wait for the button to appear
            .click();


            // Check that the advertiser data appears in the Denied Advertisers page
            cy.get('table').should('not.contain', 'Advertisertest@gmail.com'); // Ensure the advertiser appears in the Denied Advertisers list
          });
          
        });