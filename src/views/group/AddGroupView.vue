<template>
  <div>
    <h1>Agregar grupo</h1>
    <form @submit.prevent="submitForm()">

    </form>
  </div>
</template>

<script>
export default {
  name: 'AddClient',
  data() {
    return {}
  },
  methods: {
    submitForm() {
      console.log('submitForm')
      /*if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          nombre: '',
          telefono: '',
          direccion: ''
        };
      }*/
    },
  }
}
</script>

<style lang="scss" scoped></style>