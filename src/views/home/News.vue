<template>
  <v-row class="main-container" no-gutters>
    <v-col cols="11" xl="10" lg="10">
      <v-row><br></v-row>
      <v-row class="header-container">
        <v-col cols="12" lg="4" sm="5" md="4" xl="3">
          <input-search
              :label="'Buscar Noticia'"
              v-bind:value="search"
              v-on:input="search = $event"
              @keyup.enter.native="searchData"


          >
          </input-search>
        </v-col>
        <v-col cols="12" lg="3" sm="5" md="4" xl="3">
          <v-btn class="button-add" v-on:click="addNews">
            <v-icon>mdi-plus</v-icon>
            Agregar Noticia
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table :headers="headers"
                 :items="newsList"
                 :total="totalNews"
                 @editValue="editNews($event)"
                 @deleteValue="deleteNews($event)"
                 @changePage="changePage($event)"
          >

          </Table>
        </v-col>
      </v-row>
      <edit-news-dialog></edit-news-dialog>
      <delete-news-dialog></delete-news-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Table from '../../components/views-components/Table.vue';
import {mapActions, mapState} from 'vuex'
import News from '../../models/News'
import InputSearch from '../../components/inputs/InputSearch.vue';
import EditNewsDialog from '../../components/dialogs/EditNewsDialog.vue';
import DeleteNewsDialog from '../../components/dialogs/DeleteNewsDialog';

export default {
  components: {
    Table,
    InputSearch,
    EditNewsDialog,
    DeleteNewsDialog
  },
  data: () => ({
    headers: [
      {text: 'Id', value: 'idNews', class: "item-header-left"},
      {text: 'Titulo', value: 'title', class: "item-header-center"},
      {text: 'Fecha', value: 'dateNewsView', class: "item-header-center"},
      {text: 'Acciones', value: 'actions', class: "item-header-right"}
    ],
    items: [],
    activeEdit: false,
    search: ""
  }),
  created() {
    this.getNews({n: 10, i: 0});
  },
  mounted() {
  },
  computed: {
    ...mapState('viewNewsList', ['newsList', 'totalNews', 'news']),
  },

  watch: {
    newsList(value) {
      for (let n of value) {
        n.dateNewsView = new Date(n.dateNews).toLocaleDateString('es-US')
      }
    }
  },
  methods: {
    ...mapActions('viewNewsList', ['dialogEditOpen', 'dialogDeleteOpen', 'getNews']),
    deleteNews(news) {
      console.log(news);
      this.dialogDeleteOpen(news)
    },
    addNews() {
      this.dialogEditOpen({news: new News(), title: "Agregar Noticia"})

    },
    editNews(news) {
      this.dialogEditOpen({news: news, title: "Editar Noticia"})

    },
    changePage(page) {
      this.getNews({n: 10, i: 10 * page});
    },
    searchData() {
      this.getNews({n: 10, i: 0, search: this.search});
    }
  }

}
</script>

<style lang="sass">
@import "@/styles/views/_accounts.sass"
@import "@/styles/components/_table.sass"
@import "@/styles/components/_buttons.sass"

</style>
<!--



<template>
  <div>Administrar Noticias</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
-->