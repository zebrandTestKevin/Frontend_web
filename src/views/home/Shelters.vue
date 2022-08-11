<template>
  <v-row class="main-container" no-gutters>
    <v-col cols="11" xl="10" lg="10">
      <v-row><br></v-row>
      <v-row class="header-container">
        <v-col cols="12" lg="4" sm="5" md="4" xl="3">
          <input-search
              :label="'Buscar Albergue'"
              v-bind:value="search"
              v-on:input="search = $event"
              @keyup.enter.native="searchData"


          >
          </input-search>
        </v-col>
        <v-col cols="12" lg="3" sm="5" md="4" xl="3">
          <v-btn class="button-add" v-on:click="addShelter">
            <v-icon>mdi-plus</v-icon>
            Agregar Albergue
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table :headers="headers"
                 :items="items"
                 :total="totalShelters"
                 @editValue="editShelter($event)"
                 @deleteValue="deleteShelter($event)"
                 @changePage="changeShelter($event)"
          >

          </Table>
        </v-col>
      </v-row>
      <edit-shelter-dialog></edit-shelter-dialog>
      <delete-shelter-dialog></delete-shelter-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Table from '../../components/views-components/Table.vue';
import {mapActions, mapState} from 'vuex'
import Shelter from '../../models/Shelter'
import InputSearch from '../../components/inputs/InputSearch.vue';
import EditShelterDialog from '../../components/dialogs/EditShelterDialog.vue';
import DeleteShelterDialog from '../../components/dialogs/DeleteShelterDialog';

export default {
  components: {
    Table,
    InputSearch,
    EditShelterDialog,
    DeleteShelterDialog
  },
  data: () => ({
    headers: [
      {text: 'Id', value: 'idShelter', class: "item-header-left"},
      {text: 'Ciudad', value: 'nameCity', class: "item-header-center"},
      {text: 'Nombre', value: 'name', class: "item-header-center"},
      {text: 'Capacidad', value: 'amount', class: "item-header-center"},
      {text: 'Latitud', value: 'lat', class: "item-header-center"},
      {text: 'Longitud', value: 'lon', class: "item-header-center"},
      {text: 'Acciones', value: 'actions', class: "item-header-right"}
    ],
    items: [],
    activeEdit: false,
    search: "",
    citiesData: []
  }),
  created() {
    this.getCities();
    this.getShelters({n: 10, i: 0});
  },
  mounted() {
  },
  computed: {
    ...mapState('viewShelters', ['shelters', 'totalShelters', 'cities']),
  },

  watch: {
    shelters(value) {
      this.items = value;
      for (let s of this.shelters) {
        this.citiesData.find((city) => {
          if (city.idCity == s.idCity) {
            s.nameCity = city.city;
          }
        })
      }
    },
    cities(value) {
      this.citiesData = value;
    }
  },
  methods: {
    ...mapActions('viewShelters', ['dialogEditOpen', 'dialogDeleteOpen', 'getShelters', 'getCities']),
    deleteShelter(shelter) {
      console.log(shelter);
      this.dialogDeleteOpen(shelter)
    },
    addShelter() {
      this.dialogEditOpen({shelter: new Shelter(), title: "Agregar Albergue"})

    },
    editShelter(shelter) {
      this.dialogEditOpen({shelter: shelter, title: "Editar Albergue"})

    },
    changePage(page) {
      this.getShelters({n: 10, i: 10 * page});
    },
    searchData() {
      this.getShelters({n: 10, i: 0, search: this.search});
    }
  }

}
</script>

<style lang="sass">
@import "@/styles/views/_accounts.sass"
@import "@/styles/components/_table.sass"
@import "@/styles/components/_buttons.sass"

</style>


