<template>
<!-- header -->
    <header class="header">
        <router-link to="/" class="brand">
            <i class='bx bx-book-open'></i>
            <span class="logo-name">BOOKWORM</span>
        </router-link>
        <div class="search">
            <input type="text" placeholder="Search a book" class="search-input">
            <i class='bx bx-search'></i>
        </div>
        <div class="dropdown">
          <div class="category" @click="toggleDropdown">
              <a href="#" class="category-link">Browse categories</a>
              <i class='bx bx-caret-down'></i>
          </div>
          <div v-if="open" class="dropdown-category">
            <CategoryNav :active="null" />
          </div>
        </div>
        <div class="login">Sign in</div>
        <router-link to="/cart" class="cart">
            <i class='bx bxs-cart'></i>
            <span class="cart-number">{{ $store.state.cart.numberOfItems }}</span>
        </router-link>
        
    </header>
</template>

<script>
import CategoryNav from "@/components/CategoryNav";

export default {
  name: "Header",
  components: {CategoryNav},
  data: function() {
    return {
      open: false
    };
  },
  created: function() {
    this.open = false;
  },
  methods: {
    toggleDropdown() {
      this.open = !this.open
    }
  }
};
</script>