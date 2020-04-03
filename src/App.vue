<script>
export default {
  name: 'App',
  data() {
    return {
      webcam: null
    };
  },
  async created() {
    const WebCam = await import('@/components/common/WebCam.js');
    this.webcam = new WebCam.default();
    await this.webcam.init();

    document.body.append(state.canvas);
    state.canvas.style = `
        position: absolute;
        top: 0;
        left: 0;
      `;
  }
};
</script>

<template lang="pug">
  #app
    router-view
</template>

<style lang="scss"></style>
