<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: { type: String, default: 'box' },
    width: { type: [Number, String], default: 24 },
    height: { type: [Number, String], default: 24 },
    iconColor: { type: String, default: 'currentColor' },
    viewBox: { type: String, default: '0 0 24 24' },
  },
}
</script>

<style scoped>
svg {
  display: inline-block;
  margin-bottom: -2px;
  vertical-align: baseline;
}
</style>
