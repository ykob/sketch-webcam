<script>
import MathEx from 'js-util/MathEx';
import normalizeWheel from 'normalize-wheel';

export default {
  name: 'ScrollWrap',
  data() {
    return {
      scrollY: 0,
      anchorY: 0,
      anchorYPrev: 0,
      clientHeight: 0
    };
  },
  watch: {
    '$store.state.resolution.y'() {
      setTimeout(this.resize, 10);
    }
  },
  computed: {
    styles() {
      return {
        transform: `translate3d(0, ${-this.scrollY}px, 0)`
      };
    }
  },
  created() {
    this.scrollY = 0;
    this.anchorY = 0;
    this.anchorYPrev = 0;
  },
  mounted() {
    window.addEventListener('wheel', this.wheel, { passive: false });
    window.addEventListener('touchstart', this.touchstart);
    window.addEventListener('touchmove', this.touchmove);
    this.resize();
    this.update();
  },
  destroyed() {
    window.removeEventListener('wheel', this.wheel, { passive: false });
    window.removeEventListener('touchstart', this.touchstart);
    window.removeEventListener('touchmove', this.touchmove);
  },
  methods: {
    update() {
      this.scrollY =
        Math.floor((this.scrollY + (this.anchorY - this.scrollY) / 10) * 100) /
        100;
      requestAnimationFrame(this.update);
    },
    wheel(e) {
      e.preventDefault();

      const n = normalizeWheel(e);
      const { state } = this.$store;

      if (this.isWheeling === true) return;

      this.anchorY = MathEx.clamp(
        this.anchorY + n.pixelY,
        0,
        this.clientHeight - state.resolution.y
      );
    },
    touchstart() {
      this.anchorYPrev = this.anchorY;
    },
    touchmove() {
      const { state } = this.$store;

      if (state.isTouchMoving === true) {
        // Scroll the content of the current page.
        this.anchorY = MathEx.clamp(
          this.anchorYPrev - state.touchMove.y * 1.5,
          0,
          this.clientHeight - state.resolution.y
        );
      }
    },
    resize() {
      const { state } = this.$store;

      this.clientHeight = this.$refs['wrap'].clientHeight;
      this.anchorY = MathEx.clamp(
        this.anchorY,
        0,
        this.clientHeight - state.resolution.y
      );
    }
  }
};
</script>

<template lang="pug">
div(
  :style = 'styles'
  ref = 'wrap'
)
  slot
</template>

<style lang="scss" scoped></style>
