<script setup>
import { computed, ref } from 'vue';
import SelectCity from './components/SelectCity.vue';
import StatList from './components/StatList.vue';
import CardList from './components/CardList.vue';
import AppSidebar from './layouts/AppSidebar.vue';

import { APP_KEY } from '../env';
import { API_ENDPOINT, API_DAYS, API_LANG, STAT_LABELS } from './common/constants';

const weatherData = ref(null);
const isLoading = ref(true);
const errorMessage = ref(null);

const dayTemperature = ref([
  {
    id: 0,
    temperature: 23,
    day: new Date(),
    weatherCode: 1000,
  },
  {
    id: 1,
    temperature: 25,
    day: new Date(),
    weatherCode: 1003,
  },
  {
    id: 2,
    temperature: 13,
    day: new Date(),
    weatherCode: 1009,
  }
])

const weatherStats = computed(() => {
  if(!weatherData.value) {
    return [];
  }
  return [
    { label: STAT_LABELS.humidity, stat: `${weatherData.value.humidity} %` },
    { label: STAT_LABELS.cloud, stat: `${weatherData.value.cloud} %` },
    { label: STAT_LABELS.wind, stat: `${weatherData.value.wind} м/ч` },
  ];
});

const fetchData = async (city) => {
  const query = new URLSearchParams({
    key: APP_KEY,
    q: city,
    days: API_DAYS,
    lang: API_LANG,
  });

  try {
    errorMessage.value = null;
    isLoading.value = true;

    const response = await fetch(`${API_ENDPOINT}/forecast.json?${query}`);

    if(!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const data = await response.json();
    console.log(data);

    weatherData.value = {
      humidity: data.current?.humidity || 0,
      cloud: data.current?.cloud || 0,
      wind: data.current?.wind_kph || 0,
    };

    return data;
  } catch (error) {
    errorMessage.value = `Не удалось загрузить данные для города "${city}"`;
    throw error;
  } finally {
    isLoading.value = false;
  }
}

async function getCity(city) {
  await fetchData(city);
}
</script>

<template>
  <div class="wrap">
    <AppSidebar />
    <main class="main">
      <div v-if="isLoading">Загрузка данных...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div class="stat-list" v-else-if="weatherStats.length">
        <StatList v-for="stat in weatherStats" :key="stat.label" v-bind="stat"/>
      </div>
      <CardList :stats="dayTemperature"/>
      <SelectCity @select-city="getCity"/>
    </main>
  </div>

</template>

<style scoped>
.wrap {
  display: flex;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 70px;
  background: var(--color-bg-main);
  padding: 60px 50px;
  border-radius: 25px;
  width: 513px;
}
</style>
