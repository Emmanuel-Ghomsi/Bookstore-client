<template>
  <div id="app">
    <Header />
    <router-view id="router-view" :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created: function() {
    this.$store.dispatch("fetchCategories");
    const cartString = localStorage.getItem(this.$store.state.CART_STORAGE_KEY);

    if (cartString) {
      const shoppingCart = JSON.parse(cartString);
      this.$store.commit("SET_CART", shoppingCart);
    }

    const orderDetailString = sessionStorage.getItem(this.$store.state.ORDER_DETAIL_STORAGE_KEY)
    if (orderDetailString) {
      const orderDetailData = JSON.parse(orderDetailString)
      this.$store.commit('SET_ORDER_DETAIL', orderDetailData)
    }
  }
};
</script>
