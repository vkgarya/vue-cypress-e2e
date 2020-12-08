describe("FilterArticles", () => {
    it("filters articles", () => {
        cy.server();
        cy.route("GET", "/articles/*").as("fetchArticle");
        cy.visit("/");

        cy.getByTestId("articleSearchInput").type("Vue{enter}");
        cy.onRoute("articleList");
        cy.contains("VueMastery").click();

        cy.onRoute("article");
    });
});