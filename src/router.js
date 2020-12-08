import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

function load(component) {
    return () =>
        import (`./views/${component}.vue`);
}

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/add-product",
            name: "addProduct",
            component: load("RegisterProduct"),
        },
        {
            path: "/products",
            name: "productList",
            component: load("Products"),
        },
        {
            path: "/products/:id",
            name: "product",
            props: true,
            component: load("Product"),
        },
    ],
});