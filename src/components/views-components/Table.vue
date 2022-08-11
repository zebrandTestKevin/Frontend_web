<template>
  <div>
    <v-data-table
        class="main-table"
        dark
        :disable-sort="true"
        :headers="headers"
        :items="items"
        :disable-filtering="true"
        :disable-pagination="true"
        hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            small
            class="edit-icon"
            v-on:click="editValue(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            class="delete-icon"
            v-on:click="deleteValue(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <div class="paginator-container">
      <h4 class="total-label">{{1+10*page}} - {{10+10*page}} de <h4 class="total-label-prin">{{total}}</h4></h4>
      <v-icon v-bind:class="{ 'paginator-button': page<=0,'paginator-button-active': page>0 }" v-on:click="previusPage">
        mdi-chevron-left
      </v-icon>
      <v-icon v-bind:class="{ 'paginator-button': total-10-page*10<=0,'paginator-button-active': total-10-page*10>0 }"
              v-on:click="nextPage">mdi-chevron-right
      </v-icon>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    "headers": {type: Array},
    "items": {type: Array},
    "title": {type: String, default: "Tabla"},
    "total": {type: Number, default: 0}
  },
  data: () => ({
    "page": 0
  }),
  methods: {
    editValue(item) {
      this.$emit("editValue", item)
    },
    deleteValue(item) {
      this.$emit("deleteValue", item)
    },
    previusPage() {
      if (this.page > 0) {
        this.page--;
        this.$emit('changePage', this.page)
      }
    },
    nextPage() {
      console.log("next");
      console.log(this.total - this.page * 10 - 10);
      if (this.total - this.page * 10 - 10 > 0) {
        this.page++;
        this.$emit('changePage', this.page)
      }
    }
  }
}
</script>

<style lang="sass">
</style>
