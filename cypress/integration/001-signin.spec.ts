/// <reference path="../support/index.d.ts" />

import { testIds } from "../../src/testIds";

const getCredentials = (user = "johndoe") => {
  return {
    email: `${user}@apisuite.com`,
    pwd: "SomeG00dPwd!",
  };
};

describe("Sign in", () => {
  before(() => {
    cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings.json" });
    cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis.json" });
    cy.visit("/auth/signin");
    cy.dismissCookiesBanner();
  });

  it("should show wrong login credentials message", () => {
    const credentials = getCredentials();

    cy.intercept("POST", `${Cypress.env("api_url")}/auth/login`, (req) => {
      req.reply({
        statusCode: 401,
        body: JSON.stringify({ errors:["Invalid credentials"] }),
      });
    });

    cy.testID(testIds.signInEmail).type(credentials.email);
    cy.testID(testIds.signInPwd).type(credentials.pwd);

    cy.get("button").contains("Sign in").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should redirect to dashboard if login credentials return an admin", () => {
    const credentials = getCredentials("janedoe");

    cy.intercept("POST", `${Cypress.env("api_url")}/auth/login`, (req) => {
      req.reply({
        statusCode: 200,
        body: "ok",
      });
    });

    cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: "profile.json" });

    cy.testID(testIds.signInEmail).clear().type(credentials.email);
    cy.testID(testIds.signInPwd).clear().type(credentials.pwd);

    cy.get("button").contains("Sign in").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/dashboard`);
  });

  // TODO: complete test...
});
