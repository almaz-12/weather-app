

<script setup>
import { onMounted, ref, watch } from 'vue';
import BaseButton from './BaseButton.vue';
import AppIcon from '../icons/AppIcon.vue';
import AppInput from './AppInput.vue';

const isEditCity = ref(false);
const cityName = ref('Moscow');
const emit = defineEmits(['select-city']);

onMounted(() => {
  emit('select-city',cityName.value);
});

function handleSelectCity() {
  isEditCity.value = true;
}

watch(cityName, newVal => {
  console.log('этоработает watch '+newVal);
})

function handleEditCity() {
  isEditCity.value = false;
  emit('select-city',cityName.value);
}
</script>

<template>
  <div class="form" v-if="isEditCity">
    <AppInput v-model="cityName" @keyup.enter="handleEditCity" placeholder="Введите город"/>
    <BaseButton @click="handleEditCity">
      Сохранить
    </BaseButton>
  </div>
  <BaseButton v-else @click="handleSelectCity">
    <AppIcon name="Location"/>
    Изменить город
  </BaseButton>
</template>

<style scoped>
.form {
  display: flex;
  align-items: stretch;
  gap: 12px;
}

</style>