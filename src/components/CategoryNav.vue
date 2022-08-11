<template>
    <div class="list-category">
      <div v-for="category in $store.state.categories" :key="category.categoryId" class="categoty-link">
        <router-link :to="'/category/' + category.name" v-if="($store.state.selectedCategoryName === category.name) || (active === category.name)" class="best-seller">{{ category.name }}</router-link>
        <router-link :to="'/category/' + category.name" v-else>{{ category.name }}</router-link>
      </div>
    </div>
</template>

<script>

export default {
  name: "CategoryNav",
  props: ['active']
}
</script>