<template>
  <div class="tesla-car">
    <div class="car">
      <div class="tesla-outside"></div>
      <div :class="['tesla-windows', window]"></div>
      <div class="tesla-inside"></div>
      <div :class="['tesla-inside-light', light ? 'light' : '']"></div>
    </div>

    <div class="tesla-wheels">
      <div :class="`tesla-wheel tesla-wheel--front tesla-wheel--${unit}--${wheelsize}--${speed}`"></div>
      <div :class="`tesla-wheel tesla-wheel--rear tesla-wheel--${unit}--${wheelsize}--${speed}`"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tesla-car',
  props: {
    wheelsize: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    light: {
      type: Boolean,
      required: true,
    },
    window: {
      validator: function(val) {
        return val === null || typeof val === 'string';
      },
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
};
</script>
