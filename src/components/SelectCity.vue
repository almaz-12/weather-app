

<script setup>
  import { inject, ref } from 'vue';
  import BaseButton from './BaseButton.vue';
  import AppIcon from '../icons/AppIcon.vue';
  import AppInput from './AppInput.vue';
  import { CITY_PROVIDE } from '../common/constants';

  const isEditCity = ref(false);
  const cityName = inject(CITY_PROVIDE)
  const cityValue = ref(cityName.value)
  const errorMessage = ref('')

  function handleSelectCity() {
    errorMessage.value = '';
    isEditCity.value = true
  }

  function handleEditCity() {
    errorMessage.value = '';
    if(!cityValue.value.trim()) {
      errorMessage.value = 'Поле не может быть пустым!';
      return;
    }
    isEditCity.value = false
    cityName.value = cityValue.value
  }

</script>

<template>
  <div class="form" v-if="isEditCity">
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
    <AppInput
      v-model="cityValue"
      v-focus
      @keyup.enter="handleEditCity"
      placeholder="Введите город"
      :class="{'error': errorMessage}"
    />
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
  position: relative;
}
.main-btn {
  margin-top: auto;
}
.error-message {
  position: absolute;
  padding: 7px;
  top: 100%;
  left:0;
  background: #e13f3f;
  border-radius: 11px;
}
.error,
.error:focus {
  border:1px solid red;
}
</style>