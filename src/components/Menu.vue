<template>
  <div class="navbar px-4">
    <div class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
      Shopping List
    </div>
    <div class="d-flex justify-content-end">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0284c7;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  margin-bottom: 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
  display: inline-block;
}

.navbar a:hover {
  background-color: #38bdf8;
}

.navbar .logo {
  display: flex;
  gap: .5rem;
  font-size: 1.2em;
  font-weight: bold;
}

.navbar .menu {
  display: flex;
  padding-right: 20px;
}
</style>
