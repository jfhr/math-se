import {convert} from './base-converter';

describe('Base converter', () => {

  it('should convert from decimal to binary', () => {
    const input = '255';
    const expected = '11111111';
    const result = convert(input).fromBase(10).toBase(2);
    expect(result).toEqual(expected);
  });

  it('should implicitly use decimal if no base is specified', () => {
    const input = 255;
    const expected = '11111111';
    const result = convert(input).toBase(2);
    expect(result).toEqual(expected);
  });

  it('should convert from hex to binary', () => {
    const input = 'DEADBEEF';
    const expected = '11011110101011011011111011101111';
    const result = convert(input).fromBase(16).toBase(2);
    expect(result).toEqual(expected);
  });

  it('should convert from binary to hex', () => {
    const input = '11011000';
    const expected = 'd8';
    const result = convert(input).fromBase(2).toBase(16);
    expect(result).toEqual(expected);
  });

  it('should tolerate leading zeroes', () => {
    const input = '0011011000';
    const expected = 'd8';
    const result = convert(input).fromBase(2).toBase(16);
    expect(result).toEqual(expected);
  });

});
