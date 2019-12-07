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
@import 'src/assets';
.text-looking-input {
  border: none;
  border-radius: 3px;
  color: $text-dark;
  padding: $spacing-1 $spacing-2;
  font-weight: 600;
  font-size: $spacing-6;

  &:hover {
    box-shadow: inset 0 0 0 $spacing-px / 2 #9ca6af;
  }
  &:focus {
    box-shadow: inset 0 0 0 $spacing-px #9ca6af;
    outline: none;
  }
}
</style>
