/// <reference types="Cypress" />
context ("Login logout", () => { //suita
    before(() => {
        cy.visit("https://www.ikea.com/ro/ro/"); 
            Cypress.on("uncaught:exception", (err, runnable) => {
              // returning false here prevents Cypress from failing the test
              return false;
            });
            Cypress.Cookies.defaults({
              //saves cookies until browser is closed
              preserve: (cookie) => {
                return false;
              },
            });
          });
   it ("Test login with valid login data and logout", () => { //test case
                    
        //login with valid data
        cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click();
        cy.get('#username').type("iuliatestingname@gmail.com").should('have.value', 'iuliatestingname@gmail.com');
        cy.get('#Password').type("!@#Paroladetest");
        cy.get('.btn--transactional').click(); 

        //assertion for succesful login
        cy.get('#profile-page-headline').contains("Bună ziua").should('be.visible');

        cy.get('.hnf-header > .hnf-page-container').scrollIntoView();
        cy.get('.hnf-header__shopping-list-link > .hnf-btn > .hnf-btn__inner').click();
        cy.get('.hnf-header > .hnf-page-container').scrollIntoView();
        
        //logout
        cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click();
        cy.get('.profile__dashboard-header-text-wrap > .profile__text-block > .profile__link').click();
        cy.url().should('include', 'logout'); //assertion for logout
        
    });
   it ("Login - invalid data1", () => { //test case
                     
        //login with invalid data - valid email, invalid pass
        cy.visit("https://www.ikea.com/ro/ro/");
        cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click();
        cy.get('#username').type("iuliatestingname@gmail.com").should('have.value', 'iuliatestingname@gmail.com');
        cy.get('#Password').type("!@#Parola");
        cy.get('.btn--transactional').click(); 
        cy.get('.toast__show').should('be.visible'); //assertion for login error with invalid data 
  
    });

    it ("Login - invalid data2", () => { //test case
      
        //login with invalid data - valid email, empty pass
        cy.visit("https://www.ikea.com/ro/ro/");
        cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click();
        cy.get('#username').type("iuliatestingname@gmail.com").should('have.value', 'iuliatestingname@gmail.com');
        cy.get('.btn--transactional').click(); 
        cy.get('.inline-text > span').should('be.visible'); //assertion for login error for empty pass field
    });
    
    it ("Login - invalid data3", () => { //test case
                               
            //login with invalid data - invalid email, valid pass
            cy.visit("https://www.ikea.com/ro/ro/");
            cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click();
            cy.get('#username').type("testingname@gmail.com").should('have.value', 'testingname@gmail.com');
            cy.get('#Password').type("!@#Paroladetest");
            cy.get('.btn--transactional').click(); 
            cy.get('.toast__show').should('be.visible'); //assertion for login error with invalid data     
    });

    it ("Login - invalid data4", () => { //test case
             
        //login with invalid data - invalid email, invalid pass
        cy.visit("https://www.ikea.com/ro/ro/");
        cy.get('.hnf-header__profile-link > .hnf-btn > .hnf-btn__inner > .hnf-btn__copy > .svg-icon > path').click();
        cy.get('#username').type("testingname@gmail.com").should('have.value', 'testingname@gmail.com');
        cy.get('#Password').type("!@#Parola");
        cy.get('.btn--transactional').click(); 
        cy.get('.toast__show').should('be.visible'); //assertion for login error with invalid data     
    });
    
})