export function GetDiffBetween(start: number, end: number) {
  const differenceArray = [];
  for (let i = start; i <= end; i++) {
    differenceArray.push(i);
  }
  return differenceArray;
}
