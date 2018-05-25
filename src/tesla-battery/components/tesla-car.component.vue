<template>
  <div class="tesla-car">
    <div class="car">
      <div class="tesla-outside"></div>
      <div :class="['tesla-windows', window ? 'open' : 'close']"></div>
      <div class="tesla-inside"></div>
      <div :class="['tesla-inside-light', light ? 'light' : '']"></div>
    </div>
    
    
    <div class="tesla-wheels">
      <div :class="`tesla-wheel tesla-wheel--front tesla-wheel--km--${wheelsize}--${speed}`"></div>
      <div :class="`tesla-wheel tesla-wheel--rear tesla-wheel--km--${wheelsize}--${speed}`"></div>
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
      type:Boolean,
      required: true
    },
    window: {
      type:Boolean,
      required:true,
    }
  },

  
};
</script>
