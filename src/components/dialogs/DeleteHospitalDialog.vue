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
          <span class="headline">Eliminar Hospital</span>
        </v-card-title>

        <v-card-text>
          Esta seguro que desea eliminar el hospital "{{hospital.name}}"
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
import Hospital from '../../models/Hospital';


export default {
  props: {},
  data: () => ({
    hospitalEdit: {},
  }),

  computed: {
    ...mapState('viewHospitals', ['dialogDeleteState', 'hospital'])
  },
  mounted() {
  },
  watch: {
    hospital(value) {
      this.hospitalEdit = new Hospital(value.idHospital, value.idCity, value.name, value.lon, value.lat);

    }
  },
  methods: {
    ...mapActions('viewHospitals', ['dialogDeleteClose', 'deleteHospital']),
    cancel() {
      this.dialogDeleteClose();
    },
    save() {
      this.dialogDeleteClose();
      this.deleteHospital(this.hospitalEdit)
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
