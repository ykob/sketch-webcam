<script>
export default {
  name: 'App',
  data() {
    return {
      webcam: null
    };
  },
  async mounted() {
    const WebCam = await import('@/components/common/WebCam.js');
    this.webcam = new WebCam.default();
    await this.webcam.init();
  }
};
</script>

<template lang="pug">
  #app
    router-view
</template>

<style lang="scss"></style>
