<template>
  <v-btn outlined width="100%" class="button-login">
    {{name}}
  </v-btn>

</template>

<script>
export default {


  props: {
    "name": {type: String, default: "input"},
  },
}
</script>

<style scoped lang="sass">
@import "@/styles/login/_buttonLogin.sass"
</style>
