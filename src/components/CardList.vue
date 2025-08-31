<script setup>
  import { ref, computed, inject } from 'vue';
  import CardItem from './CardItem.vue';
import { ACTIVE_INDEX } from '../common/constants';

  const props = defineProps({
    stats: {
      type: Object,
      required: true,
    },
  });

  const activeIndex = inject(ACTIVE_INDEX);

  function setActiveIndex(index) {
    activeIndex.value = index
  }

</script>

<template>
  <div class="card-list" v-if="props.stats">
    <CardItem
      v-for="(item, index) in props.stats"
      :key="item.id"
      :is-active="index === activeIndex"
      v-bind="item"
      @click="setActiveIndex(index)"
    />
  </div>
</template>

<style scoped>
  .card-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
