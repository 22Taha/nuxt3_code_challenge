<template>
  <div class="container">
    <Sidebar />
    <NuxtPage />
  </div>
</template>

<script>

</script>

<style>
  html {
    font-family: 'Plus Jakarta Sans';
  }
  body {
    margin: 0;
  }
</style>

<style scoped>
  .container {
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    display: flex;
  }
</style>