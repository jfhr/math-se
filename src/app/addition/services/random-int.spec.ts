import {randomInt} from './random-int';

describe('random-integer-generator', () => {

  it('should produce an integer within the given limits', () => {
    const result = randomInt(12, 24);
    expect(result).toBeGreaterThanOrEqual(12);
    expect(result).toBeLessThan(24);
    expect(result % 1).toEqual(0);
  });

});
