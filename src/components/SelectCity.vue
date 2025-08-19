

<script setup>
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import AppIcon from '../icons/AppIcon.vue';

const btnIcon = "Location";

const isCitySelect = ref(false);
const cityName = ref('');
const emit = defineEmits(['selectCity']);

function handleSelectCity() {
  isCitySelect.value = true;
}

function handleSaveCity() {
  isCitySelect.value = false;
  emit('selectCity',cityName.value);
}
</script>

<template>
  <div class="form" v-if="isCitySelect">
    <input type="text" placeholder="Введите город" class="input" v-model="cityName">
    <BaseButton @click="handleSaveCity">
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
.input {
  width: 260px;
  height: 53px;
  padding: 15px 19px;
  border-radius: 10px;
  background: #272E37;
  box-shadow: 1px 2px 4px 0px #222831;
  border: none;
  color: #fff;
  font-family: var(--font);
  font-size: 18px;
}

::placeholder {
  font-family: var(--font);
  font-size: 18px;
  color: #3F4958;
}
</style>