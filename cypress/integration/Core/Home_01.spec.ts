/// <reference path="../../support/index.d.ts" />

import { testIds } from "../../../src/testIds";

import enUS from "../../fixtures/translations/en-US.json";
import owner from "../../fixtures/owner/owner.json";
import apis from "../../fixtures/apis/apis.json";
import apis_noversion from "../../fixtures/apis/apis_noversion.json";
import settings_socialURLs from "../../fixtures/settings/settings_socialURLs.json";
import settings from "../../fixtures/settings/settings.json";

const apiQueryParameters = "?page=1&pageSize=100&type=cloud&type=local&sort_by=published&order=asc";

describe("Home Page - Unauthenticated User", () => {

  context("Cookie Consent", () => {
    before(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

      cy.visit("/home");
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
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

      cy.visit("/home");
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
      const fixedTabs = settings.navigation["anonymous"].tabs.filter((tab: { fixed: boolean })=>tab.fixed === true);

      cy.findChildrenByID(testIds.navigationTopFixedTabs, testIds.navigationTab)
        .should("have.length", fixedTabs.length);

      fixedTabs.forEach((tab, i) => {
        cy.findChildrenByID(testIds.navigationTopFixedTabs, testIds.navigationTab).eq(i).find("a")
          .should("be.visible")
          .and("have.attr", "href", tab.action);
      });

      const notFixedTabs =
        settings.navigation["anonymous"].tabs.filter((tab: { fixed: boolean })=>tab.fixed === false);

      cy.findChildrenByID(testIds.navigationTopNotFixedTabs, testIds.navigationTab)
        .should("have.length", notFixedTabs.length);

      notFixedTabs.forEach((tab, i) => {
        cy.findChildrenByID(testIds.navigationTopNotFixedTabs, testIds.navigationTab).eq(i).find("a")
          .should("be.visible")
          .and("have.attr", "href", tab.action);
      });
    });

    it("should scroll down a bit and show the corresponding tabs on the navigation bar and sub-navigation bars", () => {
      cy.scrollTo(0,10);

      cy.testID(testIds.navigationTopNotFixedTabs).should("not.exist");

      const fixedTabs = settings.navigation["anonymous"].tabs;
      fixedTabs.forEach((tab, i) => {
        cy.findChildrenByID(testIds.navigationTopFixedTabs, testIds.navigationTab).eq(i).find("a")
          .should("be.visible")
          .and("have.attr", "href", tab.action);
      });
    });
  });


  context("Carousel", () => {
    before(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

      cy.visit("/home");
      cy.dismissCookiesBanner();
    });

    it("should show a carousel with 3 slides", () => {
      cy.testID(testIds.slide).eq(0).should("be.visible");
      cy.wait(4000);
      cy.testID(testIds.slide).eq(1).should("be.visible");
      cy.wait(4000);
      cy.testID(testIds.slide).eq(2).should("be.visible");
      cy.wait(4000);
      cy.testID(testIds.slide).eq(0).should("be.visible");
    });

    it("should click the carousel icons and check the corresponding slide", () => {
      cy.testID(testIds.sliderIconButton).eq(2).click();
      cy.testID(testIds.slide).eq(2).should("be.visible");
      cy.testID(testIds.slide).eq(2).should("contain", enUS.sandboxPage.newSlides.slideThree.slideText);
      cy.testID(testIds.slide).eq(2).find("a")
        .should("have.length", 1)
        .should("contain", enUS.sandboxPage.newSlides.slideThree.slideButtonLabel)
        .should("have.attr", "href", "/documentation")
        .and("not.have.class", "Mui-disabled")
        .and("not.have.attr", "target", "_blank");
      cy.testID(testIds.sliderIconButton).eq(1).click();
      cy.testID(testIds.slide).eq(1).should("be.visible");
      cy.testID(testIds.slide).eq(1).should("contain", enUS.sandboxPage.newSlides.slideTwo.slideText);
      cy.testID(testIds.slide).eq(1).find("a")
        .should("have.length", 1)
        .should("contain", enUS.sandboxPage.newSlides.slideTwo.slideButtonLabel)
        .should("have.attr", "href", "/api-products")
        .and("not.have.class", "Mui-disabled")
        .and("not.have.attr", "target", "_blank");
      cy.testID(testIds.sliderIconButton).eq(0).click();
      cy.testID(testIds.slide).eq(0).should("contain", enUS.sandboxPage.newSlides.slideOne.slideText);
      cy.testID(testIds.slide).eq(0).find("a")
        .should("have.length", 1)
        .should("contain", enUS.sandboxPage.newSlides.slideOne.slideButtonLabel)
        .should("have.attr", "href", "/auth/signup")
        .and("not.have.class", "Mui-disabled")
        .and("not.have.attr", "target", "_blank");
    });
  });


  context("'Steps' Section", () => {
    before(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

      cy.visit("/home");
      cy.dismissCookiesBanner();
    });

    it("should show a 'Steps' Section with an create account section and a 3 steps tutorial section", () => {
      cy.testID(testIds.stepsSection).find("h2").should("contain", enUS.sandboxPage.stepsSection.intro);
    });

    it("should show the correct text and the sign up now button on the create account section", () => {
      cy.testID(testIds.stepsSectionLeftSide)
        .should("contain", enUS.sandboxPage.stepsSection.notLoggedIn.heading)
        .and("contain", enUS.sandboxPage.stepsSection.notLoggedIn.paragraphOne)
        .and("contain", enUS.sandboxPage.stepsSection.notLoggedIn.paragraphTwo);

      cy.testID(testIds.stepsSectionLeftSide).find("a")
        .should("have.length", 1)
        .should("contain", enUS.sandboxPage.stepsSection.notLoggedIn.buttonLabel)
        .should("have.attr", "href", "/auth/signup")
        .and("not.have.class", "Mui-disabled")
        .and("not.have.attr", "target", "_blank");
    });

    it("should show the correct texts and buttons on the three steps section", () => {
      cy.testID(testIds.stepOne)
        .should("contain", "1.")
        .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepOne.header)
        .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepOne.paragraph);
      cy.testID(testIds.stepOne).find("a")
        .should("have.length", 1)
        .should("contain", enUS.sandboxPage.stepsSection.individualSteps.stepOne.buttonLabel)
        .and("have.class", "Mui-disabled");

      cy.testID(testIds.stepTwo)
        .should("contain", "2.")
        .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepTwo.header)
        .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepTwo.paragraph);
      cy.testID(testIds.stepTwo).find("a")
        .should("have.length", 1)
        .should("contain", enUS.sandboxPage.stepsSection.individualSteps.stepTwo.buttonLabel)
        .and("have.class", "Mui-disabled");

      cy.testID(testIds.stepThree)
        .should("contain", "3.")
        .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepThree.header)
        .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepThree.paragraph);

      //TODO: Review this after settings association gets implemented
      cy.testID(testIds.stepThree).find("a")
        .should("have.length", 1)
        .should("contain", enUS.sandboxPage.stepsSection.individualSteps.stepThree.buttonLabel)
        .and("have.class", "Mui-disabled");
    });
  });


  context("API Catalog recent additions", () => {
    beforeEach(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
    });

    it("should show the section title and a message mentioning the absence of APIs", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis_empty.json" });
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.recentAdditionsTitle)
        .should("be.visible")
        .and("contain", enUS.sandboxPage.apiCatalog.intro);
      cy.testID(testIds.recentAdditionsCatalog).find("a").should("not.exist");
      cy.testID(testIds.recentAdditionsEmpty)
        .should("be.visible")
        .and("contain", enUS.sandboxPage.apiCatalog.paragraph);
    });

    it("should show the section title and a card for each recent API added", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis.json" });
      cy.visit("/home");
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
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis_noversion.json" });
      cy.visit("/home");
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
        .should("have.text", enUS.fallbacks.noVersion);
      cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardAccessType)
        .should("have.text", " API Documentation");
      cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardDescription)
        .should("have.text", enUS.fallbacks.noDescription);
    });
  });


  context("Portal Owner Info Panel", () => {
    beforeEach(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
    });

    it("should not show the info panel if there is no website", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.notice).should("not.exist");
    });

    it("should show the info panel mentioning portal owner's name and link", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs.json" });
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.noticeText)
        .should("be.visible")
        .and("have.text",
          enUS.sandboxPage.notice
            .replace("{{portalName}}", settings_socialURLs.portalName)
            .replace("{{clientName}}", settings_socialURLs.clientName)
            .replace("<0>{{url}}</0>", settings_socialURLs.socialURLs[0].url)
        );
    });
  });

  context("Footer", () => {
    beforeEach(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis${apiQueryParameters}`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
    });

    it("should show the page footer", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footer).should("be.visible");
    });

    it("should show the portal name and logo", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footerLogoAndPortalName).should("be.visible");

      cy.testID(testIds.footerLogoAndPortalName).find("img")
        .should("have.attr", "src", owner.logo);
      cy.testID(testIds.footerLogoAndPortalName)
        .should("have.text", settings.portalName);
    });

    it("should show the social icons", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs.json" });
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footerSocialIcons).should("be.visible");

      for (let index = 0; index < settings_socialURLs.socialURLs.length; index++) {
        cy.testID(testIds.footerSocialIcons).find("a").eq(index)
          .should("be.visible")
          .and("have.attr", "href", settings_socialURLs.socialURLs[index].url)
          .and("have.attr", "target", "_blank");
      }
    });

    it("should not show the social icons", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footerSocialIcons).should("not.exist");
    });

    // it("should show the portal structure with links", () => {
    // TODO: test the portal structure links ...
    // });

    it("should show the copyrights", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/home");
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
      cy.visit("/home");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footerToTopButton).click();
      cy.url().should("eq", `${Cypress.config().baseUrl}/home`);
      cy.window().its("scrollY").should("equal", 0);
    });

    // it("should switch between languages", () => {
    // TODO: test language switch...
    // });
  });
});
