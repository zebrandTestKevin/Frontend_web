<template>
  <v-row class="main-container" no-gutters>
    <v-col cols="11" xl="10" lg="10">
      <v-row><br></v-row>
      <v-row class="header-container">
        <v-col cols="12" lg="4" sm="5" md="4" xl="3">
          <input-search
              :label="'Buscar Hospital'"
              v-bind:value="search"
              v-on:input="search = $event"
              @keyup.enter.native="searchData"


          >
          </input-search>
        </v-col>
        <v-col cols="12" lg="3" sm="5" md="4" xl="3">
          <v-btn class="button-add" v-on:click="addHospital">
            <v-icon>mdi-plus</v-icon>
            Agregar Hospital
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table :headers="headers"
                 :items="items"
                 :total="totalHospitals"
                 @editValue="editHospital($event)"
                 @deleteValue="deleteHospital($event)"
                 @changePage="changePage($event)"
          >

          </Table>
        </v-col>
      </v-row>
      <edit-hospital-dialog></edit-hospital-dialog>
      <delete-hospital-dialog></delete-hospital-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Table from '../../components/views-components/Table.vue';
import {mapActions, mapState} from 'vuex'
import Hospital from '../../models/Hospital'
import InputSearch from '../../components/inputs/InputSearch.vue';
import EditHospitalDialog from '../../components/dialogs/EditHospitalDialog.vue';
import DeleteHospitalDialog from '../../components/dialogs/DeleteHospitalDialog';

export default {
  components: {
    Table,
    InputSearch,
    EditHospitalDialog,
    DeleteHospitalDialog
  },
  data: () => ({
    headers: [
      {text: 'Id', value: 'idHospital', class: "item-header-left"},
      {text: 'Ciudad', value: 'nameCity', class: "item-header-center"},
      {text: 'Nombre', value: 'name', class: "item-header-center"},
      {text: 'Latitud', value: 'lat', class: "item-header-center"},
      {text: 'Longitud', value: 'lon', class: "item-header-right"},
      {text: 'Acciones', value: 'actions', class: "item-header-right"}
    ],
    items: [],
    activeEdit: false,
    search: "",
    citiesData: []
  }),
  created() {
    this.getCities();
    this.getHospitals({n: 10, i: 0});
  },
  mounted() {
  },
  computed: {
    ...mapState('viewHospitals', ['hospitals', 'totalHospitals', 'cities', 'hospital']),
  },

  watch: {
    hospitals(value) {
      console.log(value);
      console.log(this.totalHospitals);
      this.items = value;
      for (let h of this.hospitals) {
        this.citiesData.find((city) => {
          if (city.idCity == h.idCity) {
            h.nameCity = city.city;
          }
        })
      }
    },
    cities(value) {
      this.citiesData = value;
    }
  },
  methods: {
    ...mapActions('viewHospitals', ['dialogEditOpen', 'dialogDeleteOpen', 'getHospitals', 'getCities']),
    deleteHospital(hospital) {
      console.log(hospital);
      this.dialogDeleteOpen(hospital)
    },
    addHospital() {
      this.dialogEditOpen({hospital: new Hospital(), title: "Agregar Hospital"})

    },
    editHospital(hospital) {
      this.dialogEditOpen({hospital: hospital, title: "Editar Hospital"})

    },
    changePage(page) {
      this.getHospitals({n: 10, i: 10 * page});
    },
    searchData() {
      this.getHospitals({n: 10, i: 0, search: this.search});
    }
  }

}
</script>

<style lang="sass">
@import "@/styles/views/_accounts.sass"
@import "@/styles/components/_table.sass"
@import "@/styles/components/_buttons.sass"

</style>