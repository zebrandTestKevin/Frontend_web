<template>
  <v-row class="main" no-gutters>
    <v-col cols="12">
      <br><br>
      <v-container>
        <CardProduct v-for="(product,index) in products" :key="index" :name="product.name"></CardProduct>
        <!-- <CardProduct></CardProduct> -->
        <!-- <CardProduct></CardProduct> -->
        <!-- <CardProduct></CardProduct> -->
      </v-container>
      <v-container>
        <!-- <v-row class="justify-center" align="center"
               justify="center" no-gutters>

          <v-col cols="6" xl="3" md="4">
            <select-value
                :items="locations"
                :label="'Tipo'"
                v-bind:value="type"
                v-on:input="type = $event"
            ></select-value>
          </v-col>
        </v-row>

        
        <br>
        <v-row class="justify-center" align="center"
               justify="center" no-gutters>
          <v-col cols="10" lg="3" sm="7" md="4" xl="3">
            <v-btn class="button-add" v-on:click="login">
              <v-icon>mdi-upload</v-icon>
              Loguearse
            </v-btn>
          </v-col>
        </v-row> -->
        <v-col cols="10" lg="3" sm="7" md="4" xl="3">
            <v-btn class="button-add" v-on:click="login">
              <v-icon>mdi-upload</v-icon>
              Loguearse
            </v-btn>
          </v-col>

      </v-container>


    </v-col>

  </v-row>
</template>

<script>
// import selectValue from '../../components/inputs/selectValue.vue';
import {mapActions, mapState} from 'vuex';
import router from '../../router';
import CardProduct from '../../components/CardProduct.vue'
// import Data from '../../models/Data'

export default {
  components: {CardProduct},
  data: () => ({
    filelist: [],
    productList: [],
    // products: [{name:"Prueba1",id:'1',price:'12.5'},{name:"Prueba2",id:'2',price:'12.5'}],
    locations: [{name: 'Paises', id: '1'}, {name: 'Departamentos', id: '2'}, {name: 'Municipios', id: '3'}],
    type: 0,
    replace: false
  }),
  created() {
    this.getProduct();
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
    ...mapActions('product', ['getProduct']),
    seeProduct() {
      this.getProduct();
    },
    login() {
      router.push({path: "/login"}).catch(() => {
      });
    },
  }
}
</script>

<style lang="sass">
@import "@/styles/views/_data.sass"
</style>