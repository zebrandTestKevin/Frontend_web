<template>
  <div>
    <v-row no-gutters>
      <div class="icon-container">
        <v-icon class=" icon">mdi-magnify</v-icon>
      </div>
      <v-col>
        <div class="input">
          <v-text-field
              dense
              class="input-in"
              v-bind:value="value"
              v-on:input="input($event)"
              single-line
              outlined
              :label="label"
              :type="type"
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
    "type": {type: String, default: "text"},
    "lim": {type: String, default: "1"},
    "auto": {type: String, default: ""},
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
@import "@/styles/general/_input-search.sass"
</style>
