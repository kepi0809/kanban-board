<template>
  <div class="drag-container">
    <ul class="drag-list">
      <DragColumn
        v-for="card of cardsGrouppedByStatus"
        :key="card.title"
        :title="card.title"
        :progress="card.progress"
        :color="card.color"
        :cards="card.cards"
      />
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-console, no-unused-vars */
import DragColumn from '@/components/DragColumn.vue'
export default {
  components: { DragColumn },
  data() {
    return {
      cards: [
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
    cardsGrouppedByStatus() {
      return [
        {
          title: 'Backlog',
          cards: this.backlogCards,
          color: '#998691',
          progress: 0,
        },
        {
          title: 'In Progress',
          cards: this.inProgressCards,
          color: '#e77e51',
          progress: 1,
        },
        { title: 'Done', cards: this.doneCards, color: '#a9aa88', progress: 2 },
      ]
    },
    backlogCards() {
      return this.cards.filter((card) => card.progress.value === 0)
    },
    inProgressCards() {
      return this.cards.filter((card) => card.progress.value === 1)
    },
    doneCards() {
      return this.cards.filter((card) => card.progress.value === 2)
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
        const cardsStatusKey = this.getCardsStatusKeyByContainer(
          indexOfContainer
        )

        const wrapper = this.getParentById(event.toElement, 'drag-column')
        if (!wrapper) return
        const targetProgress = Number(wrapper.id[wrapper.id.length - 1])
        if (targetProgress === indexOfContainer) return
        const originalCardIndex = this.cards.findIndex(
          (card) => card.id === this[cardsStatusKey][indexOfElement].id
        )
        if (originalCardIndex)
          this.cards.splice(originalCardIndex, 1, {
            ...this.cards[originalCardIndex],
            progress: {
              ...this.cards[originalCardIndex].progress,
              value: targetProgress,
            },
          })
      },
      false
    )
  },
  methods: {
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
    getCardsStatusKeyByContainer(indexOfContainer) {
      switch (indexOfContainer) {
        case 0:
          return 'backlogCards'

        case 1:
          return 'inProgressCards'

        case 2:
          return 'doneCards'
      }
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
