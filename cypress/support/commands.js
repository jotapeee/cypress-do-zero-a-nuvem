Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (dado = {
firstname: 'jota',
    lastname: 'peter',
    email: 'jotinhapcpsn@gmail.com',
    text:'Testeererereree' 

}) => {

    cy.get('input[name="firstName"]').type(dado.firstname); 
    cy.get('input[name="lastName"]').type(dado.lastname); 
    cy.get('input[type="email"]').type(dado.email);
    cy.get('#open-text-area').type(dado.text);
    cy.contains('button', 'Enviar').click();


})