<script setup>
  import { computed } from 'vue';
  import { WEATHER_ICON, WEATHER_ICON_DEFAULT } from '../common/constants';
  import AppIcon from '../icons/AppIcon.vue';

  const props = defineProps({
    weatherCode: {
      type: Number,
      default: 1000,
    },
    day: {
      type: Date,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    }
  });

  const tempFull = computed(() => {
    return `${props.temperature} °C`;
  });

  const getWeatherIcon = computed(() => {
    if(WEATHER_ICON[props.weatherCode]) {
      return WEATHER_ICON[props.weatherCode];
    }
    return WEATHER_ICON_DEFAULT  ;
  })

  const getDayWeek = computed(() => {
    return props.day.toLocaleDateString('ru-RU', { weekday: "short" });
  })
</script>

<template>
  <div class="card" :class="{'active':isActive}">
    <div class="card__icon">
      <AppIcon :name="getWeatherIcon"/>
    </div>
    <div class="card__day">{{ getDayWeek }}</div>
    <div class="card__temperature">{{ tempFull }}</div>
  </div>
</template>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: center;
    padding: 17px 27px;
    color: var(--color-primary);
    background: var(--color-bg-card);
    box-shadow: 1px 2px 4px 0px var(--color-bg-main);
    border-radius: 10px;
    transition: background ease-in .25s;
    cursor: pointer;
  }

  .card__day {
    font-size: 20px;
  }

  .card__temperature {
    font-weight: 700;
    font-size: 20px;
  }

  .card:hover {
    background: #3A434F;
  }
  .card.active {
    background: var(--color-primary);
    color: var(--color-primary-inverted);
  }
</style>
