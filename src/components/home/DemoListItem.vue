<script>
export default {
  name: 'DemoListItem',
  props: {
    demo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    click(e) {
      e.preventDefault();
      const href = e.currentTarget.attributes.href.value;
      this.$router.push(href);
    }
  }
};
</script>

<template lang="pug">
a(
  :href = 'demo.path'
  @click = 'click'
)
  |{{ demo.name }}
</template>

<style lang="scss" scoped>
a {
  display: block;
  @include fontSizeAll(24, 24, 18);
}
</style>
