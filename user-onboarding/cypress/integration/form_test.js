describe("This is our first test!", () => {
  it("Should return True", () => {
    expect(true).to.equal(true);
  });
});

//Arrange
describe("Form Testing", () => {
  beforeEach( () => {
    cy.visit("http://localhost:3000/")
  });

//Arrange - Gets the element
//Act - Simulates user interaction
//Assert - Test/Verify

  it("Input name into the name input", () => {
    cy.get('#name')
    .type("Emilio Crocco")
    .should("have.value", "Emilio Crocco")
    .type( " is awesome")
    .should("have.value", "Emilio Crocco is awesome");
  });

  it("Testing email input", () => {
    //Testing for value
    cy.get('#email')
    .type("test@test.com")
    .should("have.value", "test@test.com")
    .clear();
    //Testing for valid email
    cy.get('#email')
    .type("tester")
    cy.get('[for="email"]')
    cy.contains("Must be a valid email address")
    //Testing for empty box
    cy.get('#email')
    .clear();
    cy.get('[for="email"]')
    cy.contains("You must include an email address")
  })

  it("Testing password Input", () => {
    cy.get('#password')
    .type("12345678")
    .should("have.length", )
    .should( ($password) => {
      expect($password).to.have.length(8)
    })
  })

  it("Testing to verify terms and conditions check", () => {
      cy.get('input[type="checkbox"]').check().should("be.checked");
    });

  it("Checks for form submission", () => {
      cy.get("form").submit();
    });

  describe("Testing Submit if input is blank", () => {
    it("display form validation", () => {
      cy.get('#name').type("Test").should("not.have.value", "").clear();
      cy.get("form").submit();
      cy.get(".error");
    });
  });
});