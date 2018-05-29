<template>
  <div class="panel-options">
    <div @click="toggleLight"
         :class="light ? 'borderblue' : 'bordergrey'">
      <div :class="light ? 'light-on' : 'light-off'"></div>
    </div>
    <div @click="toggleWindow"
         :class="window === 'open' ? 'borderblue' : 'bordergrey'">
      <div :class="`window-${window || 'close'}`"></div>
    </div>
    <div @click="toggleKmMiles"
         :class="onMiles ? 'borderblue' : 'bordergrey'">
      <div class="fontbutton">{{unit}}</div>
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
    toggleKmMiles: {
      required: true,
      type: Function,
    },
    light: {
      type: Boolean,
      required: true,
    },
    window: {
      type: String,
      required: true,
    },
    onMiles: {
      type: Boolean,
      require: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
};
</script>