<template>
  <section class="books">
    <div class="list-book">
      <div class="book" v-for="book in $store.state.selectedCategoryBooks" :key="book.bookId">
        <div class="book-img-div">
          <img :src="require(`@/assets/images/${bookImageFileName(book)}`)" :alt="book.title" class="book-img">
        </div>
        <h1 class="mt-2">{{ book.title }}</h1>
        <h3>{{ book.author }}</h3>
        <p>{{ book.description }}</p>
        <a href="#" class="read-more">Read more</a>
        <h6 class="price">{{ book.price | asDollarsAndCents }}</h6>
        <button class="add-cart" @click="addToCart(book)">Add to cart</button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "BooksList",
  methods: {
    bookImageFileName(book) {
      let name = book.title.toLowerCase()
      name = name.replace(/ /g, '-')
      if(name.indexOf("!") !== -1) name = name.substring(0, name.length - 1)
      return `${name}.jpeg`
    },
    addToCart(book) {
      this.$store.dispatch("addToCart", book);
    }
  }
}
</script>