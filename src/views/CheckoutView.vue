<template>
  <div>
    <div class="cart">
      <section class="categoryView" v-if="($store.state.cart.numberOfItems > 0)">
        <form @submit.prevent="submitOrder" v-on:reset="resetOrder">
          <div class="form-group">
            <div class="form-control">
              <div>
                <label for="name" class="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-input"
                    v-model.lazy="$v.name.$model"
                />
              </div>
              <template v-if="$v.name.$error">
                  <span class="error" v-if="!$v.name.required">Name is required</span>
                  <span class="error" v-else-if="!$v.name.minLength">
                    Name must have at least
                    {{ $v.name.$params.minLength.min }} letters.
                  </span>
                  <span class="error" v-else-if="!$v.name.maxLength">
                    Name can have at most
                    {{ $v.name.$params.maxLength.max }} letters.
                  </span>
                  <span class="error" v-else> An unexpected error occurred. </span>
              </template>
            </div>
            <div class="form-control">
              <div>
                <label for="address" class="form-label">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    class="form-input"
                    v-model.lazy="$v.address.$model"
                />
              </div>
              <template v-if="$v.address.$error">
                  <span class="error" v-if="!$v.address.required">Address is required</span>
                  <span class="error" v-else-if="!$v.address.minLength">
                    Address must have at least
                    {{ $v.address.$params.minLength.min }} letters.
                  </span>
                  <span class="error" v-else-if="!$v.address.maxLength">
                    Address can have at most
                    {{ $v.address.$params.maxLength.max }} letters.
                  </span>
                  <span class="error" v-else> An unexpected error occurred. </span>
              </template>
            </div>
          </div>

          <div class="form-group">
            <div class="form-control pr-2">
              <div>
                <label for="phone">Phone</label>
                <input
                    class="form-input"
                  type="text"
                  id="phone"
                  name="phone"
                  v-model.lazy="$v.phone.$model"
                />
              </div>
              <template v-if="$v.phone.$error">
                <span class="error" v-if="!$v.phone.required">Phone is required</span>
                <span class="error" v-else-if="!$v.phone.phone">The format of the phone number is not valid.</span>
                <span class="error" v-else> An unexpected error occurred. </span>
              </template>
            </div>
            <div class="form-control pl-2">
              <div>
                <label for="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    class="form-input"
                    v-model.lazy="$v.email.$model"
                />
              </div>
              <template v-if="$v.email.$error">
                <span class="error" v-if="!$v.email.required">Email is required</span>
                <span class="error" v-else-if="!$v.email.email">The format of the email is not valid.</span>
                <span class="error" v-else> An unexpected error occurred. </span>
              </template>
            </div>
          </div>

          <div class="form-control">
            <div>
              <label for="ccNumber">Credit card</label>
              <input type="text" id="ccNumber" name="ccNumber" class="form-input" v-model.lazy="$v.ccNumber.$model" />
            </div>
            <template v-if="$v.ccNumber.$error">
              <span class="error" v-if="!$v.ccNumber.required">Credit card is required</span>
              <span class="error" v-else-if="!$v.ccNumber.creditCard">This number does not correspond to a valid card.</span>
              <span class="error" v-else> An unexpected error occurred. </span>
            </template>
          </div>

          <div class="form-group">
            <div class="form-control">
              <label>Exp Month</label>
              <select class="form-select" v-model="ccExpiryMonth">
                <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index + 1"
                >
                  {{ month }} ({{ index + 1 }})
                </option>
              </select>
            </div>
            <div class="form-control">
              <label>Exp Year</label>
              <select class="form-select" v-model="ccExpiryYear">
                <option
                    v-for="(year, index) in years"
                    :key="index"
                    :value="year"
                >
                  {{ year }}
                </option>
              </select>
            </div>
          </div>

          <div class="btn-group">
            <input
                type="reset"
                name="reset"
                :disabled="checkoutStatus === 'PENDING'"
                value="Reset Form"
                class="btn btn-secondary"
            />
            <input
                type="submit"
                name="submit"
                :disabled="checkoutStatus === 'PENDING'"
                value="Complete Purchase"
                class="btn btn-primary"
            />
          </div>
      </form>

        <div class="mt-1">
          <div>Your credit card will be charged <span class="fw-bold">{{ $store.state.cart.total | asDollarsAndCents }}</span> (<span class="fw-bold">{{ $store.state.cart.subtotal | asDollarsAndCents }}</span> + <span class="fw-bold">{{ $store.state.cart.surcharge | asDollarsAndCents }}</span> shipping)</div>
        </div>

      <section v-show="checkoutStatus !== ''" class="alert-info mt-1">
        <div v-if="checkoutStatus === 'ERROR'">
          Error: Please fix the problems above and try again.
        </div>

        <div v-else-if="checkoutStatus === 'PENDING'">Processing...</div>

        <div v-else-if="checkoutStatus === 'OK'">Order placed...</div>

        <div v-else>
          <!-- "checkoutStatus == 'SERVER_ERROR'" -->
          An unexpected error occurred, please try again.
        </div>
      </section>
    </section>

      <div v-else class="alert-info">
        You need to add an item to your Cart to checkout
      </div>
    </div>
    <div class="btn-group">
      <router-link :to="'/category/' + $store.state.selectedCategoryName" class="btn btn-secondary" v-if="($store.state.cart.numberOfItems <= 0)">Continue Shopping</router-link>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

import isCreditCard from "validator/lib/isCreditCard";
import isMobilePhone from "validator/lib/isMobilePhone";

const phone = value => isMobilePhone(value, "en-US");
const creditCard = value => isCreditCard(value);

export default {
  name: "CheckoutView",
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      email: "",
      ccNumber: "",
      ccExpiryMonth: new Date().getMonth() + 1,
      ccExpiryYear: new Date().getFullYear(),
      checkoutStatus: "",
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45),
    },
    address: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45),
    },
    phone: {
      required,
      phone
    },
    email: {
      required,
      email
    },
    ccNumber: {
      required,
      creditCard
    },
  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
    months() {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    },
    years() {
      return [
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "2031",
        "2032",
        "2033",
        "2034",
        "2035",
        "2036",
      ];
    },
  },

  methods: {
    resetOrder() {
      console.log('Reset order')
      this.$v.$reset()
      this.checkoutStatus = ''
    },
    submitOrder() {
      console.log("Submit order");
      this.$v.$touch(); // Ensures validators always run
      if (this.$v.$invalid) {
        this.checkoutStatus = "ERROR";
      } else {
        this.checkoutStatus = "PENDING";
        this.$store
        .dispatch('placeOrder', {
          name: this.name,
          address: this.address,
          phone: this.phone,
          email: this.email,
          ccNumber: this.ccNumber,
          ccExpiryMonth: this.ccExpiryMonth,
          ccExpiryYear: this.ccExpiryYear
        })
        .then(() => {
          this.checkoutStatus = 'OK'
          this.$router.push({ name: 'confirmation' })
        })
        .catch(reason => {
          this.checkoutStatus = 'SERVER_ERROR'
          console.log('Error placing order', reason)
        })
      }
    },

    /* NOTE: For example yearFrom(0) == 2019 */
    yearFrom(index) {
      return new Date().getFullYear() + index;
    },
  },
};
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
.categoryView {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0px 5px 20px #5E21C259;
  cursor: default;
}
form {
  display: flex;
  flex-direction: column;
}
.form-group {
  display: flex;
  justify-content: space-between;
}
.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
}
.form-label {
  display: block;
  margin-bottom: 0.6em;
}
.form-input,
.form-select {
  width: 100%;
  padding: 5px;
  border: 0;
  border-bottom: 2px solid rgba(94, 33, 194, 0.69);
}
.form-input:focus,
.form-select:focus {
  border: 0;
}
.pl-2 {
  padding-left: 0.8em;
}
.pr-2 {
  padding-right: 0.8em;
}
.mt-1 {
  margin-top: 1.5em;
}
.error {
  margin-top: 5px;
  color: red;
  font-size: 13px;
  font-style: italic;
}
.fw-bold {
  font-weight: bold;
}
.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
}
</style>
