<template>
    <div class="tesla-car">
        <div class="tesla-wheels">
            <div :class="`tesla-wheel tesla-wheel--front tesla-wheel--${wheelsize}--${ speed }`"></div>
            <div :class="`tesla-wheel tesla-wheel--rear tesla-wheel--${wheelsize}--${speed}`"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tesla-car',
        props: {
            wheelsize: {
                type: Number,
                required: true
            },
            speed: {
                type: Number,
                required: true
            }
        },
        created() {
        }
    };
</script>

<style lang="scss">
    @mixin prefix($property, $value) {
        $prefixes: (webkit moz ms o);
        @each $prefix in $prefixes {
            #{'-' + $prefix + '-' + $property}: $value;
        }
        // Output standard non-prefixed declaration
        #{$property}: $value;
    }

    .tesla-car {
        width: 100%;
        min-height: 350px;
        background: #fff url(../../assets/tesla.jpg) no-repeat top center;
        background-size: contain;
    }

    .tesla-wheels {
        height: 247px;
        width: 555px;
        position: relative;
        margin: 0 auto;
    }

    .tesla-wheel {
        height: 80px;
        width: 80px;
        bottom: 0;
        position: absolute;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: cover;
        &--front {
            left: 53px;
        }
        &--rear {
            right: 72px;
        }
        &--19 {
            &--45 {
                background-image: url(../../assets/wheel-19.png);
                @include prefix(animation, infinite-spinning 230ms steps(6) infinite);
            }
            &--50 {
                background-image: url(../../assets/wheel-19.png);
                @include prefix(animation, infinite-spinning 200ms steps(6) infinite);
            }
            &--55 {
                background-image: url(../../assets/wheel-19.png);
                @include prefix(animation, infinite-spinning 170ms steps(6) infinite);
            }
            &--60 {
                background-image: url(../../assets/wheel-19.png);
                @include prefix(animation, infinite-spinning 140ms steps(6) infinite);
            }
            &--65 {
                background-image: url(../../assets/wheel-19.png);
                @include prefix(animation, infinite-spinning 110ms steps(6) infinite);
            }
            &--70 {
                background-image: url(../../assets/wheel-19.png);
                @include prefix(animation, infinite-spinning 80ms steps(6) infinite);
            }
        }
        &--21 {
            &--45 {
                background-image: url(../../assets/wheel-21.png);
                @include prefix(animation, infinite-spinning 480ms steps(12) infinite);
            }
            &--50 {
                background-image: url(../../assets/wheel-21.png);
                @include prefix(animation, infinite-spinning 400ms steps(12) infinite);
            }
            &--55 {
                background-image: url(../../assets/wheel-21.png);
                @include prefix(animation, infinite-spinning 320ms steps(12) infinite);
            }
            &--60 {
                background-image: url(../../assets/wheel-21.png);
                @include prefix(animation, infinite-spinning 240ms steps(12) infinite);
            }
            &--65 {
                background-image: url(../../assets/wheel-21.png);
                @include prefix(animation, infinite-spinning 160ms steps(12) infinite);
            }
            &--70 {
                background-image: url(../../assets/wheel-21.png);
                @include prefix(animation, infinite-spinning 80ms steps(12) infinite);
            }
        }
    }

    @keyframes infinite-spinning {
        from {
            @include prefix(transform, rotate(0deg));
        }
        to {
            @include prefix(transform, rotate(360deg));
        }
    }

    @-webkit-keyframes infinite-spinning {
        from {
            @include prefix(transform, rotate(0deg));
        }
        to {
            @include prefix(transform, rotate(360deg));
        }
    }


</style>