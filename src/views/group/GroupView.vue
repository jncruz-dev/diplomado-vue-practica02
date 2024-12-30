<template>
  <div>
    <AddGroupView v-model:showAdd="showModalAdd" @on-register="onAddGroup()" />
    <EditGroupView v-model:showEdit="showModalEdit" @on-update="onUpdateGroup()" :item="groupToEdit" />

    <h1>Lista Grupos</h1>
    <div>
      <button class="btn btn-sm btn-primary" @click="showModalAdd = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        Agregar
      </button>

      <div class="input-group input-group-sm mb-3" style="float: right; width: 250px;">
        <input type="search" class="form-control" placeholder="Buscar por nombre" v-model="textToSearch"
          @search="search()">
        <button class="btn btn-outline-secondary" type="button" id="button-search" @click="search()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </button>
      </div>
    </div>
    <table class="table table-striped mt-3">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(group, index) in groupsList" :key="index">
          <td>{{ 1 + index }}</td>
          <td>{{ group.name }}</td>
          <td>
            <div class="d-flex justify-content-end" style="gap: 2px;">
              <button type="button" class="btn btn-sm btn-outline-dark" @click="editGroup(group)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteGroup(group.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddGroupView from './AddGroupView.vue'
import EditGroupView from './EditGroupView.vue';

export default {
  name: 'Group',
  data() {
    return {
      currentPage: 1,
      showModalAdd: false,
      showModalEdit: false,
      groupToEdit: null,
      groupsList: [],
      textToSearch: ''
    }
  },
  components: {
    AddGroupView,
    EditGroupView
  },
  methods: {
    getList() {
      const self = this;
      this.axios.get(this.baseUrl + '/groups?q=' + this.textToSearch)
        .then(response => {
          console.log(response);
          self.groupsList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    search() {
      this.getList();
    },
    onAddGroup() {
      this.getList();
      this.showModalAdd = false;
      this.$toast.show('Grupo agregado exitosamente', 'success');
    },
    onUpdateGroup() {
      this.getList();
      this.showModalEdit = false;
      this.groupToEdit = null;
      this.$toast.show('Grupo actualizado exitosamente', 'success');
    },
    editGroup(group) {
      this.groupToEdit = Object.assign({}, group);
      this.showModalEdit = true;
    },
    deleteGroup(id) {
      if (confirm("¿Esta Seguro de eliminar el registro?")) {
        const vm = this;
        this.axios.delete(this.baseUrl + "/groups/" + id)
          .then(function () {
            vm.getList();
            vm.$toast.show("Registro eliminado.", "success");
          })
          .catch(function (error) {
            console.error(error);
            vm.$toast.show("Error al eliminar registro.", "danger");
          });
      }

    },
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    baseUrl() {
      console.log('baseUrl');
      return this.getBaseUrl;
    }
  },
  mounted() {
    this.getList();
  }
}
</script>
