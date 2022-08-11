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
                    v-bind:value="hospitalEdit.name"
                    v-on:input="hospitalEdit.name = $event"
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
                    v-bind:value="hospitalEdit.lon"
                    v-on:input="hospitalEdit.lon = $event"
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
                    v-bind:value="hospitalEdit.lat"
                    v-on:input="hospitalEdit.lat = $event"
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
                    v-bind:value="hospitalEdit.idCity"
                    v-on:input="hospitalEdit.idCity = $event"
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
import Hospital from '../../models/Hospital'
import InputGeneral from '../inputs/InputGeneral.vue';
import SelectGeneral from '../inputs/selectGeneral.vue';

export default {
  components: {InputGeneral, SelectGeneral},
  props: {},
  data: () => ({
    active: true,
    hospitalEdit: {},
    rules: {
      Required: (value) =>
          !!value || "Complete el campo por favor."
    }
  }),

  computed: {
    ...mapState('viewHospitals', ['dialogEditState', 'hospital', 'title', 'cities'])
  },
  watch: {
    hospital(value) {
      this.hospitalEdit = new Hospital(value.idHospital, value.idCity, value.name, value.lon, value.lat);

    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('viewHospitals', ['dialogEditClose', 'dialogDelete', 'editHospital', 'addHospital']),
    cancel() {
      this.dialogEditClose();
    },
    save() {
      console.log(this.title);
      switch (this.title) {
        case "Editar Hospital":
          this.dialogEditClose();
          this.editHospital(this.hospitalEdit);
          break;
        case "Agregar Hospital":
          this.dialogEditClose();
          this.addHospital(this.hospitalEdit);
          break;
      }
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
