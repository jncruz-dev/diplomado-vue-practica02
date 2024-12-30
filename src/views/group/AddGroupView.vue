<template>
  <Modal v-if="isVisible" title="Agregar grupo">
    <template #default>
      <form @submit.prevent="submitForm()">
        <div class="form-group">
          <label for="name" class="form-label">Nombre:</label>
          <input type="text" id="name" v-model="form.name" class="form-control"
            :class="{ 'is-invalid': errors.name }" />
          <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
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
  name: 'AddGroupView',
  data() {
    return {
      form: {
        name: null
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
      this.axios.post(this.baseUrl + "/groups", this.form)
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
}
</script>

<style lang="scss" scoped></style>