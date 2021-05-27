/// <reference path="../support/index.d.ts" />

import { testIds } from "../../src/testIds";

describe("Landing Page", () => {
  before(() => {
    cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings.json" });
    cy.visit("/");
  });

  it("should show a privacy notice with an accept CTA", () => {
    cy.testID(testIds.cookieConsent).get("button").contains("I Accept").should("be.visible");
  });

  it("should dismiss privacy notice on accept CTA click", () => {
    cy.testID(testIds.cookieConsent).find("button").should("have.length", 1);
    cy.dismissCookiesBanner();
    cy.testID(testIds.cookieConsent).find("button").should("have.length", 0);
  });

  it("should show a footer at the bottom of the page", () => {
    cy.scrollTo("bottom");
    cy.testID(testIds.footer).should("be.visible");
  });

  it("should show a sign in and sign up buttons on the navigation", () => {
    cy.testID(testIds.navigation).get("a").contains("Sign up").should("be.visible");
    cy.testID(testIds.navigation).get("a").contains("Sign in").should("be.visible");
  });

  // TODO: complete test...
});
