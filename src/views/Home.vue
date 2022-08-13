<template>
  <v-app>
    <v-row no-gutters class="row-container">
      <div class="container-side ">
        <v-app-bar
            :class="{'v-toolbar':false}"
            class="app-bar-container"
            ref="appbar"
        >
          <v-spacer></v-spacer>
          <v-toolbar-title >{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
        
            <v-col cols="1">
              <v-btn class="button-add" v-on:click="login">
                <v-icon>mdi-account</v-icon>
                Login
              </v-btn>
            </v-col>

        </v-app-bar>
        <div class="content">
          <router-view></router-view>
        </div>

      </div>
    </v-row>
  </v-app>
</template>
<script>
import {mapActions} from 'vuex';
import router from '../router';

export default {
  data: () => ({
    "drawer": null,
    "menu": [],
    "title": "",
  }),
  mounted() {
    this.title = router.currentRoute.name;

  },
  methods: {
    ...mapActions('account', ['logout']),
    login() {
      router.push({path: "/login"}).catch(() => {
      });
    },
  }

}
</script>
<style lang="sass" scoped>
@import "@/styles/home/_home.sass"

</style>
