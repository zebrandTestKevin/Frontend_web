<template>
  <v-row no-gutters>
    <v-col cols="2" class="icon-card">
      <v-icon class=" icon">{{icon}}</v-icon>
    </v-col>
    <v-col cols="10">
      <div class="input">
        <v-text-field


            dark
            dense
            class="input-in"
            v-bind:value="value"
            v-on:input="input($event)"
            single-line
            outlined
            :label="label"
            :type="type"
            :rules="rules"
            :minlength="lim"
            :autocomplete="auto"
        />
      </div>
    </v-col>
  </v-row>

</template>

<script>
export default {


  props: {
    "label": {type: String, default: "input"},
    "icon": {type: String, default: "mdi-map-marker"},
    "type": {type: String, default: "text"},
    "lim": {type: String, default: "1"},
    "auto": {type: String, default: "username"},
    "rules": {},
  },
  data: () => ({
    value: ""
  }),
  methods: {
    input(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/login/_inputLogin.sass"
</style>
