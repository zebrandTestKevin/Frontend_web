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
                    v-bind:value="accountEdit.name"
                    v-on:input="accountEdit.name = $event"
                    :icon="'mdi-account-edit'"
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
                    v-bind:value="accountEdit.mail"
                    v-on:input="accountEdit.mail = $event"
                    :icon="'mdi-email'"
                    :label="'Email'"
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
                    v-bind:value="accountEdit.status"
                    v-on:input="accountEdit.status = $event"
                    :icon="'mdi-account-edit'"
                    :label="'Status'"
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
                    v-bind:value="accountEdit.password"
                    v-on:input="accountEdit.password = $event"
                    :icon="'mdi-lock'"
                    :label="'Password'"
                    :lim="'6'"
                    :rules="[rules.passwordMin]"
                ></input-general>
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
import Account from '../../models/Account'
import InputGeneral from '../inputs/InputGeneral.vue';

export default {
  components: {InputGeneral},
  props: {},
  data: () => ({
    active: true,
    accountEdit: {},
    rules: {
      Required: (value) =>
          !!value || "Complete el campo por favor.",
      passwordMin: (value) =>
          value == null ? true : String(value).length < 5 ? "Debe tener al menos 5 car??cteres." : true || "Debe tener al menos 5 car??cteres.",

    }
  }),

  computed: {
    ...mapState('viewAccounts', ['dialogEditState', 'account', 'title'])
  },
  watch: {
    account(value) {
      this.accountEdit = new Account(value.userId, value.mail, value.password, value.name,value.status);
      console.log(this.accountEdit);
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('viewAccounts', ['dialogEditClose', 'dialogDelete', 'editAccount', 'addAccount']),
    cancel() {
      this.dialogEditClose();
    },
    save() {
      console.log(this.title);
      switch (this.title) {
        case "Editar Cuenta":
          this.dialogEditClose();
          this.editAccount(this.accountEdit);
          break;
        case "Agregar Cuenta":
          this.dialogEditClose();
          this.addAccount(this.accountEdit);
          break;
      }
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
