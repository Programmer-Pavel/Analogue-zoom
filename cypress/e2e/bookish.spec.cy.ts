describe("Bookish application", function () {
  it("Shows a book list", () => {
    cy.visit("http://localhost:8080/");
    cy.get("#book-list").should("exist");
    cy.get("div.book-item").should((books) => {
      expect(books).to.have.length(2);
      const titles = [...books].map((x) => x.querySelector("h2").innerHTML);
      expect(titles).to.deep.equal(["Refactoring", "Domain-driven design"]);
    });
  });
});
