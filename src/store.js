import Vue from 'vue'
import Vuex from 'vuex'
import * as ApiService from "@/services/ApiService";
import {ShoppingCart} from "@/models/ShoppingCart";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        categories: [],
        selectedCategoryName: "",
        selectedCategoryBooks: [],
        cart: new ShoppingCart(),
        orderDetail: null,
        CART_STORAGE_KEY: "cart",
        ORDER_DETAIL_STORAGE_KEY: "orderDetail",
    },
    mutations: {
        SET_CATEGORIES(state, newCategories) {
            state.categories = newCategories;
        },
        SELECT_CATEGORY(state, category) {
            state.selectedCategoryName = category;
        },
        SET_SELECTED_CATEGORY_BOOKS(state, categoryBooks) {
            state.selectedCategoryBooks = categoryBooks;
        },
        ADD_TO_CART(state, book) {
            state.cart.addItem(book, 1);
            localStorage.setItem(state.CART_STORAGE_KEY, JSON.stringify(this.state.cart));
        },
        UPDATE_BOOK_IN_CART(state, item) {
            state.cart.updateItem(item.book, item.quantity);
            localStorage.setItem(state.CART_STORAGE_KEY, JSON.stringify(this.state.cart));
        },
        SET_CART(state, shoppingCart) {
            localStorage.setItem(state.CART_STORAGE_KEY, JSON.stringify(shoppingCart));
            let newCart = new ShoppingCart();
            shoppingCart.items.forEach(item => {
                newCart.addItem(item.book, item.quantity);
            });
            state.cart = newCart;
        },
        CLEAR_CART(state) {
            localStorage.removeItem(state.CART_STORAGE_KEY)
            state.cart.clear()
        },
        SET_ORDER_DETAIL(state, orderDetail) {
            state.orderDetail = orderDetail
            sessionStorage.setItem(state.ORDER_DETAIL_STORAGE_KEY, JSON.stringify(orderDetail))
        },
        CLEAR_ORDER_DETAIL(state) {
            sessionStorage.removeItem(state.ORDER_DETAIL_STORAGE_KEY)
            state.orderDetail = null
        }
    },
    actions: {
        fetchCategories(context) {
            ApiService.fetchCategories()
            .then(categories => {
                context.commit('SET_CATEGORIES', categories)
            })
            .catch(reason => {
                console.log("Error: " + reason);
            });
        },
        selectCategory(context, name) {
            ApiService.fetchCategoryName(name)
                .then(category => {
                    context.commit('SELECT_CATEGORY', category.name)
                })
                .catch(reason => {
                    console.log("Error: " + reason);
                });
        },
        fetchSelectedCategoryBooks(context) {
            if(context.state.selectedCategoryName === "")
                ApiService.fetchSelectedCategoryBooks("Crime")
                    .then(categoryBooks => {
                        context.commit('SET_SELECTED_CATEGORY_BOOKS', categoryBooks)
                    })
                    .catch(reason => {
                        console.log("Error: " + reason);
                    });
            else
                ApiService.fetchSelectedCategoryBooks(context.state.selectedCategoryName)
                    .then(categoryBooks => {
                        context.commit('SET_SELECTED_CATEGORY_BOOKS', categoryBooks)
                    })
                    .catch(reason => {
                        console.log("Error: " + reason);
                    });
        },
        addToCart(context, book) {
            context.commit('ADD_TO_CART', book)
        },
        updateQuantity(context, item) {
            console.log(item)
            context.commit('UPDATE_BOOK_IN_CART', item)
        },
        placeOrder({ commit, state }, customerForm) {
            commit('CLEAR_ORDER_DETAIL')

            return ApiService.placeOrder({
                cart: state.cart,
                customerForm: customerForm
            }).then(orderDetail => {
                commit('CLEAR_CART')
                commit('SET_ORDER_DETAIL', orderDetail)
            })
        },
    }
});