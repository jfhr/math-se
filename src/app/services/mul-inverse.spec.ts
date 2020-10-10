import {mulInverse} from './mul-inverse';

describe('Multiplicative inverse', () => {

  it('should return 1 * 1 = 1 mod 2', () => {
    expect(mulInverse(1, 2)).toEqual(1);
  });

  it('should return 2 * 3 = 1 mod 5', () => {
    expect(mulInverse(2, 5)).toEqual(3);
  });

  it('should return 3 * 9 = 1 mod 26', () => {
    expect(mulInverse(3, 26)).toEqual(9);
  });

  it('should return 9 * 3 = 1 mod 26', () => {
    expect(mulInverse(9, 26)).toEqual(3);
  });

});
