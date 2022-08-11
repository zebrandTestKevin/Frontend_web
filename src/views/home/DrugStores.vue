<template>
  <v-row class="main-container" no-gutters>
    <v-col cols="11" xl="10" lg="10">
      <v-row><br></v-row>
      <v-row class="header-container">
        <v-col cols="12" lg="4" sm="5" md="4" xl="3">
          <input-search
              :label="'Buscar Drugstore'"
              v-bind:value="search"
              v-on:input="search = $event"
              @keyup.enter.native="searchData"


          >
          </input-search>
        </v-col>
        <v-col cols="12" lg="3" sm="5" md="4" xl="3">
          <v-btn class="button-add" v-on:click="addDrugstore">
            <v-icon>mdi-plus</v-icon>
            Agregar Farmacia
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table :headers="headers"
                 :items="items"
                 :total="totalDrugstores"
                 @editValue="editDrugstore($event)"
                 @deleteValue="deleteDrugstore($event)"
                 @changePage="changePage($event)"
          >

          </Table>
        </v-col>
      </v-row>
      <edit-drugstore-dialog></edit-drugstore-dialog>
      <delete-drugstore-dialog></delete-drugstore-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Table from '../../components/views-components/Table.vue';
import {mapActions, mapState} from 'vuex'
import Drugstore from '../../models/Drugstore'
import InputSearch from '../../components/inputs/InputSearch.vue';
import EditDrugstoreDialog from '../../components/dialogs/EditDrugstoreDialog.vue';
import DeleteDrugstoreDialog from '../../components/dialogs/DeleteDrugstoreDialog';

export default {
  components: {
    Table,
    InputSearch,
    EditDrugstoreDialog,
    DeleteDrugstoreDialog
  },
  data: () => ({
    headers: [
      {text: 'Id', value: 'idDrugstore', class: "item-header-left"},
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
    this.getDrugstores({n: 10, i: 0});
  },
  mounted() {
  },
  computed: {
    ...mapState('viewDrugstores', ['drugstores', 'totalDrugstores', 'cities', 'drugstore']),
  },

  watch: {
    drugstores(value) {
      console.log(value);
      this.items = value;
      for (let d of this.drugstores) {
        this.citiesData.find((city) => {
          if (city.idCity == d.idCity) {
            d.nameCity = city.city;
          }
        })
      }
    },
    cities(value) {
      this.citiesData = value;
    }
  },
  methods: {
    ...mapActions('viewDrugstores', ['dialogEditOpen', 'dialogDeleteOpen', 'getDrugstores', 'getCities']),
    deleteDrugstore(drugstore) {
      console.log(drugstore);
      this.dialogDeleteOpen(drugstore)
    },
    addDrugstore() {
      this.dialogEditOpen({drugstore: new Drugstore(), title: "Agregar Farmacia"})

    },
    editDrugstore(drugstore) {
      this.dialogEditOpen({drugstore: drugstore, title: "Editar Farmacia"})

    },
    changePage(page) {
      this.getDrugstores({n: 10, i: 10 * page});
    },
    searchData() {
      this.getDrugstores({n: 10, i: 0, search: this.search});
    }
  }

}
</script>

<style lang="sass">
@import "@/styles/views/_accounts.sass"
@import "@/styles/components/_table.sass"
@import "@/styles/components/_buttons.sass"

</style>
