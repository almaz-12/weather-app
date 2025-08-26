<script setup>
import { computed, ref } from 'vue';
import SelectCity from './components/SelectCity.vue';
import StatList from './components/StatList.vue';

const APP_KEY = 'f7a646e051e643b69c742549252608';
const API_DAYS = 3;
const API_LANG = 'ru';
const API_ENDPOINT = 'http://api.weatherapi.com/v1';

const weatherData = ref({});
const isLoading = ref(true);

const weatherStats = computed(() => {
  if(!weatherData.value) {
    return [];
  }
  return [
    { label: "Влажность", stat: `${weatherData.value.humidity}%` },
    { label: "Облачность", stat: `${weatherData.value.cloud}%` },
    { label: "Ветер", stat: `${weatherData.value.wind}м/ч` },
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
    isLoading.value = true;
    const response = await fetch(`${API_ENDPOINT}/forecast.json?${query}`);

    if(!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const data = await response.json();

    weatherData.value = {
      humidity: data.current.humidity,
      cloud: data.current.cloud,
      wind: data.current.wind_kph,
    };

    isLoading.value = false;

    return data;
  } catch (error) {
    console.error('Ошибка загрузки погоды:', error);
    throw new Error(`Не удалось загрузить данные для города "${city}". Причина: ${error.message}`);
  }
}

async function getCity(city) {
  const data = await fetchData(city);
}
</script>

<template>
  <main class="main">
    <div v-if="isLoading">Загрузка данных...</div>
    <div class="stat-list" v-else>
      <StatList v-for="stat in weatherStats" :key="stat.label" v-bind="stat"/>
    </div>
    <SelectCity @select-city="getCity"/>
  </main>
</template>

<style scoped>
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
