<template>
  <v-row class="main-container" no-gutters>
    <v-col cols="11" xl="10" lg="10">
      <v-row><br></v-row>
      <v-row class="header-container">
        <v-col cols="12" lg="4" sm="5" md="4" xl="3">
          <input-search
              :label="'Buscar Cuenta'"
              v-bind:value="search"
              v-on:input="search = $event"
              @keyup.enter.native="searchData"


          >
          </input-search>
        </v-col>
        <v-col cols="12" lg="3" sm="5" md="4" xl="3">
          <v-btn class="button-add" v-on:click="addAccount">
            <v-icon>mdi-plus</v-icon>
            Agregar Cuenta
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table :headers="headers"
                 :items="items"
                 :total="totalAccounts"
                 @editValue="editAccount($event)"
                 @deleteValue="deleteAccount($event)"
                 @changePage="changePage($event)"
          >

          </Table>
        </v-col>
      </v-row>
      <edit-account-dialog></edit-account-dialog>
      <delete-account-dialog></delete-account-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Table from '../../components/views-components/Table.vue';
import {mapActions, mapState} from 'vuex'
import Account from '../../models/Account'
import InputSearch from '../../components/inputs/InputSearch.vue';
import EditAccountDialog from '../../components/dialogs/EditAccountDialog.vue';
import DeleteAccountDialog from '../../components/dialogs/DeleteAccountDialog';

export default {
  components: {
    Table,
    InputSearch,
    EditAccountDialog,
    DeleteAccountDialog
  },
  data: () => ({
    headers: [
      {text: 'IdUser', value: 'userId', class: "item-header-left"},
      {text: 'Nombre', value: 'name', class: "item-header-center"},
      {text: 'Email', value: 'mail', class: "item-header-center"},
      {text: 'Status', value: 'status', class: "item-header-center"},
      {text: 'Acciones', value: 'actions', class: "item-header-right"}
    ],
    items: [],
    activeEdit: false,
    search: "",
  }),
  created() {
    this.getAccounts({n: 10, i: 0});
  },
  mounted() {
  },
  computed: {
    ...mapState('viewAccounts', ['accounts', 'totalAccounts', 'account']),
  },

  watch: {
    accounts(value) {
      this.items = value;
    },
  },
  methods: {
    ...mapActions('viewAccounts', ['dialogEditOpen', 'dialogDeleteOpen', 'getAccounts']),
    deleteAccount(account) {
      this.dialogDeleteOpen(account)
    },
    addAccount() {
      this.dialogEditOpen({account: new Account(), title: "Agregar Cuenta"})

    },
    editAccount(account) {
      this.dialogEditOpen({account: account, title: "Editar Cuenta"})

    },
    obtainAccounts() {
      this.getAccounts();
    },
    searchData() {
      this.getAccounts({n: 10, i: 0, search: this.search});
    }
  }

}
</script>

<style lang="sass">
@import "@/styles/views/_accounts.sass"
@import "@/styles/components/_table.sass"
@import "@/styles/components/_buttons.sass"

</style>