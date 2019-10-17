/**
 * Convert the time it took to solve a question into the appropriate
 * width of the result bar.
 *
 * We use the lower half of a logistic regression curve with a variable
 * scale factor to compute the width. In general, with
 * time (ms) = t,
 * width (%) = w,
 * scale_factor = k:
 *
 * w(t) = 200 - 200 / (1 + exp(kx))
 *
 * Initially, k = -0.05, but k should change to provide adaptive feedback with
 * target value w(t) = 50. If the user gets better results than w(t) = 50,
 * k should decrease, if they get worse results, it should increase.
 * Assuming that the user takes the same time for the next exercise,
 * the target value kt for k is:
 *
 * kt = ln(1/3) / t
 *
 * To normalize the adaptive feedback, we don't set k=kt immediately.
 * Instead, we approach kt linearly. The next scale factor is kn:
 *
 * kn = k + 0.08 * (kt - k)
 */
export class MsToWidthConverter {
  private k = -0.05;

  public adaptScaleFactor(currentWidth: number) {
    const kt = Math.log(1 / 3) / (100 - currentWidth);
    this.k += 0.08 * (kt - this.k);
  }

  public getWidth(ms: number): number {
    const s: number = ms / 1000;
    return 200 - 200 / (1 + Math.exp(this.k * s));
  }
}
