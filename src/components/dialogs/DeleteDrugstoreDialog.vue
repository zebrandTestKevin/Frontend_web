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
          <span class="headline">Eliminar Farmacia</span>
        </v-card-title>

        <v-card-text>
          Esta seguro que desea eliminar la farmacia "{{drugstore.name}}"
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
import Drugstore from '../../models/Drugstore';


export default {
  props: {},

  data: () => ({
    accountEdit: {},
    drugstoreEdit: {},
  }),

  computed: {
    ...mapState('viewDrugstores', ['dialogDeleteState', 'drugstore'])
  },
  mounted() {
  },

  watch: {
    drugstore(value) {
      this.drugstoreEdit = new Drugstore(value.idDrugstore, value.idCity, value.name, value.lon, value.lat);

    }
  },

  methods: {
    ...mapActions('viewDrugstores', ['dialogDeleteClose', 'deleteDrugstore']),
    cancel() {
      this.dialogDeleteClose();
    },
    save() {
      this.dialogDeleteClose();
      this.deleteDrugstore(this.drugstoreEdit)
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
