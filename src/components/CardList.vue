<script setup>
  import { ref, computed } from 'vue';
  import CardItem from './CardItem.vue';

  const props = defineProps({
    stats: {
      type: Object,
      required: true,
    },
  });

  const activeIndex = ref(0);

  function setActiveIndex(index) {
    activeIndex.value = index
  }

</script>

<template>
  <div class="card-list">
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
