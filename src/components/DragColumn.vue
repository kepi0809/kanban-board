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

    <!-- <div id="options1" class="drag-options"></div> -->

    <ul class="drag-inner-list">
      <li
        v-for="card of props.cards"
        :id="card.id"
        :key="card.id"
        class="drag-item"
        draggable="true"
        >{{ card.title }}{{ card.description }}</li
      >
    </ul>
  </li>
</template>
