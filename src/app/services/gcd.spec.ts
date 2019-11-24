import {gcd} from './gcd';

describe('Greatest common divisor', () => {

  it('should return gcd(2154, 458) === 2', () => {
    expect(gcd(2154, 458)).toEqual(2);
  });

  it('should return gcd(55, 25) === 5', () => {
    expect(gcd(55, 25)).toEqual(5);
  });

});
