/// <reference path="../../support/index.d.ts" />

import { testIds } from "../../../src/testIds";

import enUS from "../../fixtures/translations/en-US.json";
import settings from "../../fixtures/settings/settings.json";
import settings_socialURLs2 from "../../fixtures/settings/settings_socialURLs2.json";
import owner from "../../fixtures/owner/owner.json";
import profile_developer from "../../fixtures/profile/profile-developer.json";
import profile_organizationOwner from "../../fixtures/profile/profile-orgOwner.json";
import apis from "../../fixtures/apis/apis.json";
import apis_noversion from "../../fixtures/apis/apis_noversion.json";

type roles = "developer" | "organizationOwner";
const users: { type: roles; filename: string; name: string }[] = [
  {
    type: "developer",
    filename: "profile-developer",
    name: profile_developer.user.name,
  },
  {
    type: "organizationOwner",
    filename: "profile-orgOwner",
    name: profile_organizationOwner.user.name,
  },
];

users.forEach(user => {

  describe(`Dashboard - Overview Page - ${user.type}`, () => {

    context("Cookie Consent", () => {
      before(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setSession();

        cy.visit("/dashboard");
      });

      it("should show a privacy notice with an accept CTA", () => {
        cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.intro).should("be.visible");
        cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphOne).should("be.visible");
        cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphTwo.partOne).should("be.visible");
        cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphTwo.partTwo).should("be.visible");
        cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphTwo.partThree).should("be.visible");
        cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphThree).should("be.visible");

        cy.testID(testIds.cookieConsent).find("a").contains(enUS.cookiesConsentBanner.paragraphTwo.partTwo)
          .should("be.visible")
          .and("have.attr", "href", "https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/761004061/Legal")
          .and("have.attr", "target", "_blank"); //open in a new tab
      });

      it("should dismiss privacy notice on accept CTA click", () => {
        cy.testID(testIds.cookieConsent).find("button").should("have.length", 1).and("contain", enUS.cookiesConsentBanner.buttonLabel);
        cy.dismissCookiesBanner();
        cy.testID(testIds.cookieConsent).find("button").should("have.length", 0);
      });
    });


    context("Navigation", () => {
      before(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setSession();

        cy.visit("/dashboard");
        cy.dismissCookiesBanner();
      });

      it("should show the portal owner logo and name", () => {
        cy.testID(testIds.navigation).should("be.visible");

        cy.testID(testIds.navigationLogoAndTitle)
          .should("be.visible")
          .and("have.attr", "href", settings.navigation.title.route);

        cy.testID(testIds.navigationLogoAndTitle).find("img")
          .should("be.visible")
          .and("have.attr", "src", owner.logo);

        cy.testID(testIds.navigationTitle)
          .should("be.visible")
          .and("have.text", settings.portalName);
      });

      it("should show the corresponding tabs on the navigation bar and sub-navigation bars", () => {

        const fixedTabs =
          settings.navigation[user.type]
            .tabs.filter((tab: { fixed: boolean }) => tab.fixed === true);

        cy.findChildrenByID(testIds.navigationTopFixedTabs, testIds.navigationTab)
          .should("have.length", fixedTabs.length);

        fixedTabs.forEach((tab, i) => {
          cy.findChildrenByID(testIds.navigationTopFixedTabs, testIds.navigationTab).eq(i).find("a")
            .should("be.visible")
            .and("have.attr", "href", tab.action);
        });

        const notFixedTabs =
          settings.navigation[user.type].tabs.filter((tab: { fixed: boolean })=>tab.fixed === false);

        cy.findChildrenByID(testIds.navigationTopNotFixedTabs, testIds.navigationTab)
          .should("have.length", notFixedTabs.length);

        notFixedTabs.forEach((tab, i) => {
          cy.findChildrenByID(testIds.navigationTopNotFixedTabs, testIds.navigationTab).eq(i).find("a")
            .should("be.visible")
            .and("have.attr", "href", tab.action);
        });

        const subTabs =
          settings.navigation[user.type].tabs.find((tab) => {
            return tab.label.fallback == "Dashboard";
          })?.subTabs;

        cy.findChildrenByID(testIds.navigationSubNav, testIds.navigationTab)
          .should("have.length", subTabs?.length);

        subTabs?.forEach((subTab, i) => {
          cy.findChildrenByID(testIds.navigationSubNav, testIds.navigationTab).eq(i).find("a")
            .should("be.visible")
            .and("have.attr", "href", subTab.action);
        });
      });

      it("should scroll down a bit and show the corresponding tabs on the navigation bar and sub-navigation bars", () => {
        cy.scrollTo(0,10);

        cy.testID(testIds.navigationTopNotFixedTabs).should("not.exist");

        const fixedTabs = settings.navigation[user.type].tabs;
        fixedTabs.forEach((tab, i) => {
          cy.findChildrenByID(testIds.navigationTopFixedTabs, testIds.navigationTab).eq(i).find("a")
            .should("be.visible")
            .and("have.attr", "href", tab.action);
        });

        const subTabs =
          settings.navigation[user.type].tabs.find((tab) => {
            return tab.label.fallback == "Dashboard";
          })?.subTabs;

        cy.findChildrenByID(testIds.navigationSubNav, testIds.navigationTab)
          .should("have.length", subTabs?.length);

        subTabs?.forEach((subTab, i) => {
          cy.findChildrenByID(testIds.navigationSubNav, testIds.navigationTab).eq(i).find("a")
            .should("be.visible")
            .and("have.attr", "href", subTab.action);
        });
      });
    });


    context("Actions Section", () => {
      beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setSession();
      });

      it("should show a grid with 6 different actions linked to the corresponding pages", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });

        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.actionsSection).should("be.visible");

        cy.testID(testIds.actionsEntry).should("have.length", 6);

        cy.testID(testIds.actionsEntry).eq(0).parent().should("have.attr", "href", "/profile/team");
        cy.testID(testIds.actionsEntry).eq(0).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.team);

        cy.testID(testIds.actionsEntry).eq(1).parent().should("have.attr", "href", "/dashboard/apps");
        cy.testID(testIds.actionsEntry).eq(1).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.sandbox);

        cy.testID(testIds.actionsEntry).eq(2).parent().should("have.attr", "href", "/dashboard/subscriptions");
        cy.testID(testIds.actionsEntry).eq(2).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.shield);

        cy.testID(testIds.actionsEntry).eq(3).parent().should("have.attr", "href", "/profile/security");
        cy.testID(testIds.actionsEntry).eq(3).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.fingerprint);

        cy.testID(testIds.actionsEntry).eq(4).parent().should("have.attr", "href", "/dashboard/subscriptions");
        cy.testID(testIds.actionsEntry).eq(4).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.api);

        cy.testID(testIds.actionsEntry).eq(5).parent().should("have.attr", "href", settings.supportURL);
        cy.testID(testIds.actionsEntry).eq(5).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.support);
      });

      it("should show a grid with 6 different actions linked to the corresponding pages - no support URL in settings", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings-emptyURL.json" });

        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.actionsSection).should("be.visible");

        cy.testID(testIds.actionsEntry).should("have.length", 6);

        cy.testID(testIds.actionsEntry).eq(0).parent().should("have.attr", "href", "/profile/team");
        cy.testID(testIds.actionsEntry).eq(0).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.team);

        cy.testID(testIds.actionsEntry).eq(1).parent().should("have.attr", "href", "/dashboard/apps");
        cy.testID(testIds.actionsEntry).eq(1).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.sandbox);

        cy.testID(testIds.actionsEntry).eq(2).parent().should("have.attr", "href", "/dashboard/subscriptions");
        cy.testID(testIds.actionsEntry).eq(2).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.shield);

        cy.testID(testIds.actionsEntry).eq(3).parent().should("have.attr", "href", "/profile/security");
        cy.testID(testIds.actionsEntry).eq(3).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.fingerprint);

        cy.testID(testIds.actionsEntry).eq(4).parent().should("have.attr", "href", "/dashboard/subscriptions");
        cy.testID(testIds.actionsEntry).eq(4).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.api);

        cy.testID(testIds.actionsEntry).eq(5).parent().should("have.attr", "href", "https://intercom.help/api-suite/en/articles/4586659-api-portal-users");
        cy.testID(testIds.actionsEntry).eq(5).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.support);
      });
    });


    context("Greetings Section", () => {
      before(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setSession();

        cy.visit("/dashboard");
        cy.dismissCookiesBanner();
      });

      it("should show a greetings card with 2 paragraph and a contact button", () => {
        cy.testID(testIds.greetingSection).should("be.visible");

        cy.testID(testIds.greetingCardParagraphOne)
          .should("be.visible")
          .and("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greet.replace("{{name}}",user.name));
        cy.testID(testIds.greetingCardParagraphTwo)
          .should("be.visible")
          .and("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardText);
        cy.testID(testIds.greetingCardParagraphThree)
          .should("be.visible")
          .and("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextAdmin);
        cy.testID(testIds.greetingCardButton)
          .should("be.visible")
          .and("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardButtonLabel.replace("{{clientName}}",settings.clientName))
          .and("have.attr", "href", settings.supportURL);
      });
    });


    context("API Catalog recent additions", () => {
      beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setSession();
      });

      it("should show the section title and a message mentioning the absence of APIs", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_empty.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.recentAdditionsTitle)
          .should("be.visible")
          .and("contain", enUS.sandboxPage.apiCatalog.intro);
        cy.testID(testIds.recentAdditionsCatalog).find("a").should("not.exist");
        cy.testID(testIds.recentAdditionsEmpty)
          .should("be.visible")
          .and("contain", enUS.sandboxPage.apiCatalog.paragraph);
      });

      //TODO: Test needs business confirmation related to the amount of API products being displayed
      xit("should show the section title and a card for each recent API added", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.recentAdditionsTitle)
          .should("be.visible")
          .and("contain", enUS.sandboxPage.apiCatalog.intro);
        cy.testID(testIds.recentAdditionsEmpty).should("not.exist");
        cy.findChildrenByID(testIds.recentAdditionsCatalog, testIds.apiCatalogCard).should("have.length", 2);

        //TODO: add test for this later
        // cy.findChildrenByID(testIds.recentAdditionsCatalog, testIds.apiCatalogCard).eq(0)
        //   .should("have.attr", "href", `/api-products/details/${
        //     apis.rows[0].apiVersions[0].apiId
        //   }/spec/${
        //     apis.rows[0].apiVersions[0].id
        //   }`);
        // cy.findChildrenByID(testIds.recentAdditionsCatalog, testIds.apiCatalogCard).eq(1)
        //   .should("have.attr", "href", `/api-products/details/${
        //     apis.rows[1].apiVersions[0].apiId
        //   }/spec/${
        //     apis.rows[1].apiVersions[0].id
        //   }`);

        cy.testID(testIds.apiCatalogCard).should("have.length", 2);

        for (let index = 0; index < 2; index++) {
          cy.testID(testIds.apiCatalogCard).eq(index)
            .should("be.visible")
            .and("contain", apis.rows[index].apiVersions[0].title)
            .and("contain", apis.rows[index].apiVersions[0].version)
            .and("contain", apis.rows[index].apiVersions[0].live ? "Production access":"API Documentation")
            .and("contain", apis.rows[index].docs[0].info); //This is failing
          //TODO: this needs to be reviewed later
        }
      });

      it("should show the section title and a card for each recent API added without version", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_noversion.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.recentAdditionsTitle)
          .should("be.visible")
          .and("contain", enUS.sandboxPage.apiCatalog.intro);
        cy.testID(testIds.recentAdditionsEmpty).should("not.exist");

        //TODO: add click test
        // cy.testID(testIds.recentAdditionsCatalog).find("a").should("have.length", 0);

        cy.testID(testIds.apiCatalogCard)
          .should("have.length", 1)
          .and("be.visible");

        cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardName)
          .should("have.text", apis_noversion.rows[0].name);
        cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardVersion)
          .should("have.text", "No version available");
        cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardAccessType)
          .should("have.text", " API Documentation");
        cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardDescription)
          .should("have.text", "No description presently available.");
      });
    });


    context("Portal Owner Info Panel", () => {
      beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setSession();
      });

      it("should not show the info panel if there is no website", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.notice).should("not.exist");
      });

      it("should show the info panel mentioning portal owner's name and link", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.noticeText)
          .should("be.visible")
          .and("have.text",
            enUS.sandboxPage.notice
              .replace("{{portalName}}", settings_socialURLs2.portalName)
              .replace("{{clientName}}", settings_socialURLs2.clientName)
              .replace("<0>{{url}}</0>", settings_socialURLs2.socialURLs[0].url)
          );
      });
    });


    context("Footer", () => {
      beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setSession();
      });

      it("should show the page footer", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footer).should("be.visible");
      });

      it("should show the portal name and logo", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footerLogoAndPortalName).should("be.visible");

        cy.testID(testIds.footerLogoAndPortalName).find("img")
          .should("have.attr", "src", owner.logo);
        cy.testID(testIds.footerLogoAndPortalName)
          .should("contain", settings.portalName);
      });

      it("should show the social icons", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footerSocialIcons).should("be.visible");

        for (let index = 0; index < settings_socialURLs2.socialURLs.length; index++) {
          cy.testID(testIds.footerSocialIcons).find("a").eq(index)
            .should("be.visible")
            .and("have.attr", "href", settings_socialURLs2.socialURLs[index].url)
            .and("have.attr", "target", "_blank");
        }
      });

      it("should not show the social icons", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footerSocialIcons).should("not.exist");
      });

      // it("should show the portal structure with links", () => {
      // TODO: test the portal structure links ...
      // });

      it("should show the copyrights", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footerCredits).should("be.visible");
        cy.testID(testIds.footerCredits).find("a")
          .should("be.visible")
          .and("have.attr", "href", "https://apisuite.io/")
          .and("have.attr", "target", "_blank")
          .and("have.text", `\u00A9 ${new Date().getFullYear()} ${enUS.footer.copyrights.website}`);
        cy.testID(testIds.footerCredits).find("h6")
          .should("be.visible")
          .and("have.text", enUS.footer.copyrights.allRightsReserved);
      });

      it("should scroll to the top of the current page", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footerToTopButton).click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/dashboard`);
        cy.window().its("scrollY").should("equal", 0);
      });

      // it("should switch between languages", () => {
      // TODO: test language switch...
      // });
    });
  });

});
