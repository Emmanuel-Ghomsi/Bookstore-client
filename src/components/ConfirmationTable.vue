<template>
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(item, index) in this.$store.state.orderDetail.lineItems"
        :key="item.productId"
    >
      <td>
        {{ $store.state.orderDetail.books[index].title }}
      </td>
      <td>{{ item.quantity }}</td>
      <td>{{ $store.state.orderDetail.books[index].price * item.quantity | asDollarsAndCents }}</td>
    </tr>
    </tbody>

    <tfoot>
    <tr>
      <td colspan="2">Delivery Surcharge</td>
      <td>{{ $store.state.cart.surcharge | asDollarsAndCents }}</td>
    </tr>
      <tr>
        <td colspan="2" class="total">Total</td>
        <td class="fw-bold">{{ $store.state.orderDetail.order.amount | asDollarsAndCents }}</td>
      </tr>
    </tfoot>

  </table>
</template>

<script>
export default {
  name: "ConfirmationTable"
};
</script>

<style scoped>
table {
  width: 100%;
  padding: 0;
  border-spacing: 0;
}
tr {
  margin: 0;
  padding: 0;
  background:  #fdfdfd;
  border-right: 1px solid #ddd;
  width: 100%;
}
td, th {
  border:  1px solid #e3e3e3;
  border-top: 1px solid white;
  border-left-color: #fff;
  font-size: 11pt;
  background: #fdfdfd;
}
thead th {
  background: #E9E9E9;
  background: linear-gradient(to bottom, #f9f9f9, #e9e9e9) !important;
  font-weight: 300;
  letter-spacing: 1px;
  padding: 15px 0 5px;
  border: none !important;
}
tbody tr:last-child td {
  border-bottom :1px solid #ddd;
}
td {
  min-width: 75px;
  padding:  3px 6px;
  line-height: 1.25;
}
tfoot tr td {
  height: 40px;
  padding: 6px 0 0;
  color: #000;
  text-shadow: 0 0 1px rgba(0,0,0,.25);
  font-weight: 400;
  letter-spacing: 1px;
}
td:first-child {
  font-style: italic;
  color: rgba(94, 33, 194, 0.69);
}
.total {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}
.fw-bold {
  font-weight: bold;
}
</style>
