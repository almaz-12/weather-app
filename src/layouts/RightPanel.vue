<script setup>
  import { computed } from 'vue';
  import SelectCity from '../components/SelectCity.vue';
  import StatList from '../components/StatList.vue';
  import CardList from '../components/CardList.vue';

import { STAT_LABELS } from '../common/constants';

  const props = defineProps({
    weatherData: {
      type: Object,
      required: true,
    },
    errorMessage: {
      type:  String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: true,
    }
  })


const weatherStats = computed(() => {
  if(!props.weatherData) {
    return [];
  }
  return [
    { label: STAT_LABELS.humidity, stat: `${props.weatherData.humidity} %` },
    { label: STAT_LABELS.cloud, stat: `${props.weatherData.cloud} %` },
    { label: STAT_LABELS.wind, stat: `${props.weatherData.wind} м/ч` },
  ];
});

</script>

<template>
  <div class="right">
      <div v-if="isLoading">Загрузка данных...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <template v-else-if="weatherStats.length">
        <div class="stat-list" >
          <StatList v-for="item in weatherStats" :key="item.date" v-bind="item"/>
        </div>
        <CardList :stats="props.weatherData.forecastday"/>
      </template>

      <SelectCity />
    </div>
</template>

<style scoped>
.right {
  display: flex;
  flex-direction: column;
  gap: 50px;
  background: var(--color-bg-main);
  padding: 50px 40px;
  border-radius: 25px;
  width: 480px;
  min-height: 68px;
}
</style>
