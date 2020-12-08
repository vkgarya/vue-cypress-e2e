/// <reference types='cypress' />
describe("Shows how to test a basic form", () => {
    it("fills in the form", () => {
        cy.server();
        // Stub the POST request to /products and return a 403
        cy.route({
            method: "POST",
            url: "products*",
            status: "403",
            response: "Invalid image",
        });

        // visit the page
        cy.visit("/add-product");

        // submit without any data
        cy.getByTestId("submit").click();

        // check if fields have errors and type into them
        cy.getByTestId("name")
            .isInvalid("Name is required")
            .type("Vue enterprise boilerplate");

        cy.getByTestId("seller")
            .isInvalid("Seller is required")
            .type("Chris Fritz");

        cy.getByTestId("image")
            .type("Vue enterprise boilerplate")
            .isInvalid("Image must be a valid url")
            .clear()
            .type(
                "https://cdn-images-1.medium.com/max/2000/1*PHmNXbvOfg5AHiMWWuaRXg.jpeg"
            );

        cy.getByTestId("rating")
            .invoke("val", "3")
            .trigger("input");

        cy.getByTestId("body").type("Lorem Ipsum .... whatever");

        cy.getByTestId("submit").click();

        cy.isPopupVisible("error", "Invalid image", true);

        cy.route("POST", "products").as("postProduct"); // unstub

        cy.getByTestId("submit").click();

        cy.isPopupVisible(
            "info",
            "Vue enterprise boilerplate saved successfully.",
            true
        );

        cy.wait("@postProduct")
            .its("responseBody")
            .then((body) => {
                cy.url().should("contain", `products/${body.id}`);

                cy.getByTestId("productName").should("contain", body.name);

                cy.getByTestId("productRating").should("contain", body.rating);
            });
    });
});