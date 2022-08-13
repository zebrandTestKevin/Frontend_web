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
          <span class="headline">{{title}}</span>
        </v-card-title>

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
                    v-bind:value="productEdit.name"
                    v-on:input="productEdit.name = $event"
                    :icon="'mdi-account-edit'"
                    :label="'Nombre'"
                    :lim="'6'"
                    :rules="[rules.Required]"
                ></input-general>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="6"
              >
                <input-general
                    v-bind:value="productEdit.price"
                    v-on:input="productEdit.price = $event"
                    :icon="'mdi-account-edit'"
                    :label="'Precio'"
                    :lim="'6'"
                    :rules="[rules.Required]"
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
                    :icon="'mdi-account-edit'"
                    :label="'Stock'"
                    :lim="'6'"
                    :rules="[rules.Required]"
                ></input-general>
              </v-col>

              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="6"
              >
                <input-general
                    v-bind:value="productEdit.request"
                    v-on:input="productEdit.request = $event"
                    :icon="'mdi-account-edit'"
                    :label="'Peticiones'"
                    :lim="'6'"
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
                    :icon="'mdi-account-edit'"
                    :label="'Marca'"
                    :lim="'6'"
                    :rules="[rules.Required]"
                ></input-general>
              </v-col>
              <v-col
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
                    :rules="[rules.Required]"
                ></input-general>
              </v-col>

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
            Cancelar
          </v-btn>
          <v-btn
              class="btn-save"
              text
              @click="save"
          >
            Guardar
          </v-btn>
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
    ...mapActions('product', ['dialogEditClose', 'dialogDelete', 'editProduct', 'addProduct']),
    cancel() {
      this.dialogEditClose();
    },
    save() {
      console.log(this.title);
      switch (this.title) {
        case "Editar Producto":
          this.dialogEditClose();
          this.editProduct(this.productEdit);
          break;
        case "Agregar Producto":
          this.dialogEditClose();
          this.addProduct(this.productEdit);
          break;
      }
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
