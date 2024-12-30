<template>
  <Modal v-if="isVisible" title="Editar grupo">
    <template #default>
      <form @submit.prevent="submitForm()" v-if="form">
        <div class="form-group">
          <label for="name" class="form-label">Name:</label>
          <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
            placeholder="Nombre" />
          <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
        </div>
      </form>
    </template>

    <template #footer>
      <button type="button" class="btn btn-light" @click="cancel">Cancelar</button>
      <button type="submit" class="btn btn-primary" @click="submitForm">Guardar</button>
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal.vue';

export default {
  name: 'EditGroupView',
  data() {
    return {
      errors: {}
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    showEdit: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Modal
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'El nombre es obligatorio.';
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
        };
        this.errors = {};
        this.$emit('update:show-edit', false);
      }
    },
    cancel() {
      this.form = {
        name: '',
      };
      this.errors = {};
      this.$emit('update:show-edit', false);
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/groups/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
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
    form() {
      return Object.assign({}, this.item);
    },
    isVisible() {
      return this.showEdit;
    }
  },
}
</script>

<style lang="scss" scoped></style>