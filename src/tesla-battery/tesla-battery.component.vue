<template>
    <form class="tesla-battery">
        <h1>{{ title }}</h1>

        <!-- TeslaCarComponent -->
        <tesla-car :wheels="tesla.wheels" :speed="tesla.speed"/>
        <!-- End TeslaCarComponent -->

        <!-- TeslaStatsComponent -->
        <div class="tesla-stats">
            <ul>
                <li v-for="stat in stats" :key="stat.model">
                    <div :class="'tesla-stats-icon tesla-stats-icon--'+stat.model |  lowercase"></div>
                    <p>{{ stat.miles | km }}</p>
                </li>
            </ul>
        </div>
        <!-- EndTeslaStatsComponent -->

        <div class="tesla-controls cf">

            <!-- TeslaCounterComponent for speed -->
            <div class="tesla-counter">
                <p class="tesla-counter__title">Speed</p>
                <div class="tesla-counter__container cf">
                    <div class="tesla-counter__item" tabindex="0" @blur="onBlurSpeed($event)" @keydown="onKeyUpSpeed($event)" @focus="onFocusSpeed($event)">
                        <p class="tesla-counter__number">
                            {{tesla.speed | km}}
                            <span>kmh</span>
                        </p>
                        <div class="tesla-counter__controls" tabindex="-1">
                            <button tabindex="-1" type="button" @click="incrementSpeed()" :disabled="tesla.speed === counterSpeed.max"></button>
                            <button tabindex="-1" type="button" @click="decrementSpeed()" :disabled="tesla.speed === counterSpeed.min"></button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End TeslaCounterComponent for speed -->


            <div class="tesla-climate cf">

                <!-- TeslaCounterComponent for outside temperature -->
                <div class="tesla-counter">
                    <p class="tesla-counter__title">Outside Temperature</p>
                    <div class="tesla-counter__container cf">
                        <div class="tesla-counter__item" tabindex="0" @blur="onBlurTemperature($event)" @keydown="onKeyUpTemperature($event)" @focus="onFocusTemperature($event)">
                            <p class="tesla-counter__number">
                                {{tesla.temperature}}
                                <span>°</span>
                            </p>
                            <div class="tesla-counter__controls" tabindex="-1">
                                <button tabindex="-1" type="button" @click="incrementTemperature()" :disabled="tesla.temperature === counterTemperature.max"></button>
                                <button tabindex="-1" type="button" @click="decrementTemperature()" :disabled="tesla.temperature === counterTemperature.min"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End TeslaCounterComponent for outside temperature -->


                <!-- TeslaClimateComponent -->
                <div>
                    <label class="tesla-climate__item"
                           :class="{'tesla-heat' :!limitHeat, 'tesla-climate__item--active': tesla.climate, 'tesla-climate__item--focused': climate.focused === tesla.climate}">
                        <p>{{ (limitHeat ? 'ac' : 'heat') }} {{ tesla.climate ? 'on' : 'off' }}</p>
                        <i class="tesla-climate__icon"></i>
                        <input type="checkbox" name="climate" :checked="value" @click="changeClimate()"
                               @blur="onBlurClimate()"
                               @focus="onFocusClimate()">
                    </label>
                </div>
                <!-- End TeslaClimateComponent -->

            </div>

            <!-- TeslaWheelsComponent -->
            <div class="tesla-wheels">
                <p class="tesla-wheels__title">Wheels</p>
                <div class="tesla-wheels__container cf">
                    <label v-for="size in wheels.sizes" :key="size"
                           :class="[{'tesla-wheels__item--active' : (wheels.value === size), 'tesla-wheels__item--focused': (wheels.focused === size),'tesla-wheels__item': true}, `tesla-wheels__item--${size}`]">
                        <input type="radio" name="wheelsize" :value="size" @blur="onBlurWheels()"
                               @click="changeWheelSize(size)" @focus="onFocusWheels(size)"
                               :checked="wheels.value === size">
                        <p>
                            {{ size }}"
                        </p>
                    </label>
                </div>
            </div>
            <!-- End TeslaWheelsComponent -->

        </div>
        <div class="tesla-battery__notice">
            <p>
                The actual amount of range that you experience will vary based on your particular use conditions. See
                how particular use conditions may affect your range in our simulation model.
            </p>
            <p>
                Vehicle range may vary depending on the vehicle configuration, battery age and condition, driving style
                and operating, environmental and climate conditions.
            </p>
        </div>
    </form>
</template>

<script>
    import TeslaCar from './components/tesla-car.component';

    import teslaService from './tesla-battery.service';

    export default {
        name: 'tesla-battery',
        components: {
            TeslaCar,
        },
        data() {
            return {
                title: 'Ranger Per Charge',
                results: ['60', '60D', '75', '75D', '90D', 'P100D'],
                tesla: {
                    speed: 55,
                    temperature: 20,
                    climate: true,
                    wheels: 19,
                },
                wheels: {
                    sizes: [19, 21],
                    value: null,
                    focused: null,
                },
                climate: {
                    focused: false,
                },
                counterTemperature: {
                    focused: false,
                    min: -10,
                    max: 40,
                    step: 10
                },
                counterSpeed: {
                    focused: false,
                    min: 45,
                    max: 70,
                    step: 5
                }
            };
        },
        computed: {
            models() {
                return teslaService.getModelData();
            },
            stats() {
                return this.results.map(model => {
                    const {speed, temperature, climate, wheels} = this.tesla;
                    const miles = this.models[model][wheels][climate ? 'on' : 'off'].speed[
                        speed
                        ][temperature];
                    return {
                        model,
                        miles,
                    };
                });
            },
            limitHeat() {
                return this.tesla.temperature > 10;
            },
        },
        methods: {
            changeClimate() {
                this.tesla.climate = !this.tesla.climate;
            },
            changeWheelSize(size) {
                this.tesla.wheels = size;
            },
            onBlurWheels() {
                this.wheels.focused = null;
            },
            onFocusWheels(size) {
                this.wheels.focused = size;
            },
            onBlurClimate() {
                this.tesla.climate.focused = false;
            },
            onFocusClimate() {
                this.tesla.climate.focused = true;
            },
            incrementTemperature(){
                if (this.tesla.temperature < this.counterTemperature.max) {
                    this.tesla.temperature = this.tesla.temperature + this.counterTemperature.step;
                }
            },
            decrementTemperature(){
                if ( this.tesla.temperature > this.counterTemperature.min) {
                    this.tesla.temperature = this.tesla.temperature - this.counterTemperature.step;
                }
            },
            onFocusTemperature(event) {
                this.counterTemperature.focused = false;
                event.preventDefault();
                event.stopPropagation();
            },
            onBlurTemperature(event) {
                this.counterTemperature.focused = true;
                event.preventDefault();
                event.stopPropagation();
            },
            onKeyUpTemperature(event) {
                let handlers = {
                    ArrowDown: () => this.decrementTemperature(),
                    ArrowUp: () => this.incrementTemperature(),
                };

                if (handlers[event.code]) {
                    handlers[event.code]();
                    event.preventDefault();
                    event.stopPropagation();
                }
            },
            incrementSpeed(){
                if (this.tesla.speed < this.counterSpeed.max) {
                    this.tesla.speed = this.tesla.speed + this.counterSpeed.step;
                }
            },
            decrementSpeed(){
                if ( this.tesla.speed > this.counterSpeed.min) {
                    this.tesla.speed = this.tesla.speed - this.counterSpeed.step;
                }
            },
            onFocusSpeed(event) {
                this.counterSpeed.focused = false;
                event.preventDefault();
                event.stopPropagation();
            },
            onBlurSpeed(event) {
                this.counterSpeed.focused = true;
                event.preventDefault();
                event.stopPropagation();
            },
            onKeyUpSpeed(event) {
                let handlers = {
                    ArrowDown: () => this.decrementSpeed(),
                    ArrowUp: () => this.incrementSpeed(),
                };

                if (handlers[event.code]) {
                    handlers[event.code]();
                    event.preventDefault();
                    event.stopPropagation();
                }
            },
        },
        filters: {
            lowercase(value) {
                return !value ? '' : value.toLowerCase();
            },
            km(value) {
                return Math.floor(value * 1.609344);
            },
        },
    };
</script>
