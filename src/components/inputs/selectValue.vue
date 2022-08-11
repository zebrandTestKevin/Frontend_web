<template>
  <div>
    <v-row no-gutters class="label">{{label}}</v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-select
            class="input"
            color='white'
            menu-props='{class:input}'
            solo
            dark
            v-bind:value="value"
            v-on:input="input($event)"
            :items="items"
            label="Elija una opción"
            item-text="name"
            item-value="id"
        ></v-select>
      </v-col>
    </v-row>
  </div>

</template>

<script>
export default {


  props: {
    "items": {},
    "label": {type: String, default: ""},
    "value": {}
  },
  data: () => ({}),
  mounted() {
  }
  ,
  methods: {
    input(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/general/_select-general.sass"
</style>
