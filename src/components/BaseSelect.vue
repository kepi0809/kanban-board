<template>
  <on-click-outside :do="close">
    <div class="search-select" :class="{ 'is-active': isOpen }">
      <button
        ref="button"
        type="button"
        class="search-select-input"
        @click="open"
      >
        <span v-if="value">{{ value }}</span>
        <span v-else class="search-select-placeholder">Select an option…</span>
      </button>
      <div v-show="isOpen" ref="dropdown" class="search-select-dropdown">
        <input
          ref="search"
          class="search-select-search"
          @keydown.esc="close"
          @keydown.up="highlightPrev"
          @keydown.down="highlightNext"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.tab.prevent
        />
        <ul
          v-show="options.length > 0"
          ref="options"
          class="search-select-options"
        >
          <li
            v-for="(option, i) in options"
            :key="option"
            class="search-select-option"
            :class="{ 'is-active': i === highlightedIndex }"
            @click="select(option)"
            >{{ option }}</li
          >
        </ul>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import OnClickOutside from '@/components/util/OnClickOutside.vue'

export default {
  components: { OnClickOutside },
  props: {
    value: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    index: { type: Number, default: 0 },
  },
  data() {
    return {
      isOpen: false,
      highlightedIndex: 0,
    }
  },
  methods: {
    open() {
      if (this.isOpen) {
        this.$refs.search.focus()
        return
      }
      this.isOpen = true
      this.$nextTick(() => {
        this.$refs.search.focus()
        this.highlightedIndex = this.index
        this.scrollToHighlighted()
      })
    },
    close() {
      if (!this.isOpen) return
      this.isOpen = false
      this.$refs.button.focus()
    },
    select(option) {
      this.$emit('selectOption', option)
      this.search = ''
      this.highlightedIndex = 0
      this.close()
    },
    selectHighlighted() {
      this.select(this.options[this.highlightedIndex])
    },
    scrollToHighlighted() {
      this.$refs.options.children[this.highlightedIndex].scrollIntoView({
        block: 'nearest',
      })
    },
    highlight(index) {
      this.highlightedIndex = index

      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.options.length - 1
      }

      if (this.highlightedIndex > this.options.length - 1) {
        this.highlightedIndex = 0
      }

      this.scrollToHighlighted()
    },
    highlightPrev() {
      this.highlight(this.highlightedIndex - 1)
    },
    highlightNext() {
      this.highlight(this.highlightedIndex + 1)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets';

.search-select {
  position: relative;
  &-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: left;
    display: block;
    width: 100%;
    border-width: 1px;
    padding: $spacing-2 $spacing-3;
    background-color: #fff;
    border-radius: 0.25rem;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  &-placeholder {
    color: $background-gray;
  }

  &.is-active .search-select-input {
    box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
  }
  &-dropdown {
    margin-top: $spacing-1;
    margin-bottom: $spacing-1;
    position: absolute;
    right: 0;
    left: 0;
    background-color: $text-dark;
    padding: $spacing-2;
    border-radius: 0.25rem;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    z-index: 50;
  }
  &-search {
    opacity: 0;
    position: absolute;
    z-index: -1;
    top: -500rem;
    left: -500rem;
  }
  &-options {
    list-style: none;
    padding: 0;
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 14rem;
  }

  &-option {
    padding: $spacing-1 / 2 $spacing-1;
    font-size: $spacing-2;
    color: #fff;
    cursor: pointer;
    border-radius: 0.25rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover {
      background-color: darken($background-gray, 20);
    }

    &.is-active,
    &.is-active:hover {
      background-color: $background-blue;
    }
  }
}
</style>
