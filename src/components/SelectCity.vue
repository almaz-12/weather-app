

<script setup>
import { inject, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import AppIcon from '../icons/AppIcon.vue';
import AppInput from './AppInput.vue';
import { CITY_PROVIDE } from '../common/constants';

const isEditCity = ref(false);
const cityName = inject(CITY_PROVIDE)
const cityValue = ref(cityName.value)

function handleSelectCity() {
  isEditCity.value = true
}

function handleEditCity() {
  isEditCity.value = false
  cityName.value = cityValue.value
}

</script>

<template>
  <div class="form" v-if="isEditCity">
    <AppInput v-model="cityValue" v-focus @keyup.enter="handleEditCity" placeholder="Введите город"/>
    <BaseButton @click="handleEditCity">
      Сохранить
    </BaseButton>
  </div>
  <BaseButton v-else @click="handleSelectCity" class="main-btn">
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
.main-btn {
  margin-top: auto;
}
</style>