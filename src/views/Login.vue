<template>
  <div class="main">

    <card-login></card-login>
  </div>
</template>
<script>
import CardLogin from '../components/CardLogin.vue'

export default {
  components: {
    CardLogin
  }
}
</script>

<style scoped lang="sass">
@import "@/styles/login/_login.sass"
</style>