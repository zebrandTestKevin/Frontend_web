<template>

  <div class="main-loading">
    <v-progress-circular
        size="70"
        class="progress"
        indeterminate>
    </v-progress-circular>

    <div no-gutters class="label">
      {{label}}
    </div>
  </div>
</template>
<script>

export default ({
  props: {
    "label": {type: String, default: ""}
  }
})
</script>

<style lang="sass" scoped>
.main-loading
  background-color: rgba(0, 0, 0, 0.6)
  width: 100vw
  height: 100vh
  text-align: center
  position: absolute !important
  top: 0px !important
  z-index: 100 !important

.progress
  color:$color2 !important
  top: 50% !important
  -ms-transform: translateY(-50%) !important
  transform: translateY(-50%) !important

.label
  color: $color2
  position: absolute
  width: 100%
  opacity: 0.9
  font-weight: 300
  font-size: 14pt
  top: 50% !important
  -ms-transform: translateY(-50%) !important
  transform: translateY(-50%) !important
  margin-top: 60px

</style>