export const useDateFormatter = () => {
  const formatWeekday = (date, format = 'short') => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', { weekday: format });
  };

  return { formatWeekday };
};