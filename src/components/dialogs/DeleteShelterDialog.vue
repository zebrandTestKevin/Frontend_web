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
          <span class="headline">Eliminar Albergue</span>
        </v-card-title>

        <v-card-text>
          Esta seguro que desea eliminar el albergue "{{shelter.name}}"
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
import Shelter from '../../models/Shelter';


export default {
  props: {},
  data: () => ({
    accountEdit: {},
    shelterEdit: {},
  }),

  computed: {
    ...mapState('viewShelters', ['dialogDeleteState', 'shelter'])
  },
  mounted() {
  },
  watch: {
    shelter(value) {
      this.shelterEdit = new Shelter(value.idShelter, value.amount, value.idCity, value.name, value.lon, value.lat);

    }
  },
  methods: {
    ...mapActions('viewShelters', ['dialogDeleteClose', 'deleteShelter']),
    cancel() {
      this.dialogDeleteClose();
    },
    save() {
      this.dialogDeleteClose();
      this.deleteShelter(this.shelterEdit)
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
