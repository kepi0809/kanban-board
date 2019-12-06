<template>
  <div id="app">
    <kanban-board />
  </div>
</template>

<script>
import KanbanBoard from './components/KanbanBoard.vue'

export default {
  name: 'App',
  components: {
    KanbanBoard,
  },
}
</script>

<style lang="scss">
@import './assets/app.scss';
</style>
