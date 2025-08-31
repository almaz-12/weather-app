
export const API_ENDPOINT = 'http://api.weatherapi.com/v1';
export const API_DAYS = 3;
export const API_LANG = 'ru';
export const WEATHER_ICON_DEFAULT = 'Rain';
export const CITY_PROVIDE = Symbol('city');
export const ACTIVE_INDEX = Symbol('active-index');

export const STAT_LABELS = {
  humidity: "Влажность",
  cloud: "Вероятность дождя",
  wind: "Ветер"
};
/**
 * Коды погодных условий и соответствующие им иконки
 * @see https://www.weatherapi.com/docs/weather_conditions.json
 */
export const WEATHER_ICON = {
  1000: "Sun",     // Ясно
  1003: "Cloud",   // Переменная облачность
  1009: "Rain",    // Пасмурно
  1063: "Rain",    // Возможен дождь
};