<template>
  <ModalDialog :show="show" :with-close-button="false" @close="dismiss">
    <header class="modal__header">
      <button
        v-if="task"
        class="modal__header__button modal__header__button-complete"
        :class="{
          'modal__header__button-complete-isCompleted': task.isCompleted,
        }"
        @click="updateTaskCompleteness(!task.isCompleted)"
        >{{ task.isCompleted ? 'Completed' : 'Mark as Completed' }}</button
      >
      <div class="modal__header-icons">
        <button
          class="modal__header__button border-none"
          @click="$emit('removeTaskById', task)"
          ><IconBase
            icon-name="Remove task"
            view-box="0 0 448 512"
            width=".7rem"
            height=".7rem"
            ><TrashIcon /></IconBase
        ></button>
        <button class="modal__header__button border-none" @click="dismiss"
          ><IconBase
            icon-name="Close modal"
            view-box="0 0 320 512"
            width="1rem"
            height="1rem"
            ><TimesIcon /></IconBase
        ></button>
      </div>
    </header>

    <div class="modal__select">
      <BaseSelect
        v-if="task"
        :options="['Backlog', 'In Progress', 'Done']"
        :value="$options.selectOptions[task.progress.value]"
        :index="task.progress.value"
        @selectOption="updateTaskStatus"
      />
    </div>

    <article v-if="task" class="modal__body">
      <InputTextLooking
        :value="task.title"
        placeholder="Title … "
        @input="updateTaskTitle"
      />
      <TextAreaTextLooking :value="task.description" />
    </article>
  </ModalDialog>
</template>

<script>
import IconBase from '@/components/svg/IconBase.vue'
import TimesIcon from '@/components/svg/TimesIcon.vue'
import ModalDialog from '@/components/ModalDialog.vue'
import InputTextLooking from '@/components/InputTextLooking.vue'
import TextAreaTextLooking from '@/components/TextareaTextLooking.vue'
import BaseSelect from '@/components/BaseSelect.vue'
export default {
  components: {
    ModalDialog,
    IconBase,
    TimesIcon,
    InputTextLooking,
    TextAreaTextLooking,
    BaseSelect,
  },
  props: {
    show: { type: Boolean, default: false },
    task: { type: Object, default: () => ({}) },
  },
  selectOptions: ['Backlog', 'In Progress', 'Done'],
  methods: {
    dismiss() {
      this.$emit('dismiss')
    },

    updateTaskTitle(value) {
      this.$emit('updateTaskByKey', {
        taskToUpdate: this.task,
        keyValuePair: { key: 'title', value },
      })
    },

    updateTaskDescription(value) {
      this.$emit('updateTaskByKey', {
        taskToUpdate: this.task,
        keyValuePair: { key: 'description', value },
      })
    },

    updateTaskCompleteness(value) {
      this.$emit('updateTaskByKey', {
        taskToUpdate: this.task,
        keyValuePair: { key: 'isCompleted', value },
      })
    },

    updateTaskStatus(title) {
      const value = this.$options.selectOptions.findIndex(
        (option) => option.toLowerCase() === title.toLowerCase()
      )
      this.$emit('updateTaskByKey', {
        taskToUpdate: this.task,
        keyValuePair: { key: 'progress', value: { title, value } },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets';

.modal {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: $spacing-1;
    position: relative;
    text-align: start;
    border-bottom: 1px solid lighten($text-dark, 60);

    &__button {
      color: $text-dark;
      cursor: pointer;

      &:focus {
        outline: none;
        font-weight: 600;
      }

      &.border-none {
        border: none;
      }

      &-complete {
        display: block;
        border-radius: 4px;

        &-isCompleted {
          background: $background-green;
          color: white;
        }
      }
    }
    &-icons {
      display: flex;
      align-items: center;
    }
  }

  &__select {
    padding: $spacing-1 0;
  }

  &__body {
    margin-top: $spacing-3;
    > * {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: $spacing-3;
      }
    }
  }
}
</style>
