<template>
  <v-col cols="6">
    <v-dialog
        persistent
        v-model="dialogEditState"
        width="unset"
    >
      <v-card
          class="dialog-container">
        <v-card-title>
          <span class="headline">{{productEdit.name}}</span>
        </v-card-title>
        <v-flex class="text-center">
          <v-img 
          :src="productEdit.imageUrl"
          height="300"
          width="55%"
          class="pa-2 mx-auto"
          ></v-img>
        </v-flex>
        

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="6"
              >
                <input-general
                    v-bind:value="productEdit.price"
                    v-on:input="productEdit.price = $event"
                    :icon="'mdi-account-cash'"
                    :label="'Precio'"
                    :lim="'6'"
                    :readonly=true
                ></input-general>
              </v-col>

              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="6"
              >
                <input-general
                    v-bind:value="productEdit.amount"
                    v-on:input="productEdit.amount = $event"
                    :icon="'mdi-archive'"
                    :label="'Stock'"
                    :lim="'6'"
                    :readonly=true
                ></input-general>
              </v-col>

              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="6"
              >
                <input-general
                    v-bind:value="productEdit.brand"
                    v-on:input="productEdit.brand = $event"
                    :icon="'mdi-badge-account-horizontal'"
                    :label="'Marca'"
                    :lim="'6'"
                    :readonly=true
                ></input-general>
              </v-col>
              <!-- <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="6"
              >
                <input-general
                    v-bind:value="productEdit.imageUrl"
                    v-on:input="productEdit.imageUrl = $event"
                    :icon="'mdi-account-edit'"
                    :label="'Imagen'"
                    :lim="'6'"
                    :readonly=true                 
                ></input-general>
              </v-col> -->

            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="btn-cancel"
              text
              @click="cancel"
          >
            Ok
          </v-btn>
          <!-- <v-btn
              class="btn-save"
              text
              @click="save"
          >
            Guardar
          </v-btn> -->
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-col>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Product from '../../models/Product'
import InputGeneral from '../inputs/InputGeneral.vue';

export default {
  components: {InputGeneral},
  props: {},
  data: () => ({
    active: true,
    productEdit: {},
    rules: {
      Required: (value) =>
          !!value || "Complete el campo por favor.",

    }
  }),

  computed: {
    ...mapState('product', ['dialogEditState', 'product', 'title'])
  },
  watch: {
    product(value) {
      this.productEdit = new Product(value.productId, value.name, value.price, value.amount,value.request,value.brand, value.imageUrl);
      console.log(this.productEdit);
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('product', ['dialogProductClose', 'dialogDelete', 'editProduct', 'addProduct']),
    cancel() {
      this.dialogProductClose();
    },
    save() {
      console.log(this.title);
      switch (this.title) {
        case "Editar Producto":
          this.dialogProductClose();
          // this.editProduct(this.productEdit);
          break;
        case "Agregar Producto":
          this.dialogProductClose();
          // this.addProduct(this.productEdit);
          break;
      }
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
