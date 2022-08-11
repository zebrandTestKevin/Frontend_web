<template>
  <div>
    <v-row no-gutters class="label">{{label}}</v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="input">
          <v-textarea
              dark
              dense
              class="input-in"
              hide-details="true"
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
  </div>

</template>

<script>
export default {


  props: {
    "label": {type: String, default: "input"},
    "icon": {type: String, default: "mdi-map-marker"},
    "type": {type: String, default: "text"},
    "lim": {type: String, default: "1"},
    "auto": {type: String, default: ""},
    "rules": {},
    value: {}
  },
  data: () => ({}),
  methods: {
    input(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/general/_input-area-general.sass"
</style>
