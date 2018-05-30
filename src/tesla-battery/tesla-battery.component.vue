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
    <tesla-panel :window="tesla.window"
                 :light="tesla.light"
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

import teslaService from './tesla-battery.service';

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
        unit: 'MI',
      },
      tesla: {
        speed: {
          value: 45,
          step: 5,
          min: 45,
          max: 70,
          unit: 'mph',
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
        window: null,
        light: false,
      },
      metrics: [],
    };
  },
  computed: {
    models() {
      return teslaService.getModelData();
    },
    stats() {
      // refactor the stats for the new data
      return this.options.models.map(model => {
        const {speed, temperature, climate, wheels} = this.tesla;
        const miles = this.models[model][wheels][climate ? 'on' : 'off'].speed[
          speed.value
        ][temperature.value];
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
    },
    getStats() {
      // fetch the mocks with import() and for the differents models you need
    },
  },
};
</script>