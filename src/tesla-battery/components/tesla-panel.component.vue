<template>
  <div class="option">

    <div @click="toggleLight"
         :class="light ? 'borderblue' : 'bordergrey'">
      <div :class="light ? 'light-on' : 'light-off'"></div>
    </div>
    <div @click="toggleWindow"
         :class="window ? 'borderblue' : 'bordergrey'">
      <div :class="window ? 'window-on' : 'window-off'"></div>
    </div>
    <div @click="togglekmMiles"
         :class="onMiles ? 'borderblue' : 'bordergrey'">
      <div class="fontbutton">{{onMiles ? 'MILES' : 'KM'}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'tesla-panel',
  props: {
    toggleWindow: {
      required: true,
      type: Function,
    },
    toggleLight: {
      required: true,
      type: Function,
    },
    togglekmMiles: {
      required: true,
      type: Function,
    },
    light: {
      type: Boolean,
      required: true,
    },
    window: {
      type: Boolean,
      required: true,
    },
    onMiles: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
∏