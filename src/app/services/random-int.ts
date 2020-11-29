export function randomInt(lowerInclusiveLimit: number, upperExclusiveLimit: number) {
  if (lowerInclusiveLimit >= upperExclusiveLimit) {
    return NaN;
  }
  return Math.floor(Math.random() * (upperExclusiveLimit - lowerInclusiveLimit)) + lowerInclusiveLimit;
}
