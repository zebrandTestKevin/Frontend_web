<template>
  <v-btn outlined width="100%" class="button-login">
    {{name}}
  </v-btn>

</template>

<script>
import router from '../router';
export default {
  props: {
    "name": {type: String, default: "input"},
  },
  methods: {
      homeAdmin(){
        router.push({path: "/homeAdmin/accounts"}).catch(() => {
        });
      }
    }
}
</script>

<style scoped lang="sass">
@import "@/styles/login/_buttonLogin.sass"
</style>
