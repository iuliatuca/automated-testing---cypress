/// <reference types="Cypress" />
context ("End-to-end automated test", () => { //suita
  before(() => {
             Cypress.on("uncaught:exception", (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false;
          });
  });
  it ("Test with valid data", () => { //test case
             
      cy.visit("https://www.ikea.com/ro/ro/"); //mainpage
      cy.get('#onetrust-accept-btn-handler').click();
      
      //login with valid data
      cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click();
      cy.get('#username').type("iuliatestingname@gmail.com").should('have.value', 'iuliatestingname@gmail.com');
      cy.get('#Password').type("!@#Paroladetest");
      cy.get('.btn--transactional').click(); 
      cy.get('#profile-page-headline').contains("Bună ziua").should('be.visible');
      
                
      //Offers - "Oferte speciale"
      cy.get('.hnf-header__nav__main > :nth-child(5) > a').scrollIntoView().click(); 
      cy.url().should('include', 'offers'); 
      cy.get(':nth-child(2) > .vz2frqh').click();
      cy.get('[aria-label="HEMNES - Birou cu 2 sertare"]').click();
      //add-to-list-button
      cy.get('.range-revamp-buy-module__buttons').trigger('mouseenter', { bubbles: true });//https://docs.cypress.io/api/commands/trigger.html#Syntax
      cy.wait(1000);
      cy.get('.range-revamp-buy-module__buttons').click(); 
      cy.get('.hnf-header > .hnf-page-container').scrollIntoView();
      cy.get('.range-revamp-buy-module__buttons').contains("Salvat").should('be.visible'); //assert that the product was added to shopping list
  
      cy.get('input.search-field__input').click(); //"Search box"
      cy.get('.search-field__input').type("billy");
      cy.get('.search-box__button--search').click();
      cy.url().should('include', '?q=billy');
      cy.wait(1000);
      cy.contains('40x28x202').click();
      cy.get('.range-revamp-buy-module__buttons').trigger('mouseenter', { bubbles: true });//https://docs.cypress.io/api/commands/trigger.html#Syntax
      cy.wait(1000);
      cy.get('.range-revamp-buy-module__buttons').click(); // add-to-list-button
      cy.get('.hnf-header__icons').scrollIntoView();
      cy.get('.range-revamp-buy-module__buttons').contains("Salvat").should('be.visible');
      cy.get('.hnf-header > .hnf-page-container').scrollIntoView();
      cy.get('.hnf-header__shopping-list-link > .hnf-btn > .hnf-btn__inner').click();
        
//Products - "Produse"
      cy.get('.hnf-header__nav__main > :nth-child(1) > a').click();
      cy.get('.hnf-menu__nav2__main > :nth-child(2) > [role="button"]').click();
      cy.wait(1000);
      cy.get(':nth-child(2) > .hnf-menu__nav3 > .hnf-menu__nav3__main > :nth-child(2) > a').click();
      cy.wait(1000);
      cy.contains('Toate').click();
      cy.get('[aria-label="Culoare"] > .plp-toggle-button__label').click();
      cy.get('#bej').click();
      cy.url().should('include', 'bej'); //assert that the Filtering by color works
      cy.get('[aria-label="Close modal"]').click();
      cy.get('.plp-filter').scrollIntoView();
      cy.get('[data-list-position=1]').click();
      cy.wait(1000);
      cy.get('.range-revamp-buy-module__buttons').trigger('mouseenter', { bubbles: true }); //https://docs.cypress.io/api/commands/trigger.html#Syntax
      cy.wait(1000);
      cy.get('.range-revamp-buy-module__buttons').click(); // add-to-list-button
      cy.get('.hnf-header__icons').scrollIntoView();
      cy.get('.range-revamp-buy-module__buttons').contains("Salvat").should('be.visible');//assert that the product was added to shopping list
      cy.get('.hnf-header > .hnf-page-container').scrollIntoView();
      cy.get('.hnf-header__shopping-list-link > .hnf-btn > .hnf-btn__inner').click();
      cy.get('.hnf-header > .hnf-page-container').scrollIntoView();
        
      //delivery - livrare 
      cy.get(':nth-child(2) > .button > .button__text').click();
      cy.get('form > select').select("a74856f3-d2bc-491a-a1eb-311633f0fb6d"); //"Centrul de colectare Timişoara"
      cy.get('.button--primary').click();
      cy.get('.modal-footer > .btn-default').click();
      //delivery - step 2

      cy.get('body').contains("Total de plată").should('be.visible');//assert that 
      cy.get('#confirmBasketForm2 > .button').click();
      //cy.get('#invoiceAddress-street').type("Strada Testing");
      cy.get('#invoiceAddress-streetNumber').type("2");
      //cy.get('#invoiceAddress-zip').type("307285");
      //cy.get('#invoiceAddress-city').type("Mosnita Noua");
        
      //cy.get('#invoiceAddress-email').type("iuliatestingname@gmail.com");
      cy.get('#invoiceAddress-emailRepetition').type("iuliatestingname@gmail.com");
      cy.get('.col-md-12 > :nth-child(11)').type("0723289257");
      cy.get('.col-md-12 > :nth-child(12)').type("0723289257");
      cy.get('#addressFormDisclaimerCheckbox').click();
      cy.wait(1000);
      cy.get('.text-right > .button').focus().click();

      //delivery - step 3   
      cy.wait(1000);
      cy.get('body').contains('Finalizează comanda').should('be.visible');
      cy.wait(1000);
      cy.get('#tocSignedRomcard').click(); 

      //logout  
      cy.get('#allContent').scrollIntoView();
      cy.get('#imgIKEALogoHeader').click(); //go back to mainpage
      cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click(); //go to My account - Contul meu
      cy.wait(5000);
      cy.get('.profile__dashboard-header-text-wrap > .profile__text-block > .profile__link').click();
      cy.url().should('include', 'logout'); //assertion for logout
    });
    
});