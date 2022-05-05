/// <reference path="../../support/index.d.ts" />

import { testIds } from "../../../src/testIds";

import enUS from "../../fixtures/translations/en-US.json";
import profile_admin from "../../fixtures/profile/profile-admin.json";
import profile_baseUser from "../../fixtures/profile/profile-baseUser.json";
import profile_developer from "../../fixtures/profile/profile-developer.json";
import profile_organizationOwner from "../../fixtures/profile/profile-orgOwner.json";

type roles = "admin" | "baseUser" | "developer" | "organizationOwner";

interface OrgsMember {
  id: number,
  name: string,
}

interface UserRole {
  role: roles,
  filename: string,
  name: string,
  currentOrg: string | undefined,
  orgsMember: OrgsMember[],
}

const userRoles: UserRole[] = [
  {
    role: "developer",
    filename: "profile-developer",
    name: profile_developer.user.name,
    currentOrg: profile_developer.organizations[0].name,
    orgsMember: profile_developer.organizations,
  },
  {
    role: "organizationOwner",
    filename: "profile-orgOwner",
    name: profile_organizationOwner.user.name,
    currentOrg: profile_organizationOwner.organizations[0].name,
    orgsMember: profile_organizationOwner.organizations,
  },
  {
    role: "admin",
    filename: "profile-admin",
    name: profile_admin.user.name,
    currentOrg: profile_admin.organizations[0].name,
    orgsMember: profile_admin.organizations,
  },
  {
    role: "baseUser",
    filename: "profile-baseUser",
    name: profile_baseUser.user.name,
    currentOrg: undefined,
    orgsMember: profile_baseUser.organizations,
  },
];

userRoles.forEach((user) => {
  describe(`Profile - Overview - ${user.role}`, () => {
    context("Left side section", () => {
      before(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/plan`, { fixture: "plan/plan.json" });

        cy.setSession();

        cy.visit("/profile");
      });

      it("should show the user's name as section title", () => {
        cy.testID(testIds.profileOverviewTitle)
          .should("be.visible")
          .and("have.text", user.name);
      });

      it("should show the user role", () => {
        let roleDisplayName = "";

        switch (user.role) {
          case "admin":
            roleDisplayName = enUS.labels.role.name_admin;
            break;
          case "organizationOwner":
            roleDisplayName = enUS.labels.role.name_organizationOwner;
            break;
          case "developer":
            roleDisplayName = enUS.labels.role.name_developer;
            break;
          default:
            roleDisplayName = enUS.labels.role.name;
        }

        cy.testID(testIds.profileOverviewRole)
          .should("be.visible")
          .and("have.text", roleDisplayName);
      });

      it("should show the subtitle", () => {
        cy.testID(testIds.profileOverviewSubtitle)
          .should("be.visible")
          .and("have.text", enUS.profileTab.overviewSubTab.subtitle);
      });

      it("should show the org selector based on user role", () => {
        if (user.role !== "baseUser") {
          cy.testID(testIds.profileOverviewSelectorTitle)
            .should("be.visible")
            .and("have.text", enUS.profileTab.overviewSubTab.orgRelatedLabels.selectorTitle);

          cy.testID(testIds.profileOverviewSelectorComponent)
            .within(() => {
              cy.get("input")
                .should("be.visible")
                .and("have.value", user.currentOrg);
            });

          cy.testID(testIds.profileOverviewSelectorButton)
            .should("be.visible")
            .and("have.text", enUS.profileTab.overviewSubTab.orgRelatedLabels.switchOrgButtonLabel);
        } else {
          cy.testID(testIds.profileOverviewSelectorTitle)
            .should("not.exist");

          cy.testID(testIds.profileOverviewSelectorComponent)
            .should("not.exist");

          cy.testID(testIds.profileOverviewSelectorButton)
            .should("not.exist");
        }
      });

      it("should show the 'Create org' button based on user role", () => {
        if (user.role !== "baseUser" && !user.orgsMember.length) {
          cy.testID(testIds.profileOverviewCreateOrgButton)
            .should("be.visible")
            .and("have.text", enUS.profileTab.overviewSubTab.orgRelatedLabels.createOrgButtonLabel);
        } else {
          cy.testID(testIds.profileOverviewCreateOrgButton)
            .should("not.exist");
        }
      });
    });
  });
});
