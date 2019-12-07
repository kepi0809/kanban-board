<template>
  <div class="drag-container">
    <p style="color:white">{{ activeTask }}</p>
    <ul class="drag-list">
      <DragColumn
        v-for="task of tasksGrouppedByStatus"
        :key="task.title"
        :title="task.title"
        :progress="task.progress"
        :color="task.color"
        :tasks="task.tasks"
        @openTaskModal="activeTask = $event"
      />
    </ul>
    <TaskModal
      :show="!!activeTask"
      :task="activeTask"
      @dismiss="activeTask = null"
      @updateTaskByKey="updateTaskByKey($event)"
    />
  </div>
</template>

<script>
/* eslint-disable no-console, no-unused-vars, vue/no-unused-components  */
import DragColumn from '@/components/DragColumn.vue'
import SingleCard from '@/components/SingleCard.vue'
import TaskModal from '@/components/TaskModal.vue'

export default {
  components: {
    DragColumn,
    SingleCard,
    TaskModal,
  },
  data() {
    return {
      activeTask: null,
      tasks: [
        {
          id: 1,
          title: 'Asd',
          description: 'description',
          progress: { value: 0, title: 'backlog' },
        },
        {
          id: 2,
          title: 'Asd',
          description: 'description',
          progress: { value: 0, title: 'backlog' },
        },
        {
          id: 3,
          title: 'Asd',
          description: 'description',
          progress: { value: 0, title: 'backlog' },
        },
        {
          id: 4,
          title: 'Asd',
          description: 'description',
          progress: { value: 1, title: 'In Progress' },
        },
        {
          id: 5,
          title: 'Asd',
          description: 'description',
          progress: { value: 2, title: 'Done' },
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
  mounted() {
    let dragged

    /* events fired on the draggable target */
    document.addEventListener('drag', function(event) {}, false)

    document.addEventListener(
      'dragstart',
      function(event) {
        dragged = event.target
        event.target.style.opacity = 0.5
      },
      false
    )

    document.addEventListener(
      'dragend',
      function(event) {
        event.target.style.opacity = ''
      },
      false
    )

    document.addEventListener(
      'dragover',
      function(event) {
        event.preventDefault()
      },
      false
    )

    document.addEventListener(
      'drop',
      (event) => {
        event.preventDefault()
        const draggedElement = dragged
        const container = dragged.parentElement.parentElement
        const indexOfElement = this.getNodeIndex(draggedElement)
        const indexOfContainer = this.getNodeIndex(container)
        const tasksStatusKey = this.getTasksStatusKeyByContainer(
          indexOfContainer
        )

        const wrapper = this.getParentById(event.toElement, 'drag-column')
        if (!wrapper) return
        const targetProgress = Number(wrapper.id[wrapper.id.length - 1])
        if (targetProgress === indexOfContainer) return
        console.log(tasksStatusKey)
        console.log(indexOfElement)
        this.updateTaskByKey({
          taskToUpdate: this[tasksStatusKey][indexOfElement],
          keyValuePair: {
            key: 'progress',
            value: {
              title: this.getTitleOfTaskStatusByValue(targetProgress),
              value: targetProgress,
            },
          },
        })
      },
      false
    )
  },
  methods: {
    getTitleOfTaskStatusByValue(statusValue) {
      switch (statusValue) {
        case 0:
          return 'Backlog'
        case 1:
          return 'In Progress'
        case 2:
          return 'Done'
      }
    },
    getNodeIndex(node) {
      let index = 0
      while ((node = node.previousSibling)) {
        index++
      }
      return index
    },
    getParentById(node, className) {
      if (node.id && node.id.includes('progress')) return node
      while ((node = node.parentElement)) {
        if (node.id && node.id.includes('progress')) return node
      }
      return null
    },
    getTasksStatusKeyByContainer(indexOfContainer) {
      switch (indexOfContainer) {
        case 0:
          return 'backlogTasks'
        case 1:
          return 'inProgressTasks'
        case 2:
          return 'doneTasks'
      }
    },
    updateTaskByKey({ taskToUpdate, keyValuePair: { key, value } }) {
      if (this.activeTask)
        this.activeTask = { ...this.tasks[index], [key]: value }
      const index = this.tasks.findIndex((task) => task.id === taskToUpdate.id)
      this.tasks.splice(index, 1, {
        ...this.tasks[index],
        [key]: value,
      })
    },
  },
}
</script>
<style lang="scss">
$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

* {
  box-sizing: border-box;
}

body {
  background: #33363d;
  color: white;
  font-family: 'Lato';
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  max-width: 1000px;
  margin: 20px auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;

  @media (max-width: 690px) {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: rgba(black, 0.2);
  overflow: hidden;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }

  h2 {
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
  padding: 10px;
}

.drag-inner-list {
  min-height: 50px;
  color: white;
}

.drag-item {
  margin: 10px;
  height: 100px;
  background: rgba(black, 0.4);
  transition: $ease-out;

  &.is-moving {
    transform: scale(1.5);
    background: rgba(black, 0.8);
  }
}

.drag-header-more {
  cursor: pointer;
}
</style>
