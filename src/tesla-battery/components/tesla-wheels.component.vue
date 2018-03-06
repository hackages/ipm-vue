<template>
    <div class="tesla-wheels">
        <p class="tesla-wheels__title">Wheels</p>
        <div class="tesla-wheels__container cf">
            <label v-for="size in sizes" :key="size" :class="[{'tesla-wheels__item--active' : (value === size), 'tesla-wheels__item--focused': (focused === size),'tesla-wheels__item': true}, `tesla-wheels__item--${size}`]">
                <input type="radio" name="wheelsize" :value="size" @blur="onBlur()" @click="onClick(size)" @focus="onFocus(size)" :checked="value === size">
                <p>
                    {{ size }}"
                </p>
            </label>
        </div>
    </div>
</template>

<script>
export default {
  name: 'tesla-wheels',
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      sizes: [19, 21],
      value: null,
      focused: null,
    };
  },
  methods: {
    onBlur() {
      this.focused = '';
    },
    onFocus(size) {
      this.focused = size;
    },
  },
};
</script>

<style lang="scss" scoped>
.tesla-wheels {
  float: left;
  width: 355px;
  &__title {
    letter-spacing: 2px;
    font-size: 16px;
  }
  &__container {
    margin: 10px 0 0;
  }
  &__item {
    cursor: pointer;
    width: 47%;
    height: 65px;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 20px 0 0 90px;
    margin: 0 8px 0 0;
    background-color: #f7f7f7;
    background-position: 24.21053% 9px;
    background-repeat: no-repeat;
    background-size: 44px;
    &--19 {
      background-image: url(../../assets/wheels/19.svg);
    }
    &--21 {
      background-image: url(../../assets/wheels/21.svg);
    }
    &--focused {
      background-color: #f2f2f2;
    }
    &--active {
      border-color: #39f;
      box-shadow: inset 0px 0px 0px 1px #39f;
    }
    p {
      font-family: 'RobotoNormal';
      font-size: 16px;
      font-weight: 400;
      color: #333;
    }
    input[type='radio'] {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
  }
}
</style>
