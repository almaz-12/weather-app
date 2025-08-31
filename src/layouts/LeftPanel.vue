<script setup>
  import { computed } from 'vue'
  import AppIcon from '../icons/AppIcon.vue';
import { useDateFormatter } from '../composables/useDateFormatter';
import { WEATHER_ICON, WEATHER_ICON_DEFAULT } from '../common/constants';


  const props = defineProps({
    city: {
      type: String,
    },
    dayData: {
      type: Object,
    },
  })

  const { formatWeekday } = useDateFormatter();

  const getDataLocal = computed(() => {
    const date = new Date(props.dayData?.day);

    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  })


  const getDayWeekLong = computed(() => {
    return formatWeekday(props.dayData?.day, 'long');
  })

  const getWeatherText = computed(() => {
    return props.dayData?.weatherText;
  })

   const getWeatherIcon = computed(() => {
    if(WEATHER_ICON[props.dayData.weatherCode]) {
      return WEATHER_ICON[props.dayData.weatherCode];
    }
    return WEATHER_ICON_DEFAULT  ;
  })

  const tempFull = computed(() => {
    return `${props.dayData.temperature} °C`;
  });
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__day">
      <div class="sidebar__day-name">{{ getDayWeekLong }}</div>
      <div class="sidebar__day-date">{{ getDataLocal }}</div>
      <div class="sidebar__day-city">
        <AppIcon name="Location"/>
        {{props.city}}
      </div>
    </div>
    <div class="sidebar__info">
      <div class="sidebar__info-icon">
        <AppIcon :name="getWeatherIcon" :size="95"/>
      </div>
      <div class="sidebar__info-temperature">{{ tempFull }}</div>
      <div class="sidebar__info-text">{{ getWeatherText }}</div>
    </div>
  </div>
</template>

<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
    width: 493px;
    padding: 50px 30px;
    border-radius: 30px;
    overflow: hidden;
    background: url('../assets/sidebar-bg.jpg');
  }
  .sidebar__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .sidebar__info-temperature {
    font-weight: 700;
    font-size: 50px;
  }
  .sidebar__info-text {
    font-weight: 700;
    font-size: 30px;
  }
  .sidebar__day {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--color-primary);
  }

  .sidebar__day-name {
    font-weight: 700;
    font-size: 37px;
    text-transform: capitalize;
  }

  .sidebar__day-date {
    font-weight: 500;
    font-size: 22px;
  }

  .sidebar__day-city {
    display: flex;
    gap: 8px;
    font-weight: 500;
    font-size: 22px;
  }
</style>
