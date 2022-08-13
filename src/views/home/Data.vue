<template>
  <v-row class="main" no-gutters>
    <v-col cols="12">
      <br><br>
      <v-container>
        <CardProduct  @openProduct="obtainProduct($event)" v-for="(product,index) in products" :key="index" :item="product" :name="product.name" :url="product.imageUrl" :price="product.price" ></CardProduct>
      </v-container>

      <product-dialog></product-dialog>
    </v-col>

  </v-row>
</template>

<script>
// import selectValue from '../../components/inputs/selectValue.vue';
import {mapActions, mapState} from 'vuex';
import CardProduct from '../../components/CardProduct.vue'
import ProductDialog from '../../components/dialogs/ProductDialog.vue';
import Product from '../../models/Product';
// import Data from '../../models/Data'

export default {
  components: {
    CardProduct,
    ProductDialog
  },
  data: () => ({
    productList: [],
    // products: [{name:"Prueba1",id:'1',price:'12.5'},{name:"Prueba2",id:'2',price:'12.5'}],
    locations: [{name: 'Paises', id: '1'}, {name: 'Departamentos', id: '2'}, {name: 'Municipios', id: '3'}],
  }),
  created() {
    this.getProducts();
  },
  computed: {
    ...mapState('product', ['products']),
  },
  watch:{
    products(value){
      this.productList= value;
    }
  },
  // components:{CardProduct},
  methods: {
    ...mapActions('product', ['getProducts','dialogProductOpen']),
    seeProduct() {
      this.getProducts();
    },
    obtainProduct(product) {
      var currentProduct=new Product(product.productId, product.name, product.price, product.amount,product.request, product.brand, product.imageUrl)
      this.dialogProductOpen({product: currentProduct, title: "Producto"})

    },
  }
}
</script>

<style lang="sass">
@import "@/styles/views/_data.sass"
</style>