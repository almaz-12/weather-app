<script setup>
import { ref } from 'vue';
import SelectCity from './components/SelectCity.vue';
import StatList from './components/StatList.vue';

const stats = [
  { label: "Влажность", stat: "90%" },
  { label: "Осадки", stat: "0%" },
  { label: "Ветер", stat: "3 м/ч" },
];

const citySelect = ref('Moscow');

function getCity(city) {
  citySelect.value = city;
}
</script>

<template>
  <main class="main">
    <div class="stat-list">
      <StatList v-for="data in stats" :key="data.label" v-bind="data"/>
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
}
</style>
