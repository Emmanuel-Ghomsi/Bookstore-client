<template>
  <div>
    <h2 class="mt-3 text-center">We're sorry that page cannot be found on this site.</h2>
    <div class="checkout">
      <div class="btn-group">
        <router-link :to="'/'" class="btn btn-secondary">Continue</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.checkout {
  margin: 50px 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
.btn-secondary {
  background-color: #E6E6E7AF;
  color: #000;
}
.btn-secondary:hover {
  background-color: #B7B7B9AF;
  transition: background-color 0.3s ease-in-out;
}
.mt-3 {
  margin-top: 2em;
}
</style>