<template>
  <v-col cols="6">
    <v-dialog
        persistent
        v-model="dialogDeleteState"
        width="unset"
    >
      <v-card
          class="dialog-container">
        <v-card-title>
          <span class="headline">Eliminar Noticia</span>
        </v-card-title>

        <v-card-text>
          Esta seguro que desea eliminar la noticia "{{news.idNews}}"
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="btn-cancel"
              text
              @click="cancel"
          >
            Cancelar
          </v-btn>
          <v-btn
              class="btn-save"
              text
              @click="save"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-col>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import News from '../../models/News';


export default {
  props: {},
  data: () => ({
    accountEdit: {},
    newsEdit: {},
  }),

  computed: {
    ...mapState('viewNewsList', ['dialogDeleteState', 'news'])
  },
  mounted() {
  },
  watch: {
    news(value) {
      this.newsEdit = new News(value.idNews, value.title, value.content, value.dateNews, value.newsImages, value.newsUrl);

    }
  },
  methods: {
    ...mapActions('viewNewsList', ['dialogDeleteClose', 'deleteNews']),
    cancel() {
      this.dialogDeleteClose();
    },
    save() {
      this.dialogDeleteClose();
      this.deleteNews(this.newsEdit)
    }
  }
}
</script>
<style lang="sass">
@import "@/styles/dialogs/_editDialog.sass"
</style>
