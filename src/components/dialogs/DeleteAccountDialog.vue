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
          <span class="headline">Eliminar Cuenta</span>
        </v-card-title>

        <v-card-text>
          Esta seguro que desea eliminar la cuenta "{{account.userName}}"
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
import Account from '../../models/Account';


export default {
  props: {},
  data: () => ({
    accountEdit: {},
  }),

  computed: {
    ...mapState('viewAccounts', ['dialogDeleteState', 'account'])
  },
  mounted() {
  },
  watch: {
    account(value) {
      this.accountEdit = new Account(value.idUser, value.userName);

    }
  },
  methods: {
    ...mapActions('viewAccounts', ['dialogDeleteClose', 'deleteAccount']),
    cancel() {
      this.dialogDeleteClose();
    },
    save() {
      this.dialogDeleteClose();
      this.deleteAccount(this.accountEdit)
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
