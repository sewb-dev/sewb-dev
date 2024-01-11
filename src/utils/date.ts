export const getDateObject = (timestamp: number | string): Date => {
  return new Date(timestamp);
};

export const getDateString = (
  date: Date | number,
  usePreffix = false
): string => {
  const tempDate = new Date(date);
  return `${
    usePreffix && tempDate.getDate() <= 9 ? '0' : ''
  }${tempDate.getDate()}-${usePreffix && tempDate.getMonth() <= 9 ? '0' : ''}${
    tempDate.getMonth() + 1
  }-${tempDate.getFullYear()}`;
};

const getTimeString = (date: Date | number, usePreffix = false): string => {
  const tempDate = new Date(date);

  return `${
    usePreffix && tempDate.getHours() <= 9 ? '0' : ''
  }${tempDate.getHours()}:${
    usePreffix && tempDate.getMinutes() <= 9 ? '0' : ''
  }${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
};

export const getDateandTime = (date: Date | number): string => {
  return `${getDateString(date, true)} ${getTimeString(date, true)}`;
};
