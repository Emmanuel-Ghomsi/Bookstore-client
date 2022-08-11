import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import CartView from "../views/CartView";
import CheckoutView from "@/views/CheckoutView";
import ConfirmationView from "@/views/ConfirmationView";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter);

const categoryTab = ['Crime','Adventure','Comedy','Suspense']

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    alias: ['/home', '/index.*'],
    meta: { set: categoryTab[Math.floor(Math.random() * categoryTab.length)] }
  },
  {
    path: "/category",
    name: "category",
    component: CategoryView,
    meta: { set: 'Crime' }
  },
  {
    path: "/category/:name",
    name: "book_by_category_name",
    component: CategoryView,
  },
  {
    path: "/cart/",
    name: "cart",
    component: CartView,
  },
  {
    path: "/checkout/",
    name: "checkout",
    component: CheckoutView,
  },
  {
    path: "/confirmation/",
    name: "confirmation",
    component: ConfirmationView,
  },
  { path: '*', component: NotFound}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
