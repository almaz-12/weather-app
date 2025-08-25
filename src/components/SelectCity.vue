

<script setup>
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import AppIcon from '../icons/AppIcon.vue';
import AppInput from './AppInput.vue';

const btnIcon = "Location";

const isEditCity = ref(false);
const cityName = ref('Moscow');
const emit = defineEmits(['selectCity']);

function handleSelectCity() {
  isEditCity.value = true;
}

function handleEditCity() {
  isEditCity.value = false;
  console.log(cityName.value);
  emit('selectCity',cityName.value);
}
</script>

<template>
  <div class="form" v-if="isEditCity">
    <AppInput v-model="cityName" placeholder="Введите город"/>
    <BaseButton @click="handleEditCity">
      Сохранить
    </BaseButton>
  </div>
  <BaseButton v-else @click="handleSelectCity">
    <AppIcon :name="btnIcon"/>
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