<script>
export default {
  props: {
    do: {
      type: Function,
      default: function() {
        console.warn('Please provide a function for OnClickOutside component')
      },
    },
    excludedClassName: { type: String, default: '' },
  },
  mounted() {
    const listener = (e) => {
      if (
        this.excludedClassName &&
        e.target.className.includes(this.excludedClassName)
      )
        return
      if (e.target === this.$el || this.$el.contains(e.target)) {
        return
      }
      this.do()
    }
    document.addEventListener('click', listener)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', listener)
    })
  },
  render() {
    return this.$slots.default[0]
  },
}
</script>
