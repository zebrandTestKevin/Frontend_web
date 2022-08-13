<template>
  <v-col cols="6">
    <v-dialog
        persistent
        v-model="dialogDeleteState"
        width="unset"
    >
      <v-card
          class="dialog-container">
        <v-card-title>
          <span class="headline">Eliminar Producto</span>
        </v-card-title>

        <v-card-text>
          Esta seguro que desea eliminar el producto "{{product.name}}"
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
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-col>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Product from '../../models/Product';


export default {
  props: {},
  data: () => ({
    productEdit: {},
  }),

  computed: {
    ...mapState('product', ['dialogDeleteState', 'product'])
  },
  mounted() {
  },
  watch: {
    product(value) {
      this.productEdit = new Product(value.productId, value.name);

    }
  },
  methods: {
    ...mapActions('product', ['dialogDeleteClose', 'deleteProduct']),
    cancel() {
      this.dialogDeleteClose();
    },
    save() {
      this.dialogDeleteClose();
      this.deleteProduct(this.productEdit)
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
