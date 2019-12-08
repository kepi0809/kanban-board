<template>
  <portal v-if="show" to="modals">
    <div v-show="show" class="modal--wrapper">
      <OnClickOutside excludedClassName="drag-item" :do="dismiss">
        <div class="modal">
          <button
            v-if="withCloseButton"
            class="modal__button-close"
            @click="dismiss"
            ><IconBase iconName="Close modal" viewBox="0 0 352 512"
              ><TimesIcon /></IconBase
          ></button>
          <slot></slot>
        </div>
      </OnClickOutside>
    </div>
  </portal>
</template>

<script>
import IconBase from '@/components/svg/IconBase.vue'
import TimesIcon from '@/components/svg/TimesIcon.vue'
import OnClickOutside from '@/components/util/OnClickOutside.vue'
export default {
  components: { IconBase, TimesIcon, OnClickOutside },
  props: {
    show: { type: Boolean, default: false },
    withCloseButton: { type: Boolean, default: true },
  },
  watch: {
    show: {
      immediate: true,
      handler: function(show) {
        if (show) {
          document.body.style.setProperty('overflow', 'hidden')
        } else {
          document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.show) {
        this.dismiss()
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  methods: {
    dismiss() {
      this.$emit('close')
    },

    preventClose(e) {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets';
.modal {
  &--wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-4;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    @include md {
      padding: $spacing-8;
    }
  }

  position: relative;
  max-width: 80%;
  max-height: 95vh;
  padding: $spacing-2 $spacing-6;
  margin-right: auto;
  margin-left: auto;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  border-radius: $spacing-1;
  -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  @include md {
    width: 100%;
    max-width: 45rem;
    padding: $spacing-10;
    margin-top: $spacing-8;
  }

  &__button-close {
    position: absolute;
    top: $spacing-6;
    right: $spacing-6;
    font-size: $spacing-6;
    color: black;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
}
</style>
