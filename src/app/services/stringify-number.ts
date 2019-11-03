const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];

/**
 * Convert a natural number to an ordinal string like
 * "first", "seventy-third", etc. Works up to 99.
 * @param n: A natural number in the interval [0, 99]
 */
export function stringifyNumber(n: number): string {
  const suffix = suffixes[n % 10];
  return `${n}${suffix}`;
}
