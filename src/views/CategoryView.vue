<template>
  <div>
    <!-- section categories -->
    <section class="categories">
      <h1>List of categories</h1>
      <CategoryNav :active="$route.meta.set" />
    </section>

    <!-- section book  -->
    <BooksList />
  </div>
</template>

<script>
import CategoryNav from "@/components/CategoryNav";
import BooksList from "@/components/BooksList";

export default {
  name: "CategoryView",
  components: {BooksList, CategoryNav},
  created: function() {
    (this.$route.params.name === undefined) ? this.$store.dispatch("selectCategory", this.$route.meta.set) : this.$store.dispatch("selectCategory", this.$route.params.name);

    // TODO set a skeleton loader to wait the store state selectedCategoryName changed
    setTimeout(() => {
      console.log(this.$store.state.selectedCategoryName);
      this.$store.dispatch("fetchSelectedCategoryBooks");
    }, 3000);
  }
};
</script>