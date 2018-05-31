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
    <tesla-panel :window="window"
                 :light="light"
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
        const miles = this.models[model][this.wheels][
          this.climate ? 'on' : 'off'
        ].speed[this.speed.value][this.temperature.value];
        return {
          model,
          miles,
        };
      });
    },
  },
  methods: {
    changeClimate() {
      this.climate = !this.climate;
    },
    getStats() {
      // fetch the mocks with import() and for the differents models you need
    },
  },
};
</script>