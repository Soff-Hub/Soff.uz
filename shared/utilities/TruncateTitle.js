export const truncateTitle = (title, maxLength = 7) => {
  if (!title) return '';
  return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};