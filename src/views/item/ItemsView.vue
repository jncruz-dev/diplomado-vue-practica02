<template>
  <div>
    <AddItemView v-model:showAdd="showModalAdd" @on-register="onAddItem()" />
    <EditItemView v-model:showEdit="showModalEdit" @on-update="onUpdateItem()" :item="itemToEdit" />

    <h1>Lista de Compra</h1>
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

    <!-- Filter -->
    <div style="margin: 20px 0; width: 30%">
      <h5>Filtros:</h5>
      <form @submit.prevent="filterData()">
        <div class="input-group input-group-sm mb-3">
          <label class="input-group-text" for="group">Grupo:</label>
          <select class="form-select" id="group" v-model="filter.groupId">
            <option value="">Todos</option>
            <option :value="group.id" v-for="(group, index) in groupList" :key="`group-${index}`">
              {{ group.name }}
            </option>
          </select>
          <button type="submit" class="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-filter">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
            </svg>
            Fitrar
          </button>
        </div>
      </form>
    </div>

    <table class="table table-striped mt-3">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th style="width: 120px">Completado</th>
          <th>Nombre</th>
          <th>Grupo</th>
          <th>Unidad</th>
          <th>Cantidad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemsList" :key="index">
          <td>{{ 1 + index }}</td>
          <td>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-sm btn-outline-primary" @click="completeItem(item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-check">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </button>
            </div>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.group.name }}</td>
          <td>{{ item.unit ? item.unit : '-' }}</td>
          <td>{{ item.quantity ? item.quantity : '-' }}</td>
          <td>
            <div class="d-flex justify-content-end" style="gap: 2px;">
              <button type="button" class="btn btn-sm btn-outline-dark" @click="editItem(item)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteItem(item.id)">
                <svg xmlns=" http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
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
import AddItemView from './AddItemView.vue'
import EditItemView from './EditItemView.vue'

export default {
  name: 'ItemsView',
  data() {
    return {
      currentPage: 1,
      showModalAdd: false,
      showModalEdit: false,
      itemsList: [],
      groupList: [],
      textToSearch: '',
      textToFilter: '',
      itemToEdit: {},
      filter: {
        groupId: ''
      }
    }
  },
  components: {
    AddItemView,
    EditItemView
  },
  methods: {
    getList() {
      const self = this;
      this.axios.get(this.baseUrl + '/items?_expand=group' + this.textToFilter + '&q=' + this.textToSearch)
        .then(response => {
          console.log(response);
          self.itemsList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getGroupList() {
      const self = this;
      this.axios.get(this.baseUrl + '/groups')
        .then(response => {
          console.log(response);
          self.groupList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    search() {
      this.getList();
    },
    filterData() {
      this.textToFilter = '';
      if (this.filter.groupId != null && this.filter.groupId != '') {
        this.textToFilter += "&groupId=" + this.filter.groupId;
      }
      this.getList();
    },
    onAddItem() {
      this.getList();
      this.showModalAdd = false;
      this.$toast.show('Item agregado exitosamente', 'success');
    },
    onUpdateItem() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = {};
      this.$toast.show('Item actualizado exitosamente', 'success');
    },
    editItem(item) {
      this.itemToEdit = Object.assign({}, item);
      this.showModalEdit = true;
    },
    deleteItem(id) {
      if (confirm("¿Esta Seguro de eliminar el registro?")) {
        const vm = this;
        this.axios.delete(this.baseUrl + "/items/" + id)
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
    completeItem(id) {
      const vm = this;
      this.axios.delete(this.baseUrl + "/items/" + id)
        .then(function (response) {
          vm.getList();
          vm.$toast.show("Registro completado.", "success");
        })
        .catch(function (error) {
          console.error(error);
          vm.$toast.show("Error al actualizar registro.", "danger");
        });
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
    this.getGroupList();
  }
}
</script>
