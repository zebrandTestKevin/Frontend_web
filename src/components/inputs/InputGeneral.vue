<template>
  <div>
    <v-row no-gutters class="label">{{label}}</v-row>
    <v-row no-gutters>
      <div class="icon-card">
        <v-icon class=" icon">{{icon}}</v-icon>
      </div>
      <v-col>
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
              :readonly="readonly"
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
    "readonly": {type: Boolean, default: false},
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
@import "@/styles/general/_input-general.sass"
</style>
