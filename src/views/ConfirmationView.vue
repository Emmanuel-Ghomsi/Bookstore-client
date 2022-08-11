<template>
  <div>
    <div id="confirmationView">
      <section class="flex">
        <dl>
          <dt>Confirmation #: {{ $store.state.orderDetail.order.confirmationNumber }}</dt>
          <dt>Time: {{ new Date($store.state.orderDetail.order.dateCreated) }}</dt>
        </dl>
      </section>
      <section class="flex">
        <dl class="bloc">
          <dt>Customer Information :</dt>
          <dd>
            {{ $store.state.orderDetail.customer.customerName }}<br>
            {{ $store.state.orderDetail.customer.address }}<br>
            {{ $store.state.orderDetail.customer.email }}<br>
            {{ $store.state.orderDetail.customer.phone }}<br>
          </dd>
        </dl>
      </section>

      <Confirmation-table />
    </div>
    <div class="checkout">
      <div class="btn-group">
        <router-link :to="'/category/' + $store.state.selectedCategoryName" class="btn btn-secondary">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmationTable from "@/components/ConfirmationTable";
export default {
  name: "ConfirmationView",
  components: { ConfirmationTable }
};
</script>

<style scoped>
#confirmationView {
  min-height: 100%;
  margin: 0;
  display: flex;
  flex-flow:  column nowrap;
  justify-content: center;
  align-items:  stretch;
  font-weight: 300;
  background:  #fff;
  color: #666;
  -webkit-print-color-adjust:  exact;
}
#confirmationView > * {
  width: 100%;
  max-width: 12in;
  margin: 20px auto;
  padding: 30px;
  background: #F0f0f0;
  text-align: center;
}
section, table {
  padding: 8px 0;
  position:  relative;
}
dl {
  margin: 0;
  letter-spacing: -4px;
}
dt,dd {
  letter-spacing: normal;
  display: inline-block;
  margin: 0;
  padding: 0px 6px;
  vertical-align: top;
}
dl.bloc > dt,
dl:not(.bloc) dt:not(:last-of-type),
dl:not(.bloc) dd:not(:last-of-type) {
  border-bottom: 1px solid #ddd;
}
dl:not(.bloc) dt {
   border-right: 1px solid #ddd;
 }

dt {
  text-align: right;
  letter-spacing: 1px !important;
  overflow: hidden;
}
dd {
  width: 49%;
  text-align: left;
}
dd,tr>td, section.flex {
  display: flex;
  flex-flow: row wrap;
  padding: 8px 16px;
  justify-content: space-around;
}
dl.bloc {
  padding: 0;
  flex: 1;
  vertical-align: top;
  min-width: 240px;
  margin: 0 8px 8px;
}
dl.bloc>dt {
  text-align: left;
  width: 100%;
  margin-top: 12px;
}
dl.bloc>dd {
  text-align: left;
  width: 100%;
  padding: 8px 0 5px 16px;
  line-height: 1.25;
  background: #fefefe;
}
dl.bloc>dd>dl dt {
  width: 33%;
}
dl.bloc>dd>dl dd {
  width: 60%;
}
dl.bloc dl {
  margin-top: 12px;
}
dl.bloc dd {
  font-size: 11pt;
}
a {
  color: #992C2C;
}
a:hover {
  color: #BB0000;
}
ul {
  text-align: left;
}
ul > li {
  margin: 0.25em;
}
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
</style>
