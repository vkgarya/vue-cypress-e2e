/// <reference types='cypress' />
const clickNext = () => cy.getByTestId("pageNext").click();
const clickPrev = () => cy.getByTestId("pagePrev").click();

const onPage = (number) =>
    cy.getByTestId("paginationCurrentPage").should("contain", number);

describe("Showcases more advanced examples", () => {
    // BeforeEach is called before each context or it
    beforeEach(() => {
        cy.server();
        cy.route("products*").as("fetchProducts");
    });
    context("Test the list", () => {
        it("loads a list of products", () => {
            // load page
            cy.visit("/products");
            // TODO: enable
            cy.wait("@fetchProducts")
                .its("responseBody")
                .as("productsResponse"); // <========= 1. enable this after showing it fails
            // check product is there
            cy.get(".ProductList")
                .children()
                .should("have.length", 1);

            // click next with function
            clickNext();
            // This does not work as it gets the data from the first response.
            // We need to await the first one
            // alias the response of the fetchProducts for later
            cy.wait("@fetchProducts")
                .its("responseBody")
                .as("productsResponse"); // <=========== 2. awaits the first request, not the second

            onPage(2);

            cy.get("@productsResponse").then((products) => {
                cy.log("products", products);
                cy.contains(products[0].name);
                // cy.contains(products[1].name);
            });
        });

        it("spies on the list of products and stubs it", () => {
            cy.visit("/products");
            // await
            cy.wait("@fetchProducts")
                .its("responseBody")
                .then((response) => {
                    expect(response[0]).to.have.property("name", "VueMastery");
                    // assert if any of the elements contains the first item
                    cy.getByTestId("productListItemSeller").should(
                        "contain",
                        response[0].seller
                    );
                    cy.getByTestId("productListItemImage")
                        .first()
                        .should("have.attr", "src", response[0].image);
                });
            // stub
            cy.route({
                method: "GET",
                url: "products*",
                response: [{
                    id: 999,
                    name: "StubbedProducts",
                    seller: "John Doe",
                }, ],
                headers: {
                    "x-total-count": "10",
                },
            }).as("fetchProducts");
            // click next
            clickNext();
            cy.wait("@fetchProducts");
            cy.getByTestId("productListItemSeller").should("contain", "John Doe");
            // unstub
            cy.route("products*").as("fetchProducts"); // <====== unstubs the stubbed request
            // await
            clickNext();
            /* Showcase Nesting to share data */
            cy.wait("@fetchProducts").then(({ responseBody }) => {
                cy.contains("Majesty");
                onPage(3);

                cy.get(".ProductListItem")
                    .first()
                    .click();
                /** We can rely on the response we had from before
                 * OR
                 * We can await for the new request so we are sure we have the right response
                 * ! We dont need to await anything, it just works.
                 */
                cy.onRoute("product");
                cy.contains(responseBody[0].name);
                cy.getByTestId("productImage").should(
                    "have.attr",
                    "src",
                    responseBody[0].image
                );
            });
        });

        it("uses a fixtures as response", () => {
            // stub the request
            cy.route("GET", "products*", "fixture:products.json").as("fetchProducts");
            cy.visit("/products");

            cy.contains("Dobromir Hristov");
            cy.contains("e2e testing with Cypress.io");
        });
    });

    context("Test the single page", () => {
        it("allows pre-fetching the data to allow going to a page directly", () => {
            cy.route("products/*").as("fetchProduct");
            // Spy on product route
            let firstItem = {};
            cy.request({
                    // we can use the ENV from plugins/index.js
                    url: Cypress.env("API_BASE_URL") + "/products",
                })
                .then((response) => {
                    firstItem = response.body[0];
                    return firstItem;
                })
                .as("fetchProducts");
            // This does not work
            // cy.visit('/products/' + firstItem.id) // <================== Does not work like that

            /**
             * This however works. We await for that request and when done, we use the stored data.
             * We can also return the data and use it in the then callback.
             * We can use cy.get with response aliases
             */
            cy.get("@fetchProducts").then((response) => {
                cy.log(response); // should be first item
                cy.visit("/products/" + firstItem.id);
                cy.getByTestId("productImage")
                    //.should('be.visible')
                    .should("have.attr", "src", firstItem.image);

                cy.getByTestId("productName").should("contain", firstItem.name);

                cy.getByTestId("productSeller").should("contain", firstItem.seller);

                cy.getByTestId("productRating").should("contain", firstItem.rating);

                cy.getByTestId("productBody").should("contain", firstItem.body);
            });
        });
    });
});