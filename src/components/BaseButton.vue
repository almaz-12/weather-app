<script setup>
</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: var(--gradient);
  padding: 14px;
  font-family: var(--font);
  font-size: 20px;
  font-weight:600;
  color: var(--primary);
  cursor: pointer;
}
.btn:hover {
  background: var(--gradient-inverted);
}
</style>