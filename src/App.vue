<template>
  <Menu>
    <router-link class="btn btn-sm" to="/">Home</router-link>
    <router-link class="btn btn-sm" to="/groups">Groups</router-link>
    <router-link class="btn btn-sm" to="/about">About</router-link>
  </Menu>
  <div class="main px-4">
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main {
  padding-top: 60px;
}
</style>
