/**
 * Returns n' so that n * n' = 1 mod m and 0 < n' < m
 */
export function mulInverse(n: number, m: number): number {
  let a = n % m;
  let b = m;
  let q;
  let r;

  // do the calculation as long as there is a rest
  do {
    // calculate the new values
    q = Math.floor(a / b);
    r = a % b;

    // rotate the values for the next iteration.
    a = b;
    b = r;
  } while (r !== 0);

  return b < 0 ? b + m : b;
}
