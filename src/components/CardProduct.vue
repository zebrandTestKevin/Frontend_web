<template>
  <Grid>
    <v-card
    class="mx-auto"
    max-width="344"
    dark
  >
    <v-img
      :src="url"
      height="200px"
      width="250px"
    ></v-img>

    <v-card-title>
      {{name}}
    </v-card-title>

    <v-card-subtitle >
      <v-row class="mx-0">
        Costo: {{price}} Bs
      </v-row>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        v-on:click="openProduct(item)"
      >
        Ver
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
    item:{
      type: Object
    },
    name:{
      String
      },
    url:{
      String
    },
    price:{
      Number
    }
  },
  methods: {
    openProduct(item) {
      this.$emit("openProduct", item);
    },
  }
}
</script>