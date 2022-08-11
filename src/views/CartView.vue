<template>
  <div>
    <div class="cart">
      <CartTable v-if="($store.state.cart.numberOfItems > 0)" />
      <div v-else class="alert-info">
        Your Shopping Cart is empty
      </div>
    </div>
    <div class="btn-group">
      <router-link :to="'/category/' + $store.state.selectedCategoryName" class="btn btn-secondary">Continue Shopping</router-link>
      <router-link :to="'/checkout'" class="btn btn-primary" v-if="($store.state.cart.numberOfItems > 0)">Proceed to Checkout</router-link>
    </div>
  </div>
</template>

<script>
import CartTable from "@/components/CartTable";
export default {
  name: "CartView",
  components: {CartTable}
}
</script>

<style scoped>
.cart {
  margin: 50px 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert-info {
  padding: 20px;
  font-size: 20px;
  background-color: rgba(112, 64, 190, 0.69);
  color: #ffff;
}
.btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.btn {
  padding: 20px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
}
.btn-primary {
  background-color: rgba(94, 33, 194, 0.69);
  color: #ffff;
}
.btn-primary:hover {
  background-color: #2B0464AF;
  transition: background-color 0.3s ease-in-out;
}
.btn-secondary {
  background-color: #E6E6E7AF;
  color: #000;
}
.btn-secondary:hover {
  background-color: #B7B7B9AF;
  transition: background-color 0.3s ease-in-out;
}
</style>