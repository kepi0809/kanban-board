<template>
  <HandleDragEvents
    :backlogTasks="backlogTasks"
    :inProgressTasks="inProgressTasks"
    :doneTasks="doneTasks"
    @updateTaskByKey="updateTaskByKey"
  >
    <div class="drag-container">
      <ul class="drag-list">
        <DragColumn
          v-for="task of tasksGrouppedByStatus"
          :key="task.title"
          :title="task.title"
          :progress="task.progress"
          :color="task.color"
          :tasks="task.tasks"
          @openTaskModal="activeTask = $event"
          @addNewTask="tasks.unshift($event)"
        />
      </ul>
      <TaskModal
        :show="!!activeTask"
        :task="activeTask"
        @dismiss="activeTask = null"
        @updateTaskByKey="updateTaskByKey($event)"
        @removeTaskById="removeTaskById"
      />
    </div>
  </HandleDragEvents>
</template>

<script>
/* eslint-disable no-console, no-unused-vars, vue/no-unused-components  */
import DragColumn from '@/components/DragColumn.vue'
import SingleCard from '@/components/SingleCard.vue'
import TaskModal from '@/components/TaskModal.vue'
import HandleDragEvents from '@/components/util/HandleDragEvents.vue'

export default {
  components: {
    DragColumn,
    SingleCard,
    TaskModal,
    HandleDragEvents,
  },
  data() {
    return {
      activeTask: null,
      tasks: [
        {
          id: 1,
          title: 'Title',
          description: 'description',
          progress: { value: 0, title: 'backlog' },
          isCompleted: false,
        },
        {
          id: 2,
          title: 'Title',
          description: 'description',
          progress: { value: 0, title: 'backlog' },
          isCompleted: false,
        },
        {
          id: 3,
          title: 'Title',
          description: 'description',
          progress: { value: 0, title: 'backlog' },
          isCompleted: false,
        },
        {
          id: 4,
          title: 'Title',
          description: 'description',
          progress: { value: 1, title: 'In Progress' },
          isCompleted: false,
        },
        {
          id: 5,
          title: 'Title',
          description: 'description',
          progress: { value: 2, title: 'Done' },
          isCompleted: false,
        },
      ],
    }
  },
  computed: {
    tasksGrouppedByStatus() {
      return [
        {
          title: 'Backlog',
          tasks: this.backlogTasks,
          color: '#998691',
          progress: 0,
        },
        {
          title: 'In Progress',
          tasks: this.inProgressTasks,
          color: '#e77e51',
          progress: 1,
        },
        { title: 'Done', tasks: this.doneTasks, color: '#a9aa88', progress: 2 },
      ]
    },
    backlogTasks() {
      return this.tasks.filter((task) => task.progress.value === 0)
    },
    inProgressTasks() {
      return this.tasks.filter((task) => task.progress.value === 1)
    },
    doneTasks() {
      return this.tasks.filter((task) => task.progress.value === 2)
    },
  },
  methods: {
    updateTaskByKey({ taskToUpdate, keyValuePair: { key, value } }) {
      if (this.activeTask)
        this.activeTask = { ...this.activeTask, [key]: value }
      const index = this.tasks.findIndex((task) => task.id === taskToUpdate.id)
      this.tasks.splice(index, 1, {
        ...this.tasks[index],
        [key]: value,
      })
    },
    removeTaskById(taskToRemove) {
      if (this.activeTask) this.activeTask = null
      const index = this.tasks.findIndex((task) => task.id === taskToRemove.id)
      this.tasks.splice(index, 1)
    },
  },
}
</script>
<style lang="scss">
@import 'src/assets';

$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  max-width: 1000px;
  margin: $spacing-5 auto;
}
.drag-list {
  display: block;

  @include md {
    display: flex;
    align-items: flex-start;
  }
}

.drag-column {
  flex: 1;
  margin-bottom: $spacing-5;
  position: relative;
  background: rgba(black, 0.2);
  overflow: hidden;

  @include md {
    margin: 0 $spacing-2;
  }

  > h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-2;
}

.drag-inner-list {
  color: white;
}

.drag-item {
  margin: $spacing-2;
  background: rgba(black, 0.4);
  transition: $ease-out;

  &.is-moving {
    background: rgba(black, 0.7);
  }

  &.isCompleted {
    opacity: 0.3;
  }

  &__title {
    margin: 0;
    padding-top: $spacing-2;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
  }
  &__description {
    margin: 0;
    padding: $spacing-2 0;
  }
}

.drag-header-more {
  cursor: pointer;
}
</style>
