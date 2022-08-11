<template>
  <div class="Cart-Container">
    <!-- Header -->
    <div class="Header">
      <h3 class="Heading">Your Shopping Cart contains {{ $store.state.cart.numberOfItems }} {{ $store.state.cart.numberOfItems == 1 ? 'item' : 'items' }}</h3>
      <h5 class="Action" @click="$store.commit('CLEAR_CART')">Clear Cart</h5>
    </div>

    <!-- Body -->
    <div v-for="item in $store.state.cart.items" :key="item.book.bookId">
      <div class="Cart-Items" v-if="item.quantity > 0">
        <div class="image-box">
          <img :src="require(`@/assets/images/${bookImageFileName(item.book)}`)" :alt="item.book.title" />
        </div>

        <!-- Detail -->
        <div class="about">
          <h1 class="title">{{ item.book.title }}</h1>
          <h3 class="subtitle">{{ item.book.price | asDollarsAndCents }}</h3>
        </div>

        <!-- Counter -->
        <div class="counter">
          <div class="btn" @click="updateQuantity(item.book, (item.quantity + 1))">+</div>
          <div class="count">{{ item.quantity }}</div>
          <div class="btn" @click="updateQuantity(item.book, (item.quantity - 1))">-</div>
        </div>

        <!-- Price -->
        <div class="prices">
          <div class="amount">{{ item.quantity * item.book.price | asDollarsAndCents }}</div>
          <div class="remove" @click="updateQuantity(item.book, 0)"><u>Remove</u></div>
        </div>
      </div>

    </div>

    <!-- Checkout section -->
    <hr>
    <div class="checkout">
      <div class="total">
        <div class="Subtotal">Sub-Total</div>
        <div class="total-amount">{{ $store.state.cart.subtotal | asDollarsAndCents }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartTable",
  methods: {
    bookImageFileName(book) {
      let name = book.title.toLowerCase()
      name = name.replace(/ /g, '-')
      if(name.indexOf("!") !== -1) name = name.substring(0, name.length - 1)
      return `${name}.jpeg`
    },
    updateQuantity(book, quantity) {
      let item = {
        book: book,
        quantity: quantity
      }
      this.$store.dispatch("updateQuantity", item)
    }
  }
}
</script>

<style scoped>
/* Header */
.Cart-Container {
  width: 70%;
  padding: 50px 0;
  background-color: #f8f7f7;
  border-radius: 20px;
  box-shadow: 0px 5px 20px #5E21C259;
  cursor: default;
}
.Header{
  margin: auto;
  width: 90%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Heading{
  font-size: 20px;
  font-weight: 700;
  color: #2F3841;
}
.Action{
  font-size: 18px;
  font-weight: 600;
  color: #E44C4C;
  cursor: pointer;
  border-bottom: 1px solid #E44C4C;
}

/* Body */
.Cart-Items{
  margin: auto;
  padding: 50px 0 20px 0;
  width: 90%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-box{
  width: 15%;
  text-align: center;
}
.image-box img {
  height: 120px;
}

/* Detail */
.about{
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
}
.title{
  font-weight: 700;
  font-size: 22px;
}
.subtitle{
  font-size: 18px;
  font-weight: 600;
  color: #909090;
}

/* Counter */
.counter{
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 900;
  color: #202020;
  cursor: pointer;
}
.count{
  font-size: 16px;
  font-weight: 900;
  color: #202020;
}

/* Price */
.prices{
  text-align: right;
}
.amount{
  font-size: 20px;
  font-weight: 700;
}
.remove{
  padding-top: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #E44C4C;
  cursor: pointer;
}

/* Checkout section */
hr{
  width: 66%;
  float: right;
  margin-top: 10px;
  margin-right: 5%;
}
.checkout{
  float: right;
  margin-top: 10px;
  margin-right: 5%;
  width: 28%;
}
.total{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.Subtotal{
  font-size: 18px;
  font-weight: 700;
}
.total-amount{
  font-size: 20px;
  font-weight: 700;
}
</style>