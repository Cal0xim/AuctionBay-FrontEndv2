export const sanitizeString = (value: string) => {
  return value.trim().replace(/</g, '').replace(/>/g, '');
};

export const sanitizeNumber = (value: number) => {
  return isNaN(value) || value < 0 ? 0 : value;
};