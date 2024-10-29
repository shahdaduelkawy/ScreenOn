
it("find element by tag name", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get("h2");
});
it("find element by id", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get("#courses");
});
it("find element by class", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get(".list2");
});
it("find element by attribute", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get('[id="Developer"]');
});
it("find the first element in the list", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get("h2").first();
});
it("find the last element in the list", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get("h2").last();
});
it("find element from the list by index", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get("h2").eq(0);
});
it("find element from the list using filter", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get("li").filter(".web");
});
it("find elements one element from the list using children command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");
  cy.get(".course-list").children(".web").first();
  cy.get(".course-list").children(".web").last();
  cy.get(".course-list").children(".web").eq(2);
});
it("find element from the list using parent", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get(".list1.web").parents();
});
it("find element from the list by text", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.contains("Appium");
});
it("find element from the list using parent", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get(".list1.web").parents();
});
it("click command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");
  cy.get(".invoice-button").last().click();
  cy.get(".invoice-button").click({ multiple: true });
  cy.get(".cover").click({ force: true });
});
it("type command", () => {
  cy.visit("cypress/index.html");

  cy.get("#inputEmail").type("shahd@gmail.com");
});
it("select command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");
  cy.get("#courses").select("selenium");
});
it("check command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get("#Manager").check();
  cy.get("#Banana").check();
  cy.get("#Banana").uncheck();
});
it("dbclick command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get('[value="Click me"]').dblclick();
});
it("right click command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get('[value="Click me"]').rightclick();
});
it("blur command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");
  cy.get(".focus-blur").focus();
  cy.get(".focus-blur").blur();
});
it("hover over command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get(".trigger").trigger("mouseover");
});
it("hover out command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get(".trigger").trigger("mouseout");
});
it("long press command", () => {
  // cy.viewport(viewport);

  cy.visit("cypress/index.html");

  cy.get(".trigger").trigger("mousedown");

  cy.wait(3000);

  cy.get(".trigger").trigger("mouseup");
});
