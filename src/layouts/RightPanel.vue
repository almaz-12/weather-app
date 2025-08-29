<script setup>
  import { computed, onMounted } from 'vue';
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

const emits = defineEmits(['get-city']);

function getCity(city) {
  emits('get-city', city)
}

onMounted(() => {
console.log(props.weatherData)
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

      <SelectCity @select-city="getCity"/>
    </div>
</template>

<style scoped>
.right {
  display: flex;
  flex-direction: column;
  gap: 70px;
  background: var(--color-bg-main);
  padding: 60px 50px;
  border-radius: 25px;
  max-width: 513px;
  width: 100%;
  min-height: 625px;
}
</style>
