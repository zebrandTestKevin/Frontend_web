<template>
  <v-container>
    <v-col>
      <v-row no-gutters>
        <v-col
            class="card-back-blur"
            cols="12"
            xl="6"
            md="6"
            sm="12"
        >
        </v-col>

        <v-col class="card-back"
               cols="12"
               xl="6"
               md="6"
               sm="12"
        >
          <v-row no-gutters class="header"></v-row>
          <v-row no-gutters class="icon-center">
            <v-col cols="2" lg="2" md="2" sm="2" class="icon">
              <v-img src="@/assets/logo.png"></v-img>
            </v-col>
          </v-row>
          <br><br>
          <v-row no-gutters>
            <v-col cols="3"></v-col>
            <v-col cols="6">
              <h1 class="title-login">Iniciar Sesión</h1>
            </v-col>
          </v-row>
          <br><br>
          <v-form v-model="valid" ref="form" lazy-validation @submit.native.prevent="verifyData">
            <v-row no-gutters>
              <v-col cols="2" sm="4" md="3" lg="4"></v-col>
              <v-col cols="8" sm="4" md="6" lg="4">
                <input-login
                    :label="'Correo Electrónico'"
                    :icon="'mdi-account'"
                    :type="'email'"
                    :auto="'username'"
                    :rules="[rules.Required,rules.emailVerify]"
                    v-bind:value="emailText"
                    v-on:input="emailText = $event"
                    @keyup.enter.native="verifyData"
                ></input-login>
              </v-col>
            </v-row>
            <br><br>
            <v-row no-gutters>
              <v-col cols="2" sm="4" md="3" lg="4"></v-col>
              <v-col cols="8" sm="4" md="6" lg="4">
                <input-login
                    :label="'Contraseña'"
                    :icon="'mdi-lock'"
                    :type="'password'"
                    :auto="'current-password'"
                    :rules="[rules.passwordMin]"
                    v-bind:value="passText"
                    v-on:input="passText = $event"
                    @keyup.enter.native="verifyData"
                ></input-login>
              </v-col>
            </v-row>
            <br><br>
            <v-row no-gutters>
              <v-col cols="4" sm="5" md="4" lg="5"></v-col>
              <v-col cols="4" sm="2" md="4" lg="2">
                <button-login
                    :name="'Acceder'"
                    @click.native="verifyData"
                ></button-login>
              </v-col>
            </v-row>
          </v-form>

        </v-col>
      </v-row>
    </v-col>
    <!-- <div class="footer-copy">Visor de informacion del COVID-19 © {{year}}</div> -->
  </v-container>

</template>

<script>
import {mapActions} from 'vuex'
import ButtonLogin from './ButtonLogin.vue'
import InputLogin from './InputLogin.vue'
import LoginRequest from '../models/LoginRequest'

export default {
  components: {
    InputLogin,
    ButtonLogin
  },
  data: () => ({
    valid: false,
    year: new Date(Date.now()).getFullYear(),
    emailText: null,
    passText: null,
    rules: {
      Required: (value) =>
          !!value || "Complete el campo por favor.",
      passwordMin: (value) =>
          value == null ? "Revise la contraseña" : String(value).length < 8 ? "Debe tener al menos 8 carácteres." : true || "Debe tener al menos 8 carácteres.",
      emailVerify: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email no válido."
      }
    }
  }),
  methods: {
    ...mapActions('account', ['login']),
    verifyData(ev) {
      ev.preventDefault()
      if (!this.valid || this.emailText == null || this.passText == null) return;
      var user = new LoginRequest(this.emailText, this.passText)
      this.login(user)

    }
  }
}


</script>

<style scoped lang="sass">
@import "@/styles/login/_cardLogin.sass"
</style>
