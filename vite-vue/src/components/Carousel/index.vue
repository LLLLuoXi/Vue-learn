<template>
  <div class="carousel">
    <div class="carousel-inner" :style="dimention">
      <Carouselindicators
        v-if="indicators"
        :count="slides.length"
        :active="currentSlide"
        @switch="switchSlide($event)"
      />
      <Carouselltem
        v-for="(slide, index) in slides"
        :key="`slide-${index}`"
        :slide="slide"
        :currentSlide="currentSlide"
        :index="index"
        :direction="direction"
        @mouseenter="stopSlideTimer"
        @mouseout="startSlideTimer"
      />
      <CarouselControls v-if="controls" @prev="prev" @next="next" />
    </div>
  </div>
</template>

<script>
import Carouselltem from "./Carouselltem.vue";
import CarouselControls from "./CarouselControls.vue";
import Carouselindicators from "./Carouselindicators.vue";
export default {
  props: {
    slides: {
      type: Array,
      required: true,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    indicators: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 3000,
    },
    width: {
      type: Number,
      default: 900,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  computed: {
    dimention() {
      return {
        width: this.width + "px",
        height: this.height + "px",
      };
    },
  },
  data: () => ({
    currentSlide: 0,
    slideInterval: null,
    direction: "right",
  }),
  components: { Carouselltem, CarouselControls, Carouselindicators },
  mounted() {
    this.startSlideTimer();
  },
  beforeUnmount() {
    this.stopSlideTimer();
  },
  methods: {
    switchSlide(index) {
      console.log("this.currentSlide", this.currentSlide);
      console.log("index", index);
      const step = index - this.currentSlide;
      if (step > 0) {
        this.next(step);
      } else {
        this.prev(step);
      }
    },
    stopSlideTimer() {
      clearInterval(this.slideInterval);
    },
    startSlideTimer() {
      this.stopSlideTimer();
      this.slideInterval = setInterval(() => {
        this._next();
      }, this.interval);
    },
    setcurrentSlide(index) {
      this.currentSlide = index;
    },
    prev(step = -1) {
      const index =
        this.currentSlide > 0
          ? this.currentSlide + step
          : this.slides.length - 1;
      this.setcurrentSlide(index);
      this.direction = "left";
      this.startSlideTimer();
    },
    _next(step = 1) {
      const index =
        this.currentSlide < this.slides.length - 1
          ? this.currentSlide + step
          : 0;
      this.setcurrentSlide(index);
      console.log(index);
      this.direction = "right";
    },
    next(step = 1) {
      this._next(step);
      this.startSlideTimer();
    },
  },
};
</script>

<style scoped lang="less">
.carousel {
  display: flex;
  justify-content: center;
  &-inner {
    position: relative;
    // width: 900px;
    // height: 400px;
    overflow: hidden;
  }
}
</style>
