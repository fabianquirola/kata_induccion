import { times,delay } from 'lodash';
describe('Game of life tests',function (){
  it('Should enter game of life',function(){
    cy.visit('http://localhost:3000');

    cy.contains('Game of Life').click();
    cy.url()
    .should('include','/group');

  })

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('Game of Life').click();

  })

  it('Test 1 case Still lifes',function(){
   
    cy.get('#new_blank').click();

    cy.get(':nth-child(7) > :nth-child(10)').click();
    cy.get(':nth-child(7) > :nth-child(11)').click();
    cy.get(':nth-child(8) > :nth-child(10)').click();
    cy.get(':nth-child(8) > :nth-child(11)').click();

    cy.get('#alive_counter').should('have.html','4');

    cy.get('#step').click();

    cy.get('#alive_counter').should('have.html','4');

    cy.get(':nth-child(7) > :nth-child(10)').should('have.class','liveCell');
    cy.get(':nth-child(7) > :nth-child(11)').should('have.class','liveCell');
    cy.get(':nth-child(8) > :nth-child(10)').should('have.class','liveCell');
    cy.get(':nth-child(8) > :nth-child(11)').should('have.class','liveCell');

    cy.get('#generation_counter').should('have.html','2');

  })

  it('Test 2 case Oscillators',function(){
   
    cy.get('#new_blank').click();

    cy.get(':nth-child(8) > :nth-child(10)').click();
    cy.get(':nth-child(8) > :nth-child(11)').click();
    cy.get(':nth-child(8) > :nth-child(12)').click();

    cy.get('#alive_counter').should('have.html','3');

    cy.get('#step').click();

    cy.get('#alive_counter').should('have.html','3');

    cy.get(':nth-child(9) > :nth-child(11)').should('have.class','liveCell');
    cy.get(':nth-child(7) > :nth-child(11)').should('have.class','liveCell');
    cy.get(':nth-child(8) > :nth-child(11)').should('have.class','liveCell');


    cy.get('#generation_counter').should('have.html','2');

  })

  it('Test 3 case Spaceships',function(){
   
    cy.get('#new_blank').click();

    cy.get('.col-9 > :nth-child(1) > :nth-child(3)').click();
    cy.get('.col-9 > :nth-child(2) > :nth-child(1)').click();
    cy.get('.col-9 > :nth-child(2) > :nth-child(3)').click();
    cy.get(':nth-child(3) > :nth-child(2)').click();
    cy.get(':nth-child(3) > :nth-child(3)').click();

    cy.get('#alive_counter').should('have.html','5');

    
    times(48, () => {
      cy.get('#step').click();
    })

    cy.get(':nth-child(13) > :nth-child(15)').should('have.class','liveCell');
    cy.get(':nth-child(14) > :nth-child(13)').should('have.class','liveCell');
    cy.get(':nth-child(14) > :nth-child(15)').should('have.class','liveCell');
    cy.get(':nth-child(15) > :nth-child(14)').should('have.class','liveCell');
    cy.get(':nth-child(15) > :nth-child(15)').should('have.class','liveCell');

    cy.get('#alive_counter').should('have.html','5');


  })

  it('Test 4 case Spaceships / Play Stop button',function(){
   
    cy.get('#new_blank').click();
    cy.get('.col-9 > :nth-child(1) > :nth-child(3)').click();
    cy.get('.col-9 > :nth-child(2) > :nth-child(1)').click();
    cy.get('.col-9 > :nth-child(2) > :nth-child(3)').click();
    cy.get(':nth-child(3) > :nth-child(2)').click();
    cy.get(':nth-child(3) > :nth-child(3)').click();
    
    cy.get('#alive_counter').should('have.html','5');
    
    cy.get('#play').click();
    
    cy.wait(3950);
    
    cy.get('#stop').click();

    cy.get(':nth-child(11) > :nth-child(13)').should('have.class','liveCell');
    cy.get(':nth-child(12) > :nth-child(11)').should('have.class','liveCell');
    cy.get(':nth-child(12) > :nth-child(13)').should('have.class','liveCell');
    cy.get(':nth-child(13) > :nth-child(13)').should('have.class','liveCell');
    cy.get(':nth-child(13) > :nth-child(12)').should('have.class','liveCell');

    cy.get('#alive_counter').should('have.html','5');
  
  })

  it('Test 5 Create new blank board',function(){
   
    cy.get('#new_blank').click();
    cy.get('#alive_counter').should('have.html','0');
    cy.get('#new_random').click();

    cy.get('#step').click();
    
    cy.get('#play').click();
    
    cy.wait(1000);
    
    cy.get('#stop').click();

    cy.get('#generation_counter').should('have.html','13');
    cy.get('#new_blank').click();
    cy.get('#alive_counter').should('have.html','0');
  
  })

  it('Back to Home',function(){
   
    cy.contains('Home').click();
    cy.url()
    .should('include','/');
  
  })
});