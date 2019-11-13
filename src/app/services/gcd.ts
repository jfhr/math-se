/**
 * Calculate the greates common divisor of a and b.
 */
export function gcd(a: number, b: number) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}
