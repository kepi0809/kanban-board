<template functional>
  <li
    :id="props.task.id"
    class="drag-item"
    :class="{ isCompleted: props.task.isCompleted }"
    draggable="true"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      click: () => {
        listeners.openTaskModal(props.task)
      },
    }"
  >
    <h2 class="drag-item__title">{{ props.task.title }}</h2>
    <p class="drag-item__description">{{ props.task.description }}</p>
  </li>
</template>
