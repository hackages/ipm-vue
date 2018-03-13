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
