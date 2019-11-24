import {SimpleEuclideanGenerator} from './simple-euclidean-generator';
import {ExtendedEuclideanGenerator} from './extended-euclidean-generator';

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
    const target = new ExtendedEuclideanGenerator();
    const steps = target.getCalculationSteps(60, 42, 'extended');
    expectMatch(steps[0], {a: 60, b: 42, q: 1, r: 18, x: 1, y: -1});
    expectMatch(steps[1], {a: 42, b: 18, q: 2, r: 6, x: -2, y: 3});
    expectMatch(steps[2], {a: 18, b: 6, q: 3, r: 0});
  });

});
