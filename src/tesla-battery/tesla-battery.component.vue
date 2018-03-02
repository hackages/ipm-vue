<template>
    <form class="tesla-battery">
        <h1>{{ title }}</h1>
        <tesla-car :wheelsize="tesla.wheels" :speed="tesla.speed"/>
        <!--<tesla-stats :stats="stats"></tesla-stats>-->
        <div class="tesla-controls cf">
             <tesla-counter
              :title="'Speed'"
              :unit="'mph'"
              :step="5"
              :min="45"
              :max="70"
              v-model="tesla.speed"/>
            <div class="tesla-climate cf">
                <tesla-counter
                   :title="'Outside Temperature'"
                   :unit="'°'"
                   :step="10"
                   :min="-10"
                   :max="40"
                   v-model="tesla.temperature"/>
                <tesla-climate
                        :limit="tesla.temperature > 10"
                        :value="tesla.climate"
                        :onClick="changeClimate" />
            </div>
            <!-- <tesla-wheels></tesla-wheels> -->
        </div>
        <div class="tesla-battery__notice">
            <p>
                The actual amount of range that you experience will vary based
                on your particular use conditions. See how particular use conditions
                may affect your range in our simulation model.
            </p>
            <p>
                Vehicle range may vary depending on the vehicle configuration,
                battery age and condition, driving style and operating, environmental
                and climate conditions.
            </p>
        </div>
    </form>
</template>

<script>
    import TeslaCar from './components/tesla-car.component';
    import TeslaClimate from './components/tesla-climate.component';
    import TeslaCounter from './components/tesla-counter.component';
    export default {
        name: 'tesla-battery',
        components: {
            TeslaCar,
            TeslaClimate,
            TeslaCounter
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
            };
        },
        computed: {
            model() {
                return {};
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
        },
        methods: {
            changeClimate() {
                this.tesla.climate = !this.tesla.climate;
            }
        }
    };
</script>

<style lang="scss">
    .tesla-battery {
        width: 1050px;
        margin: 0 auto;
        h1 {
            font-family: 'RobotoNormal';
            font-weight: 100;
            font-size: 38px;
            text-align: center;
            letter-spacing: 3px;
        }
        &__notice {
            margin: 20px 0;
            font-size: 15px;
            color: #666;
            line-height: 20px;
        }
    }

    .tesla-climate {
        float: left;
        width: 420px;
        padding: 0 40px;
        margin: 0 40px 0 0;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
    }

    .tesla-controls {
        display: block;
        width: 100%;
    }
</style>
