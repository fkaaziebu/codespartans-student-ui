// describe("Student Login", () => {
//   beforeEach(() => {
//     cy.window().then((win) => win.sessionStorage.clear());
//     cy.visit("/signin");
//   });

//   it("shows the login form", () => {
//     cy.get('input[name="email"]').should("be.visible");
//     cy.get('input[name="password"]').should("be.visible");
//     cy.get('button[type="submit"]').should("contain", "Sign In");
//   });

//   it("logs in successfully and redirects", () => {
//     cy.get('input[name="email"]').type(Cypress.env("STUDENT_EMAIL"));
//     cy.get('input[name="password"]').type(Cypress.env("STUDENT_PASSWORD"));
//     cy.get('button[type="submit"]').click();

//     cy.url({ timeout: 10000 }).should("match", /\/(dashboard|setup|courses)/);
//     cy.window()
//       .its("sessionStorage")
//       .invoke("getItem", "token")
//       .should("not.be.null");
//   });

//   it("shows an error message with invalid credentials", () => {
//     cy.get('input[name="email"]').type("wrong@example.com");
//     cy.get('input[name="password"]').type("WrongPassword123");
//     cy.get('button[type="submit"]').click();

//     cy.get(".ferr").should("be.visible");
//     cy.url().should("include", "/signin");
//   });
// });
