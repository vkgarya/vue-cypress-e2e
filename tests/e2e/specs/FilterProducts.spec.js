describe("FilterProducts", () => {
    it("filters products", () => {
        cy.server();
        cy.route("GET", "/products/*").as("fetchProduct");
        cy.visit("/");

        cy.getByTestId("productSearchInput").type("Boat{enter}");
        cy.onRoute("productList");
        cy.contains("Boat").click();

        cy.onRoute("product");
    });
});