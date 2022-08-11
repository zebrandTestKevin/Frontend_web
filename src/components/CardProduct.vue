<template>
  <Grid>
    <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{name}}
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn> -->
    </v-card-actions>
  </v-card>
  </Grid>
</template>

<script>
import Grid from './Grid.vue'

export default {
  data: () => ({
    show: false,
  }),
  components: {Grid},
  props: {
    name:{
      String
      }
  }
}
</script>