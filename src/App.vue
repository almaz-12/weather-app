<script setup>
import { onMounted, ref } from 'vue';

import LeftPanel from './layouts/LeftPanel.vue';
import RightPanel from './layouts/RightPanel.vue';

import { APP_KEY } from '../env';
import { API_ENDPOINT, API_DAYS, API_LANG } from './common/constants';

const weatherData = ref({});
const isLoading = ref(true);
const errorMessage = ref('');

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

    weatherData.value.forecastday = data.forecast?.forecastday.map((item) => {
      return {
        id: item.date,
        day: new Date(item.date),
        temperature: item.day.maxtemp_c,
        weatherCode: item.day.condition?.code,
      }
    })

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

onMounted(() => {
  console.log(1);
})
</script>

<template>
  <main class="wrap">
    <!-- <LeftPanel city="Moscow"/> -->
    <RightPanel
      :error-message="errorMessage"
      :weather-data="weatherData"
      :is-loading="isLoading"
      @get-city="getCity"
    />
  </main>
</template>

<style scoped>
.wrap {
  display: flex;
}

</style>
