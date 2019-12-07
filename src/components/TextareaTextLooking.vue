<template>
  <ResizeAuto>
    <template v-slot:default="{ resize }">
      <textarea
        class="text-looking-textarea"
        v-bind="$attrs"
        rows="3"
        :value="value"
        placeholder="Description …"
        v-on="{ ...$listeners, input: resize }"
      />
    </template>
  </ResizeAuto>
</template>

<script>
import ResizeAuto from '@/components/util/ResizeAuto.vue'
export default {
  components: { ResizeAuto },
  props: { value: { type: String, default: '' } },
  methods: {
    updateInput({ target: { value } }, resize) {
      resize()
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.text-looking-textarea {
  border: none;
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  overflow: hidden;
  font-weight: 300;
  color: #37343f;
  resize: none;

  &:hover {
    box-shadow: inset 0 0 0 0.5px #9ca6af;
  }
  &:focus {
    box-shadow: inset 0 0 0 1px #9ca6af;
    outline: none;
  }
}
</style>
