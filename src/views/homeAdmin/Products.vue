<template>
  <v-row class="main-container" no-gutters>
    <v-col cols="11" xl="10" lg="10">
      <v-row><br></v-row>
      <v-row class="header-container">
        <v-col cols="12" lg="4" sm="5" md="4" xl="3">
          <input-search
              :label="'Buscar Producto'"
              v-bind:value="search"
              v-on:input="search = $event"
              @keyup.enter.native="searchData"


          >
          </input-search>
        </v-col>
        <v-col cols="12" lg="3" sm="5" md="4" xl="3">
          <v-btn class="button-add" v-on:click="addProduct">
            <v-icon>mdi-plus</v-icon>
            Agregar Producto
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table :headers="headers"
                 :items="items"
                 :total="totalProducts"
                 @editValue="editProduct($event)"
                 @deleteValue="deleteProduct($event)"
                 @changePage="changePage($event)"
          >

          </Table>
        </v-col>
      </v-row>
      <edit-product-dialog></edit-product-dialog>
      <delete-product-dialog></delete-product-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Table from '../../components/views-components/Table.vue';
import {mapActions, mapState} from 'vuex'
import Product from '../../models/Product'
import InputSearch from '../../components/inputs/InputSearch.vue';
import EditProductDialog from '../../components/dialogs/EditProductDialog.vue';
import DeleteProductDialog from '../../components/dialogs/DeleteProductDialog';

export default {
  components: {
    Table,
    InputSearch,
    EditProductDialog,
    DeleteProductDialog
  },
  data: () => ({
    headers: [
      {text: 'IdProduct', value: 'productId', class: "item-header-left"},
      {text: 'Nombre', value: 'name', class: "item-header-center"},
      {text: 'Precio', value: 'price', class: "item-header-center"},
      {text: 'Stock', value: 'amount', class: "item-header-center"},
      {text: 'Request', value: 'request', class: "item-header-center"},
      {text: 'Marca', value: 'brand', class: "item-header-center"},
      // {text: 'Imagen', value: 'imageUrl', class: "item-header-center"},
      {text: 'Acciones', value: 'actions', class: "item-header-right"}
    ],
    items: [],
    activeEdit: false,
    search: "",
  }),
  created() {
    this.getProducts();
  },
  mounted() {
  },
  computed: {
    ...mapState('product', ['products', 'totalProducts', 'product']),
  },

  watch: {
    products(value) {
      this.items = value;
    },
  },
  methods: {
    ...mapActions('product', ['dialogEditOpen', 'dialogDeleteOpen', 'getProducts']),
    deleteProduct(product) {
      this.dialogDeleteOpen(product);
    },
    addProduct() {
      this.dialogEditOpen({product: new Product(), title: "Agregar Producto"})

    },
    editProduct(product) {
      this.dialogEditOpen({product: product, title: "Editar Producto"})

    },
    obtainProducts() {
      this.getProducts();
    },
    searchData() {
      this.getProducts();
    }
  }

}
</script>

<style lang="sass">
@import "@/styles/views/_accounts.sass"
@import "@/styles/components/_table.sass"
@import "@/styles/components/_buttons.sass"

</style>