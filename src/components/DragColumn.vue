<template functional>
  <li
    :id="`progress-${props.progress}`"
    class="drag-column"
    :style="{ backgroundColor: props.color }"
  >
    <h2 class="drag-column-header">{{ props.title }}</h2>

    <ul class="drag-inner-list">
      <li
        class="drag-item"
        @click="
          listeners.addNewTask({
            title: '',
            description: '',
            progress: { value: props.progress, title: 'backlog' },
            isCompleted: false,
          })
        "
      >
        <p class="drag-item__description">+</p>
      </li>
      <slot />
    </ul>
  </li>
</template>
