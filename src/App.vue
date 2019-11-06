<template>
  <div id="app">
    <img
      alt="Guthand logo"
      src="./assets/logo.png"
    >
    <kanban-board />
  </div>
</template>

<script>
import KanbanBoard from './components/KanbanBoard.vue'

export default {
  name: 'App',
  components: {
      KanbanBoard
  }
}
</script>

<style lang="scss">
  @import './assets/app.scss';
</style>
