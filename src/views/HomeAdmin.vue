<template>
  <v-app>
    <v-row no-gutters class="row-container">
      <v-navigation-drawer
          class="drawer"
          v-model="drawer"
          ref="drawer"
          :absolute="!$vuetify.breakpoint.mdAndUp"
          :permanent="$vuetify.breakpoint.mdAndUp">
        <v-list nav dense>
          <v-toolbar class="title-nav-container">
            <v-avatar>
              <v-img class="title-logo-nav " src="@/assets/logo3.png"></v-img>
            </v-avatar>
          </v-toolbar>
          <v-list-item-group
              active-class="white--text text--accent-5"
              class="drawer-items">
            <v-list-item
            >
            </v-list-item>
            <v-list-item
                v-bind:key="index"
                v-for="(item, index) in menu"
                :class="'/homeAdmin/'+item.path === $route.path ? 'item-drawer-active' : ''"
                v-on:click="changeMenu(item.path)"
            >
              <v-list-item-icon>
                <v-icon class="item-drawer">{{item.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="item-drawer-text">{{item.text}}</v-list-item-title>
             </v-list-item> 


              <v-divider class="divider"></v-divider>
            
            <v-list-item class="item-drawer-signout" v-on:click="logout">
              <v-list-item-title class="item-drawer-text">Cerrar Sesión</v-list-item-title>
              <v-list-item-icon>
                <v-icon class="item-drawer-signout-icon">mdi-exit-to-app</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <div class="container-side ">
        <v-app-bar
            :class="{'v-toolbar':false}"
            class="app-bar-container"
            ref="appbar"
        >
          <v-spacer></v-spacer>
          <v-toolbar-title >{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
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
    this.menu = [
      {text: "Gestionar Cuentas", icon: "mdi-account", path: "accounts"},
      {text: "Gestionar Productos", icon: "mdi-database", path: "products"},
    ];
    this.title = router.currentRoute.name;

  },
  methods: {
    ...mapActions('account', ['logout']),
    changeMenu(ruta) {
      router.push({path: ruta}).then(() => {
        this.title = router.currentRoute.name;

      }).catch(() => {
      });
    },
    logout() {
      router.push({path: "/home/data"}).catch(() => {
      });
    },
  }

}
</script>
<style lang="sass" scoped>
@import "@/styles/home/_home.sass"

</style>
