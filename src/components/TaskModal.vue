<template>
  <ModalDialog :show="show" :with-close-button="false" @close="dismiss">
    <header class="modal__header">
      <button class="modal__header_button-complete">Mark as Completed</button>
      <button class="modal__header_button-close" @click="dismiss"
        ><IconBase icon-name="Close modal" view-box="0 0 352 512"
          ><TimesIcon /></IconBase
      ></button>
    </header>
    <BaseSelect
      v-if="task"
      :options="['Backlog', 'In Progress', 'Done']"
      :value="$options.selectOptions[task.progress.value]"
      :index="task.progress.value"
      @selectOption="updateTaskStatus"
    />
    <article v-if="task" class="modal__body">
      <InputTextLooking :value="task.title" @input="updateTaskTitle" />
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

<style lang="scss" module>
// @import '@design';

// .items {
//   &__heading {
//     margin-top: 0;
//   }

//   &__empty {
//     padding: $spacing-2 $spacing-32 $spacing-0 $spacing-32;
//     text-align: center;
//     &__icon {
//       width: 100%;
//       height: 100%;
//       margin-bottom: $spacing-4;
//     }

//     &__caption {
//       margin: $spacing-4 0;
//     }
//   }
// }

// .total {
//   display: flex;
//   align-items: baseline;
//   justify-content: space-between;

//   &__heading {
//     margin: 0;
//     color: $color-heading-text;
//   }
// }

// .checkout {
//   text-align: right;

//   &__button {
//     padding: $spacing-2 $spacing-3;
//     margin-top: $spacing-4;
//     color: white;
//     background: $color-text;
//     border-radius: 4px;
//   }
// }
</style>
