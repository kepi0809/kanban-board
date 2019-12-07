<template>
  <li
    :id="card.id"
    class="drag-item"
    draggable="true"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      click: () => {
        show = true
      },
    }"
    >{{ card.title }}{{ card.description
    }}<TaskModal
      :show="show"
      :task="card"
      @dismiss="show = !show"
      @updateTaskByKey="$emit('updateTaskByKey', $event)"
  /></li>
</template>

<script>
import TaskModal from '@/components/TaskModal.vue'
export default {
  components: { TaskModal },
  props: { card: { type: Object, default: () => ({}) } },
  data() {
    return { show: false }
  },
}
</script>
