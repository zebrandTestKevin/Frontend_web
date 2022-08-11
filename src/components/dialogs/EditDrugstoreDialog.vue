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
                    v-bind:value="drugstoreEdit.name"
                    v-on:input="drugstoreEdit.name = $event"
                    :icon="'mdi-pencil'"
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
                    v-bind:value="drugstoreEdit.lon"
                    v-on:input="drugstoreEdit.lon = $event"
                    :icon="'mdi-map-marker'"
                    :label="'Longitud'"
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
                    v-bind:value="drugstoreEdit.lat"
                    v-on:input="drugstoreEdit.lat = $event"
                    :icon="'mdi-map-marker'"
                    :label="'Latitud'"
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
                <select-general
                    :items="cities"
                    :label="'Ciudad'"
                    v-bind:value="drugstoreEdit.idCity"
                    v-on:input="drugstoreEdit.idCity = $event"
                ></select-general>
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
import Drugstore from '../../models/Drugstore'
import InputGeneral from '../inputs/InputGeneral.vue';
import SelectGeneral from '../inputs/selectGeneral.vue';

export default {
  components: {InputGeneral, SelectGeneral},
  props: {},
  data: () => ({
    active: true,
    drugstoreEdit: {},
    rules: {
      Required: (value) =>
          !!value || "Complete el campo por favor."
    }
  }),

  computed: {
    ...mapState('viewDrugstores', ['dialogEditState', 'drugstore', 'title', 'cities'])
  },
  watch: {
    drugstore(value) {
      this.drugstoreEdit = new Drugstore(value.idDrugstore, value.idCity, value.name, value.lon, value.lat);

    }
  },

  mounted() {
  },
  methods: {
    ...mapActions('viewDrugstores', ['dialogEditClose', 'dialogDelete', 'editDrugstore', 'addDrugstore']),
    cancel() {
      this.dialogEditClose();
    },
    save() {
      console.log(this.title);
      switch (this.title) {
        case "Editar Farmacia":
          this.dialogEditClose();
          this.editDrugstore(this.drugstoreEdit);
          break;
        case "Agregar Farmacia":
          this.dialogEditClose();
          this.addDrugstore(this.drugstoreEdit);
          break;
      }
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
