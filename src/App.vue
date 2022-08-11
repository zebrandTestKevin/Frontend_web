<template>
  <div>
    <router-view/>
    <Loading v-if="loading" :label="label"></Loading>

  </div>
</template>

<script>

import Loading from './views/general/Loading'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: {
    Loading
  },

  computed: {
    ...mapState('general', ['loading', 'label']),
  },

}
</script>

<style lang="sass">
html
  margin: 0px !important
  padding: 0px !important

html
  overflow: hidden !important
  scrollbar-width: none
  -ms-overflow-style: none

</style>
