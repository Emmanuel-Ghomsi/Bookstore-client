<template>
  <div>
    <!-- section -->
    <section class="welcome">
      <div class="special">
        <h6>Back to school</h6>
        <p>
          Special <span>50% off</span><br />
          For our student company
        </p>
        <router-link to="/category"><button>Shop now</button></router-link>
      </div>
      <div class="banner"></div>
    </section>

    <!-- Random books list -->
    <SuggestedBooksList />
  </div>
</template>

<script>
import SuggestedBooksList from "@/components/SuggestedBooksList";

export default {
  name: "HomeView",
  components: {SuggestedBooksList},

  created: function() {
    this.$store.dispatch("fetchSelectedCategoryBooks");
  },
};
</script>
