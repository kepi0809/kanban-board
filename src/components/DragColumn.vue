<template functional>
  <li
    :id="`progress-${props.progress}`"
    class="drag-column"
    :style="{ backgroundColor: props.color }"
  >
    <h2 class="drag-column-header">{{ props.title }}</h2>

    <ul class="drag-inner-list">
      <SingleCard
        v-for="task of props.tasks"
        :id="task.id"
        :key="task.id"
        :task="task"
        draggable="true"
        @openTaskModal="listeners.openTaskModal($event)"
      />
    </ul>
  </li>
</template>
