<template>
    <div>
        <label class="tesla-climate__item" :class="{'tesla-heat' :!limit, 'tesla-climate__item--active': value, 'tesla-climate__item--focused': focused === value}">
            <p>{{ (limit ? 'ac' : 'heat') }} {{ value ? 'on' : 'off' }}</p>
            <i class="tesla-climate__icon"></i>
            <input type="checkbox" name="climate" :checked="value" @click="onClick()" @blur="onBlur()" @focus="onFocus()">
        </label>
    </div>
</template>

<script>
export default {
  name: 'tesla-climate',
  props: {
    limit: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    onBlur() {
      this.focused = false;
    },
    onFocus() {
      this.focused = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.tesla-climate {
  float: left;
  &__item {
    cursor: pointer;
    display: inline-block;
    width: 100px;
    height: 100px;
    border: 6px solid #f7f7f7;
    border-radius: 50%;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    color: #666;
    background: #fff;
    &--active {
      color: #fff;
      background: #33a0ff;
      background: -moz-linear-gradient(top, #33a0ff 0%, #388bff 100%);
      background: -webkit-linear-gradient(top, #33a0ff 0%, #388bff 100%);
      background: linear-gradient(to bottom, #33a0ff 0%, #388bff 100%);
      &.tesla-heat {
        background: #d64800;
        background: -moz-linear-gradient(top, #d64800 0%, #d20200 100%);
        background: -webkit-linear-gradient(top, #d64800 0%, #d20200 100%);
        background: linear-gradient(to bottom, #d64800 0%, #d20200 100%);
      }
    }
  }
  &__icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 8px auto 0;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(../../assets/climate/ac-off.svg);
    .tesla-heat & {
      background-image: url(../../assets/climate/heat-off.svg);
    }
    .tesla-climate__item--active & {
      background-image: url(../../assets/climate/ac-on.svg);
    }
    .tesla-climate__item--active.tesla-heat & {
      background-image: url(../../assets/climate/heat-on.svg);
    }
  }
  p {
    margin: 14px 0 0;
    text-align: center;
    font-size: 10px;
    text-transform: uppercase;
  }
  input[type='checkbox'] {
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
</style>
