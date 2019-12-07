<template>
  <input
    class="text-looking-input"
    :value="value"
    v-on="{ ...$listeners, input: updateInput }"
  />
</template>

<script>
export default {
  props: { value: { type: String, default: '' } },
  methods: {
    updateInput({ target: { value } }) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.text-looking-input {
  border: none;
  border-radius: 3px;
  padding: 0.125rem 0.25rem;
  font-weight: 600;
  font-size: 1.5rem;

  &:hover {
    box-shadow: inset 0 0 0 0.5px #9ca6af;
  }
  &:focus {
    box-shadow: inset 0 0 0 1px #9ca6af;
    outline: none;
  }
}
</style>
