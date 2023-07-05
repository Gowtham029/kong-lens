export const DateTimeFormat = (date: number): string => {
  return new Date(date * 1000).toISOString().slice(0, 19).replace('T', ' ');
};
