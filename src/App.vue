<template>
    <div id="app">
        <TeslaBattery/>
    </div>
</template>

<script>
import TeslaBattery from './tesla-battery/tesla-battery.component';

export default {
  name: 'app',
  components: {
    TeslaBattery,
  },
};
</script>

<style>
@import 'styles.css';
</style>
