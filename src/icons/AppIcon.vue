<template>
  <component :is="iconComponent"/>
</template>

<script setup>
import { computed } from 'vue';
import * as icons from './components';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const iconComponent = computed(() => icons[props.name]);
</script>
