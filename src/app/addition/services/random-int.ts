export function randomInt(lowerLimit: number, upperLimit: number) {
  if (lowerLimit >= upperLimit) {
    return NaN;
  }
  return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
}
