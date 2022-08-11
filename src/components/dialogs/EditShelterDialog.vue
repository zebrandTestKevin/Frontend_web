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
                    v-bind:value="shelterEdit.name"
                    v-on:input="shelterEdit.name = $event"
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
                    v-bind:value="shelterEdit.amount"
                    v-on:input="shelterEdit.amount = $event"
                    :icon="'mdi-pencil'"
                    :label="'Capacidad'"
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
                    v-bind:value="shelterEdit.lon"
                    v-on:input="shelterEdit.lon = $event"
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
                    v-bind:value="shelterEdit.lat"
                    v-on:input="shelterEdit.lat = $event"
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
                    v-bind:value="shelterEdit.idCity"
                    v-on:input="shelterEdit.idCity = $event"
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
import Shelter from '../../models/Shelter'
import InputGeneral from '../inputs/InputGeneral.vue';
import SelectGeneral from '../inputs/selectGeneral.vue';

export default {
  components: {InputGeneral, SelectGeneral},
  props: {},
  data: () => ({
    active: true,
    shelterEdit: {},
    rules: {
      Required: (value) =>
          !!value || "Complete el campo por favor."
    }
  }),

  computed: {
    ...mapState('viewShelters', ['dialogEditState', 'shelter', 'title', 'cities'])
  },
  watch: {
    shelter(value) {
      this.shelterEdit = new Shelter(value.idShelter, value.amount, value.idCity, value.name, value.lon, value.lat);

    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('viewShelters', ['dialogEditClose', 'dialogDelete', 'editShelter', 'addShelter']),
    cancel() {
      this.dialogEditClose();
    },
    save() {
      switch (this.title) {
        case "Editar Albergue":
          this.dialogEditClose();
          this.editShelter(this.shelterEdit);
          break;
        case "Agregar Albergue":
          this.dialogEditClose();
          this.addShelter(this.shelterEdit);
          break;
      }
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>

