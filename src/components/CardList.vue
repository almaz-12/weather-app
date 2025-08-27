<script setup>
  import CardItem from './CardItem.vue';

  const props = defineProps({
    stats: {
      type: Object,
      require: true,
    },
  });

</script>

<template>
  <div class="card-list">
    <CardItem v-for="item in props.stats" :key="item.id" v-bind="item"/>
  </div>
</template>

<style scoped>
  .card-list {
    display: flex;
  }
</style>
