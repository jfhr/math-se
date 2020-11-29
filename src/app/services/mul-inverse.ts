/**
 * Returns n' so that n * n' = 1 mod m and 0 < n' < m
 */
export function mulInverse(n: number, m: number): number {
  let a = n % m;
  let b = m;
  let q;
  let r;

  let xT2 = 1;
  let xT1 = 0;
  let xT0;

  // do the calculation as long as there is a rest
  while (true) {
    // calculate the new values
    q = Math.floor(a / b);
    r = a % b;

    if (r === 0) {
      break;
    }

    xT0 = xT2 - xT1 * q;
    xT2 = xT1;
    xT1 = xT0;

    // rotate the values for the next iteration.
    a = b;
    b = r;
  }

  return xT0 < 0 ? xT0 + m : xT0;
}
