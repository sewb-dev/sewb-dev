export const getDateObject = (timestamp: number | string): Date => {
  return new Date(timestamp);
};

export const getDateString = (date: Date | number): string => {
  const tempDate = new Date(date);
  return `${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDate()}`;
};
