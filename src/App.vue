<template>
    <div id="app">
        <header class="header">
            <img :src="logo">
        </header>
        <div class="wrapper">
            <tesla-battery></tesla-battery>
        </div>
    </div>
</template>

<script>
import TeslaBattery from './tesla-battery/tesla-battery.component';

import logo from './assets/logo.svg';

export default {
  name: 'app',
  components: {
    TeslaBattery,
  },
  data() {
    return {
      logo,
    };
  },
};
</script>

<style>
@import 'styles.css';
</style>

<style lang="scss">
:host {
  display: block;
}

.header {
  padding: 25px 0;
  text-align: center;
  background: #222;
  img {
    width: 100px;
    height: 13px;
  }
}

.wrapper {
  margin: 100px 0 150px;
}
</style>
