/// <reference path="../../support/index.d.ts" />

import { testIds } from "../../../src/testIds";

describe("Landing Page - Unauthenticated User", () => {

  context("Cookie Consent", () => {
    before(() => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/");
    });

    it("should show a privacy notice with an accept CTA", () => {
      cy.fixture("translations/en-US.json").then(enUS => {
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
    });

    it("should dismiss privacy notice on accept CTA click", () => {
      cy.fixture("translations/en-US.json").then(enUS => {
        cy.testID(testIds.cookieConsent).find("button").should("have.length", 1).and("contain", enUS.cookiesConsentBanner.buttonLabel);
        cy.dismissCookiesBanner();
        cy.testID(testIds.cookieConsent).find("button").should("have.length", 0);
      });
    });
  });


  context("Navigation", () => {
    before(() => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept(`${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();
    });

    it("should show a navigation bar and start expanded", () => {
      cy.testID(testIds.navigation).should("be.visible").and("have.class", "expand");
    });

    it("should have Owner logo and name, Sign Up button and Sign In tab, on top bar", () => {
      cy.fixture("owner/owner.json").then(owner => {
        cy.testID(testIds.header).find("a").should("have.length", 3);

        cy.testID(testIds.header).find("a").eq(0)
          .should("have.attr", "href", "/")
          .and("not.have.class", "Mui-disabled")
          .and("not.have.attr", "target", "_blank");
        cy.testID(testIds.header).find("a").eq(0).find("img")
          .should("have.length", 1)
          .and("have.attr", "src", owner.logo);
        cy.testID(testIds.header).find("a").eq(0).find("h3")
          .should("have.length", 1)
          .and("contain", "Proba-V MEP user portal");

        cy.findChildrenByID(testIds.header, testIds.tab).should("have.length", 2);
        cy.findChildrenByID(testIds.header, testIds.tab).eq(0)
          .should("have.attr", "href", "/auth/signup")
          .and("not.have.class", "Mui-disabled")
          .and("not.to.be.selected")
          .and("not.have.attr", "target", "_blank");
        cy.findChildrenByID(testIds.header, testIds.tab).eq(1)
          .should("have.attr", "href", "/auth/signin")
          .and("not.have.class", "Mui-disabled")
          .and("not.to.be.selected")
          .and("not.have.attr", "target", "_blank");
      });
    });

    it("should have API Products, Documentation and Support tabs, on sub-nav bar", () => {
      cy.fixture("settings/settings.json").then(settings => {
        cy.findChildrenByID(testIds.subNav, testIds.tab).should("have.length", 3);
        cy.findChildrenByID(testIds.subNav, testIds.tab).eq(0)
          .should("have.attr", "href", "/api-products")
          .and("not.have.class", "Mui-disabled")
          .and("not.to.be.selected")
          .and("not.have.attr", "target", "_blank");
        cy.findChildrenByID(testIds.subNav, testIds.tab).eq(1)
          .should("have.attr", "href", settings.documentationURL)
          .and("not.have.class", "Mui-disabled")
          .and("not.to.be.selected")
          .and("have.attr", "target", "_blank");
        cy.findChildrenByID(testIds.subNav, testIds.tab).eq(2)
          .should("have.attr", "href", settings.supportURL)
          .and("not.have.class", "Mui-disabled")
          .and("not.to.be.selected")
          .and("have.attr", "target", "_blank");
      });
    });

    it("should scroll down a bit and navigation bar gets merged with sub-navigation bar", () => {
      cy.fixture("owner/owner.json").then(owner => {
        cy.fixture("settings/settings.json").then(settings => {
          cy.scrollTo(0,10);
          cy.testID(testIds.navigation).should("be.visible").and("not.to.have.class", "expand");
          cy.testID(testIds.navigation).find("a").should("have.length", 6);

          cy.testID(testIds.header).find("a").eq(0)
            .should("have.attr", "href", "/")
            .and("not.have.class", "Mui-disabled")
            .and("not.have.attr", "target", "_blank");
          cy.testID(testIds.header).find("a").eq(0).find("img")
            .should("have.length", 1)
            .and("have.attr", "src", owner.logo);
          cy.testID(testIds.header).find("a").eq(0).find("h3")
            .should("have.length", 1)
            .and("contain", "Proba-V MEP user portal");

          cy.findChildrenByID(testIds.header, testIds.tab).should("have.length", 5);
          cy.findChildrenByID(testIds.header, testIds.tab).eq(0)
            .should("have.attr", "href", "/api-products")
            .and("not.have.class", "Mui-disabled")
            .and("not.to.be.selected")
            .and("not.have.attr", "target", "_blank");
          cy.findChildrenByID(testIds.header, testIds.tab).eq(1)
            .should("have.attr", "href", settings.documentationURL)
            .and("not.have.class", "Mui-disabled")
            .and("not.to.be.selected")
            .and("have.attr", "target", "_blank");
          cy.findChildrenByID(testIds.header, testIds.tab).eq(2)
            .should("have.attr", "href", settings.supportURL)
            .and("not.have.class", "Mui-disabled")
            .and("not.to.be.selected")
            .and("have.attr", "target", "_blank");
          cy.findChildrenByID(testIds.header, testIds.tab).eq(3)
            .should("have.attr", "href", "/auth/signup")
            .and("not.have.class", "Mui-disabled")
            .and("not.to.be.selected")
            .and("not.have.attr", "target", "_blank");
          cy.findChildrenByID(testIds.header, testIds.tab).eq(4)
            .should("have.attr", "href", "/auth/signin")
            .and("not.have.class", "Mui-disabled")
            .and("not.to.be.selected")
            .and("not.have.attr", "target", "_blank");

          cy.testID(testIds.subNav).should("not.exist");
        });
      });
    });
  });


  context("Carousel", () => {
    before(() => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_empty.json" });
      cy.visit("/");
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
      cy.fixture("translations/en-US.json").then(enUS => {
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
  });


  context("'Steps' Section", () => {
    before(() => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_empty.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();
    });

    it("should show a 'Steps' Section with an create account section and a 3 steps tutorial section", () => {
      cy.fixture("translations/en-US.json").then(enUS=> {
        cy.testID(testIds.stepsSection).find("h1").should("contain", enUS.sandboxPage.stepsSection.intro);
        cy.testID(testIds.stepsSectionContent).find("section").should("have.length", 2);
      });
    });

    it("should show the correct text and the sign up now button on the create account section", () => {
      cy.fixture("translations/en-US.json").then(enUS=> {
        cy.testID(testIds.stepsSectionContent).find("section").eq(0)
          .should("contain", enUS.sandboxPage.stepsSection.notLoggedIn.heading)
          .and("contain", enUS.sandboxPage.stepsSection.notLoggedIn.paragraphOne)
          .and("contain", enUS.sandboxPage.stepsSection.notLoggedIn.paragraphTwoPartOne)
          .and("contain", enUS.sandboxPage.stepsSection.notLoggedIn.paragraphTwoPartTwo);

        cy.testID(testIds.stepsSectionContent).find("section").eq(0).find("a")
          .should("have.length", 1)
          .should("contain", "Sign up now")
          .should("have.attr", "href", "/auth/signup")
          .and("not.have.class", "Mui-disabled")
          .and("not.have.attr", "target", "_blank");
      });
    });

    it("should show the correct texts and buttons on the three steps section", () => {
      cy.fixture("translations/en-US.json").then(enUS=> {
        cy.testID(testIds.stepOne)
          .should("contain", "1.")
          .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepOne.header)
          .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepOne.paragraphPartOne)
          .and("contain", enUS.sandboxPage.stepsSection.individualSteps.stepOne.paragraphPartTwo);
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
        cy.testID(testIds.stepThree).find("a")
          .should("have.length", 1)
          .should("contain", enUS.sandboxPage.stepsSection.individualSteps.stepThree.buttonLabel)
          .and("have.class", "Mui-disabled");
      });
    });
  });


  context("API Catalog recent additions", () => {
    beforeEach(() => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
    });

    it("should show the section title and a message mentioning the absence of APIs", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_empty.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.fixture("translations/en-US.json").then(enUS=> {
        cy.testID(testIds.recentAdditionsTitle)
          .should("be.visible")
          .and("contain", enUS.sandboxPage.apiCatalog.intro);
        cy.testID(testIds.recentAdditionsCatalog).find("a").should("not.exist");
        cy.testID(testIds.recentAdditionsEmpty)
          .should("be.visible")
          .and("contain", enUS.sandboxPage.apiCatalog.paragraph);
      });
    });

    it("should show the section title and a card for each recent API added", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.fixture("translations/en-US.json").then(enUS => {
        cy.fixture("apis/apis.json").then(apis => {
          cy.testID(testIds.recentAdditionsTitle)
            .should("be.visible")
            .and("contain", enUS.sandboxPage.apiCatalog.intro);
          cy.testID(testIds.recentAdditionsEmpty).should("not.exist");
          cy.testID(testIds.recentAdditionsCatalog).find("a").should("have.length", 2);
          cy.testID(testIds.recentAdditionsCatalog).find("a").eq(0)
            .should("have.attr", "href", `/api-products/details/${
              apis.rows[0].apiVersions[0].apiId
            }/spec/${
              apis.rows[0].apiVersions[0].id
            }`);
          cy.testID(testIds.recentAdditionsCatalog).find("a").eq(1)
            .should("have.attr", "href", `/api-products/details/${
              apis.rows[1].apiVersions[0].apiId
            }/spec/${
              apis.rows[1].apiVersions[0].id
            }`);

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
      });
    });

    it("should show the section title and a card for each recent API added without version", () => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_noversion.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.fixture("translations/en-US.json").then(enUS => {
        cy.fixture("apis/apis_noversion.json").then(apis => {
          cy.testID(testIds.recentAdditionsTitle)
            .should("be.visible")
            .and("contain", enUS.sandboxPage.apiCatalog.intro);
          cy.testID(testIds.recentAdditionsEmpty).should("not.exist");
          cy.testID(testIds.recentAdditionsCatalog).find("a").should("have.length", 0);

          cy.testID(testIds.apiCatalogCard)
            .should("have.length", 1)
            .and("be.visible");

          cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardName)
            .should("have.text", apis.rows[0].name);
          cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardVersion)
            .should("have.text", "No version available");
          cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardAccessType)
            .should("have.text", "API Documentation");
          cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardDescription)
            .should("have.text", "No description presently available.");
        });
      });
    });
  });


  context("Portal Owner Info Panel", () => {
    beforeEach(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
    });

    it("should not show the info panel if there is no website", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.testID(testIds.notice).should("not.exist");
    });

    it("should show the info panel mentioning portal owner's name and link", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.fixture("settings/settings_socialURLs.json").then(settings => {
        cy.fixture("translations/en-US.json").then(enUS => {
          cy.testID(testIds.notice)
            .should("be.visible")
            .and("have.text",
              enUS.sandboxPage.notice
                .replace("{{portalName}}", settings.portalName)
                .replace("{{clientName}}", settings.clientName)
                .replace("<0>{{url}}</0>", settings.socialURLs[0].url)
            );
        });
      });
    });
  });

  context("Footer", () => {
    beforeEach(() => {
      cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
      cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
    });

    it("should show the page footer", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footer).should("be.visible");
    });

    it("should show the portal name and logo", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.fixture("settings/settings.json").then(settings => {
        cy.fixture("owner/owner.json").then(owner => {
          cy.testID(testIds.footerLogoAndPortalName).should("be.visible");

          cy.testID(testIds.footerLogoAndPortalName).find("img")
            .should("have.attr", "src", owner.logo);
          cy.testID(testIds.footerLogoAndPortalName).find("h3")
            .should("contain", settings.portalName);
        });
      });
    });

    it("should show the social icons", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.fixture("settings/settings_socialURLs.json").then(settings => {
        cy.testID(testIds.footerSocialIcons).should("be.visible");

        for (let index = 0; index < settings.socialURLs.length; index++) {
          cy.testID(testIds.footerSocialIcons).find("a").eq(index)
            .should("be.visible")
            .and("have.attr", "href", settings.socialURLs[index].url)
            .and("have.attr", "target", "_blank");
        }
      });
    });

    it("should not show the social icons", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footerSocialIcons).should("not.exist");
    });

    // it("should show the portal structure with links", () => {
    // TODO: test the portal structure links ...
    // });

    it("should show the copyrights", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.fixture("translations/en-US.json").then(enUS => {
        cy.testID(testIds.footerCredits).should("be.visible");
        cy.testID(testIds.footerCredits).find("a")
          .should("be.visible")
          .and("have.attr", "href", "https://apisuite.io/")
          .and("have.attr", "target", "_blank")
          .and("have.text", `\u00A9 ${new Date().getFullYear()} ${enUS.footer.copyrights.website}`);
        cy.testID(testIds.footerCredits).find("p")
          .should("be.visible")
          .and("have.text", enUS.footer.copyrights.allRightsReserved);
      });
    });

    it("should scroll to the top of the current page", () => {
      cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
      cy.visit("/");
      cy.dismissCookiesBanner();

      cy.testID(testIds.footerToTopButton).click();
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      cy.window().its("scrollY").should("equal", 0);
    });

    // it("should switch between languages", () => {
    // TODO: test language switch...
    // });
  });
});
