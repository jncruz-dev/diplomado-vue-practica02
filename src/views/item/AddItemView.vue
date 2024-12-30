<template>
  <Modal v-if="isVisible" title="Agregar item">
    <template #default>
      <form @submit.prevent="submitForm()">
        <div class="form-group">
          <label for="name" class="form-label">Nombre:</label>
          <input type="text" id="name" v-model="form.name" class="form-control"
            :class="{ 'is-invalid': errors.name }" />
          <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
        </div>

        <div class="form-group pt-3">
          <label for="group">Grupo:</label>
          <select id="group" v-model="form.groupId" class="form-select" :class="{ 'is-invalid': errors.groupId }">
            <option :value="group.id" v-for="(group, index) in groupsList" :key="`group-${index}`">
              {{ group.name }}
            </option>
          </select>
          <div v-if="errors.groupId" class="invalid-feedback">{{ errors.groupId }}</div>
        </div>

        <div class="form-group pt-3">
          <label for="unit" class="form-label">Unidad:</label>
          <input type="text" id="unit" v-model="form.unit" class="form-control"
            :class="{ 'is-invalid': errors.name }" />
        </div>

        <div class="form-group pt-3">
          <label for="quantity" class="form-label">Cantidad:</label>
          <input type="text" id="quantity" v-model="form.quantity" class="form-control"
            :class="{ 'is-invalid': errors.name }" />
        </div>
      </form>
    </template>

    <template #footer>
      <button type="button" class="btn btn-light" @click="cancel">Cancelar</button>
      <button type="submit" class="btn btn-primary" @click="submitForm">Agregar</button>
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal.vue';

export default {
  name: 'AddItemView',
  data() {
    return {
      groupsList: [],
      form: {
        name: null,
        groupId: null,
        unit: null,
        quantity: null
      },
      errors: {}
    }
  },
  props: {
    showAdd: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Modal
  },
  methods: {
    getGroupsList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/groups")
        .then(function (response) {
          vm.groupsList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'El nombre es obligatorio.';
      }

      if (!this.form.groupId) {
        this.errors.groupId = 'El grupo es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          name: '',
          groupId: null
        };
        this.errors = {};
        this.$emit('update:show-add', false);
      }
    },
    cancel() {
      this.form = {
        name: '',
      };
      this.errors = {};
      this.$emit('update:show-add', false);
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/items", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          vm.groupsList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    isVisible() {
      return this.showAdd;
    }
  },
  mounted() {
    this.getGroupsList()
  }
}
</script>

<style lang="scss" scoped></style>