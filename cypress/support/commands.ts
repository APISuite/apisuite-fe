import { testIds } from "../../src/testIds";

Cypress.Commands.add("testID", (value) => {
  return cy.get(`[data-test-id=${value}]`);
});

Cypress.Commands.add("dismissCookiesBanner", () => {
  return cy.testID(testIds.cookieConsent).get("button").contains("I Accept").click();
});
