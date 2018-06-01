<template>
  <form class="tesla-battery">
    <h1>{{ title }}</h1>
    <tesla-car :wheelsize="wheels"
               :window="window"
               :light="light"
               :speed="speed.value"
               :unit="options.unit" />
    <tesla-stats :stats="stats"
                 :unit="options.unit" />
    <div class="tesla-controls cf">
      <tesla-counter :title="'Speed'"
                     :unit="speed.unit"
                     :step="speed.step"
                     :min="speed.min"
                     :max="speed.max"
                     v-model="speed.value" />
      <div class="tesla-climate cf">
        <tesla-counter :title="'Outside Temperature'"
                       :unit="temperature.unit"
                       :step="temperature.step"
                       :min="temperature.min"
                       :max="temperature.max"
                       v-model="temperature.value" />
        <tesla-climate :limit="temperature.value > 10"
                       :value="climate"
                       :onClick="changeClimate" />
      </div>
      <tesla-wheels v-model="wheels" />
    </div>
    <tesla-panel :toggleWindow="toggleWindow"
                 :toggleLight="toggleLight"
                 :toggleKmMiles="toggleKmMiles"
                 :window="window"
                 :light="light"
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

import {debounce, difference} from 'lodash';

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
      options: {
        models: ['75', '75D', '90D', 'P100D'],
        unit: 'mi',
      },
      speed: defaultKmh,
      temperature: {
        value: 20,
        min: -10,
        max: 40,
        step: 10,
        unit: '°',
      },
      climate: true,
      wheels: 19,
      window: null,
      light: false,
      metrics: [],
    };
  },
  computed: {
    stats() {
      return this.metrics.map(({model, metrics}) => {
        const miles = metrics
          .filter(metric => metric.temp === this.temperature.value)
          .filter(metric => metric.wheelsize === this.wheels)
          .filter(metric => metric.ac === (this.climate ? 'on' : 'off'))
          .filter(metric => metric.lights === (this.light ? 'on' : 'off'))
          .filter(metric => metric.windows === (this.window || 'up'))[0]
          .hwy.filter(hwy => hwy.mph === this.speed.value)[0].miles;
        return {
          model,
          miles,
        };
      });
    },
    onMiles() {
      return this.options.unit === 'mi';
    },
  },
  methods: {
    changeClimate() {
      this.climate = !this.climate;
    },
    getStats(unit, models) {
      const results = Promise.all(
        models.map(model =>
          this.$http
            .get('https://vue-server-yibhuhmife.now.sh/api', {
              params: {
                model,
                unit,
              },
            })
            .then(({status, data}) => (status === 200 ? data : []))
            .then(metrics => ({
              model,
              metrics,
            }))
        )
      );
      return results;
    },
    toggleWindow: debounce(function() {
      this.window = this.window === 'down' ? 'up' : 'down';
    }, 300),
    toggleLight: debounce(function() {
      this.light = !this.light;
    }, 300),
    toggleKmMiles: debounce(function() {
      this.options.unit = this.onMiles ? 'km' : 'mi';
    }, 300),
  },
  watch: {
    options: {
      immediate: true,
      async handler(newOptions, oldOptions) {
        this.metrics = oldOptions
          ? [
              ...this.metrics,
              ...(await this.getStats(
                newOptions.unit,
                difference(newOptions.models, oldOptions.models)
              )),
            ]
          : await this.getStats(newOptions.unit, newOptions.models);
        this.speed = this.onMiles ? defaultMph : defaultKmh;
      },
      deep: true,
    },
  },
};
</script>
