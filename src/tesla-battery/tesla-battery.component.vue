<template>
  <form class="tesla-battery">
    <h1>{{ title }}</h1>
    <tesla-car :wheelsize="tesla.wheels"
               :window="tesla.window"
               :light="tesla.light"
               :speed="tesla.speed.value"
               :unit="options.unit" />
    <tesla-stats :stats="stats"
                 :unit="options.unit" />
    <div class="tesla-controls cf">
      <tesla-counter :title="'Speed'"
                     :unit="tesla.speed.unit"
                     :step="tesla.speed.step"
                     :min="tesla.speed.min"
                     :max="tesla.speed.max"
                     v-model="tesla.speed.value" />
      <div class="tesla-climate cf">
        <tesla-counter :title="'Outside Temperature'"
                       :unit="tesla.temperature.unit"
                       :step="tesla.temperature.step"
                       :min="tesla.temperature.min"
                       :max="tesla.temperature.max"
                       v-model="tesla.temperature.value" />
        <tesla-climate :limit="tesla.temperature.value > 10"
                       :value="tesla.climate"
                       :onClick="changeClimate" />
      </div>
      <tesla-wheels v-model="tesla.wheels" />
    </div>
    <tesla-panel :toggleWindow="toggleWindow"
                 :toggleLight="toggleLight"
                 :toggleKmMiles="toggleKmMiles"
                 :window="tesla.window"
                 :light="tesla.light"
                 :onMiles="onMiles"
                 :unit="options.unit" />
    <div class="tesla-battery__notice">
      <p>
        The actual amount of range that you experience will vary based on your particular use conditions. See how particular use conditions may affect your range in our simulation model.
      </p>
      <p>
        Vehicle range may vary depending on the vehicle configuration, battery age and condition, driving style and operating, environmental and climate conditions.
      </p>
    </div>
  </form>
</template>

<script>
import TeslaCar from './components/tesla-car.component';
import TeslaClimate from './components/tesla-climate.component';
import TeslaCounter from './components/tesla-counter.component';
import TeslaStats from './components/tesla-stats.component';
import TeslaWheels from './components/tesla-wheels.component';
import TeslaPanel from './components/tesla-panel.component';

import {debounce} from 'lodash';

const defaultKmh = {
  value: 70,
  step: 10,
  min: 70,
  max: 140,
  unit: 'kmh',
};

const defaultMph = {
  value: 45,
  step: 5,
  min: 40,
  max: 70,
  unit: 'mph',
};

export default {
  name: 'tesla-battery',
  components: {
    TeslaCar,
    TeslaClimate,
    TeslaCounter,
    TeslaStats,
    TeslaWheels,
    TeslaPanel,
  },
  data() {
    return {
      title: 'Ranger Per Charge',
      models: ['75', '75D', '90D', 'P100D'],
      options: {
        models: ['75', '75D', '90D', 'P100D'],
        unit: 'KM',
      },
      tesla: {
        speed: {
          value: 70,
          step: 10,
          min: 70,
          max: 140,
          unit: 'kmh',
        },
        temperature: {
          value: 20,
          min: -10,
          max: 40,
          step: 10,
          unit: '°',
        },
        climate: true,
        wheels: 19,
        window: '',
        light: false,
      },
      metrics: [],
    };
  },
  computed: {
    stats() {
      return this.metrics.map(({model, metrics}) => {
        const {speed, temperature, climate, wheels} = this.tesla;
        const miles = metrics
          .filter(metric => metric.temp === temperature.value)
          .filter(metric => metric.wheelsize === wheels)
          .filter(metric => metric.ac === (climate ? 'on' : 'off'))[0]
          .hwy.filter(hwy => hwy.mph === speed.value)[0].miles;
        return {
          model,
          miles,
        };
      });
    },
    onMiles() {
      return this.options.unit === 'MI';
    },
  },
  methods: {
    changeClimate() {
      this.tesla.climate = !this.tesla.climate;
    },
    getStats(fileName) {
      const results = Promise.all(
        this.models.map(model => {
          return import(`../assets/mocks/${fileName}${model}Miles.json`).then(
            metrics => ({
              model,
              metrics,
            })
          );
        })
      );
      return results;
    },
    toggleWindow: debounce(function() {
      this.tesla.window = this.tesla.window === 'open' ? 'close' : 'open';
    }, 300),
    toggleLight: debounce(function() {
      this.tesla.light = !this.tesla.light;
    }, 300),
    toggleKmMiles: debounce(function() {
      this.options.unit = this.onMiles ? 'KM' : 'MI';
    }, 300),
  },
  watch: {
    options: {
      immediate: true,
      async handler() {
        this.metrics = await this.getStats(this.onMiles ? 'hybrid' : 'metric');
        this.tesla.speed = this.onMiles ? defaultMph : defaultKmh;
      },
      deep: true,
    },
  },
};
</script>
