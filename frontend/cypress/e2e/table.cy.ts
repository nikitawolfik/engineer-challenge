/// <reference types="cypress" />

describe("Table", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays paginated rows", () => {
    cy.get("tr.border-b").should("have.length", 5);
    // I could've mocked the data but since we're running mocked db then we can rely on it being stable
    cy.get('[data-testid="pagination"]').should("exist");
  });

  it("filters rows via search", () => {
    cy.get("tr.border-b").should("have.length", 5);
    cy.get('[data-testid="pagination"]').should("exist");

    cy.get('[name="search"]').type("Cyrillus");
    cy.get("tr.border-b").should("have.length", 1);
    cy.get('[data-testid="pagination"]').should("not.exist");
  });

  it("filters rows via dropdowns", () => {
    cy.get("tr.border-b").contains("LIABILITY").should("exist");
    cy.get('select[name="insuranceType"]').select("HEALTH");
    cy.get("tr.border-b").contains("LIABILITY").should("not.exist");

    cy.get("tr.border-b").contains("PENDING").should("exist");
    cy.get('select[name="policyStatus"]').select("ACTIVE");
    cy.get("tr.border-b").contains("PENDING").should("not.exist");
  });

  it("shows no results when none found", () => {
    cy.get("tr.border-b").should("exist");
    cy.get("p").contains("No results").should("not.exist");
    cy.get('input[name="search"]').type("qwqwqw");
    cy.get("tr.border-b").should("not.exist");
    cy.get("p").contains("No results").should("exist");
  });

  it.only("resets filters", () => {
    cy.get("tr.border-b").should("exist");
    cy.get("p").contains("No results").should("not.exist");

    cy.get("tr.border-b").contains("Cyrillus Biddlecombe").should("exist");
    cy.get('select[name="insuranceType"]').select("HOUSEHOLD");
    cy.get("tr.border-b").contains("Cyrillus Biddlecombe").should("not.exist");

    cy.get("tr.border-b").contains("Haydon Ballay").should("exist");
    cy.get('select[name="policyStatus"]').select("PENDING");
    cy.get("tr.border-b").contains("Haydon Ballay").should("not.exist");
    cy.get("tr.border-b").should("have.length", 2);

    cy.get('input[name="search"]').type("hello");
    cy.get("tr.border-b").should("not.exist");

    cy.get('[data-testid="resetFilters"]').click();
    cy.get("tr.border-b").should("have.length", 5);
  });
});
