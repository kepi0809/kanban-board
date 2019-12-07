<template functional>
  <li
    :id="`progress-${props.progress}`"
    class="drag-column"
    :style="{ backgroundColor: props.color }"
  >
    <span class="drag-column-header">
      <h2>{{ props.title }}</h2>
      <svg
        class="drag-header-more"
        data-target="options1"
        fill="#FFFFFF"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        />
      </svg>
    </span>

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
