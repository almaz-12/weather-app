<script setup>
  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    stat: {
      type: String,
      default: '',
    },
  })
</script>

<template>
  <div class="stat">
    <div class="stat__name">{{ props.label }}</div>
    <div class="stat__value"> {{ props.stat }}</div>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 24px;
}
.stat + .stat {
  margin-top: 16px;
}
.stat__name {
  font-weight: 700;
  text-transform: uppercase;
}

.stat__value {
  font-weight: 500;
}
</style>