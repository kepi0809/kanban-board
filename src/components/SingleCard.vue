<template functional>
  <li
    :id="props.task.id"
    class="drag-item"
    draggable="true"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      click: () => {
        listeners.openTaskModal(props.task)
      },
    }"
    >{{ props.task.title }}{{ props.task.description }}</li
  >
</template>
