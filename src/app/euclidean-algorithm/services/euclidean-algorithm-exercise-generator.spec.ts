import {SimpleEuclideanGenerator} from "./simple-euclidean-generator";

describe('Extended euclidean algorithm generator', () => {

  /**
   * Expects a match between the given actual and expected values.
   * Does not differentiate between missing and undefined properties.
   */
  function expectMatch(actual, expected) {
    // noinspection SpellCheckingInspection
    for (const id of 'abqrxy') {
      if (expected[id] !== undefined) {
        expect(actual[id]).toEqual(expected[id], `incorrect ${id} value`);
      }
    }
  }

  it('should generate the correct algorithm steps', () => {
    const target = new SimpleEuclideanGenerator();
    const steps = target.getCalculationSteps(60, 42);
    expectMatch(steps[0], {x: 1, y: 0});
    expectMatch(steps[1], {x: 0, y: 1});
    expectMatch(steps[2], {a: 60, b: 42, q: 1, r: 18, x: 1, y: -1});
    expectMatch(steps[3], {a: 42, b: 18, q: 2, r: 6, x: -2, y: 3});
    expectMatch(steps[4], {a: 18, b: 6, q: 3, r: 0});
  });

});
