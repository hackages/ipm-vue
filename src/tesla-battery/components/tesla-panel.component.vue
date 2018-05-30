<template>
  <div class="panel-options">
    <div :class="light ? 'borderblue' : 'bordergrey'">
      <div :class="light ? 'light-on' : 'light-off'"></div>
    </div>
    <div :class="window === 'down' ? 'borderblue' : 'bordergrey'">
      <div :class="`window-${window || 'up'}`"></div>
    </div>
    <div :class="onMiles ? 'borderblue' : 'bordergrey'">
      <div class="fontbutton">{{unit}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tesla-panel',
  props: {
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
    onMiles: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      required: true,
    },
  },
};
</script>