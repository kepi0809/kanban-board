<script>
export default {
  mounted() {
    let dragged
    const dragStartHandler = (event) => {
      dragged = event.target
      event.target.classList.add('is-moving')
    }
    document.addEventListener('dragstart', dragStartHandler, false)

    const dragEndHandler = (event) => {
      event.target.classList.remove('is-moving')
    }
    document.addEventListener('dragend', dragEndHandler, false)

    const dragOverHandler = (event) => {
      event.preventDefault()
    }
    document.addEventListener('dragover', dragOverHandler, false)

    const dropHandler = (event) => {
      event.preventDefault()
      const draggedElement = dragged
      const container = dragged.parentElement.parentElement
      const indexOfElement = this.getNodeIndex(draggedElement) - 1
      const indexOfContainer = this.getNodeIndex(container)
      const tasksStatusKey = this.getTasksStatusKeyByContainer(indexOfContainer)

      const wrapper = this.getParentById(event.toElement, 'progress')
      if (!wrapper) return
      const targetProgress = Number(wrapper.id[wrapper.id.length - 1])
      if (targetProgress === indexOfContainer) return
      this.$emit('updateTaskByKey', {
        taskToUpdate: this.$attrs[tasksStatusKey][indexOfElement],
        keyValuePair: {
          key: 'progress',
          value: {
            title: this.getTitleOfTaskStatusByValue(targetProgress),
            value: targetProgress,
          },
        },
      })
    }
    document.addEventListener('drop', dropHandler, false)

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('dragstart', dragStartHandler, false)
      document.removeEventListener('dragend', dragEndHandler, false)
      document.removeEventListener('dragover', dragOverHandler, false)
      document.removeEventListener('drop', dropHandler, false)
    })
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
    getParentById(node, id) {
      if (node.id && node.id.includes(id)) return node
      while ((node = node.parentElement)) {
        if (node.id && node.id.includes(id)) return node
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
  },
  render() {
    return this.$slots.default[0]
  },
}
</script>
