<script setup>
import { computed, ref } from 'vue';
import SelectCity from './components/SelectCity.vue';
import StatList from './components/StatList.vue';

const citySelect = ref('Moscow');
const data = ref({
  humidity: 90,
  rain: 0,
  wind: 3,
});

const dataModified = computed(() => {
  return [
    { label: "Влажность", stat: `${data.value.humidity}%` },
    { label: "Осадки", stat: `${data.value.rain}%` },
    { label: "Ветер", stat: `${data.value.wind}м/ч` },
  ];
});

function getCity(city) {
  citySelect.value = city;
}
</script>

<template>
  <main class="main">
    <div class="stat-list">
      <StatList v-for="data in dataModified" :key="data.label" v-bind="data"/>
    </div>
    <SelectCity @select-сity="getCity"/>
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
