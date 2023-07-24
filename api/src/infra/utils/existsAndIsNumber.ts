export const existsAndIsNumber = (value: any) => {
  return !isNaN(value) && (value && typeof value === 'number');
}
