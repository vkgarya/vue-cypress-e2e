describe("FilterProducts", () => {
    it("filters products", () => {
        cy.server();
        cy.route("GET", "/products/*").as("fetchProduct");
        cy.visit("/");

        cy.getByTestId("productSearchInput").type("Vue{enter}");
        cy.onRoute("productList");
        cy.contains("VueMastery").click();

        cy.onRoute("product");
    });
});