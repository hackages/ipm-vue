<template>
    <div class="tesla-counter">
        <p class="tesla-counter__title">{{ title }}</p>
        <div class="tesla-counter__container cf">
            <div
                    class="tesla-counter__item"
                    tabindex="0"
                    @blur="onBlur($event)"
                    @keydown="onKeyUp($event)"
                    @focus="onFocus($event)"
            >
                <p class="tesla-counter__number">
                    {{ value }}
                    <span>{{ unit }}</span>
                </p>
                <div class="tesla-counter__controls" tabindex="-1">
                    <button tabindex="-1" type="button" @click="increment()" :disabled="value === max"></button>
                    <button tabindex="-1" type="button" @click="decrement()" :disabled="value === min"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tesla-counter',
        props: {
            step: {
                type: Number,
                required: true
            },
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                focused: false
            };
        },
        methods: {
            increment() {
                this.$emit('input', this.value + this.step);
            },
            decrement() {
                this.$emit('input', this.value - this.step);
            },
            onFocus(event){
                this.focused = false;
                event.preventDefault();
                event.stopPropagation();
            },
            onBlur(event){
                this.focused = true;
                event.preventDefault();
                event.stopPropagation();
            },
            onKeyUp(event){
                let handlers = {
                    ArrowDown: () => this.decrement(),
                    ArrowUp: () => this.increment()
                };

                if (handlers[event.code]) {
                    handlers[event.code]();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

    .tesla-counter {
        float: left;
        width: 230px;
        &__title {
            letter-spacing: 2px;
            font-size: 16px;
        }
        &__container {
            margin: 10px 0 0;
            padding-right: 40px;
            input[type=number] {
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
        &__number {
            font-family: 'RobotoNormal';
            font-size: 25px;
            line-height: 25px;
            font-weight: 400;
            position: relative;
            span {
                position: absolute;
                top: 0;
                left: 35px;
                font-size: 15px;
                text-transform: uppercase;
            }
        }
        &__item {
            position: relative;
            width: 100%;
            height: 65px;
            border: 1px solid #ccc;
            display: inline-block;
            padding: 18px 0 0 30px;
            margin: 0 8px 0 0;
            background-color: #f7f7f7;
            background-position: 24.21053% 9px;
            background-repeat: no-repeat;
            background-size: 44px;
            &:focus {
                background-color: #f2f2f2;
                outline: none;
            }
        }
        &__controls {
            position: absolute;
            right: 10px;
            top: 7px;
            button {
                outline: 0;
                width: 30px;
                color: #008dff;
                cursor: pointer;
                display: block;
                padding: 11px 0;
                vertical-align: middle;
                border: 0;
                background-size: 60%;
                background-position: center;
                background-repeat: no-repeat;
                background-color: transparent;
                &[disabled] {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
                &:first-child {
                    border-bottom: 1px solid #fff;
                    background-image: url(../../assets/counter/up.svg);
                }
                &:last-child {
                    border-top: 1px solid #ccc;
                    background-image: url(../../assets/counter/down.svg);
                }
            }
        }
    }

</style>