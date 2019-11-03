import {stringifyNumber} from './stringify-number';

describe('stringify-number', () => {

  it('should stringify numbers correctly', () => {
    expect(stringifyNumber(0)).toEqual('0th');
    expect(stringifyNumber(1)).toEqual('1st');
    expect(stringifyNumber(2)).toEqual('2nd');
    expect(stringifyNumber(3)).toEqual('3rd');
    expect(stringifyNumber(4)).toEqual('4th');
    expect(stringifyNumber(21)).toEqual('21st');
    expect(stringifyNumber(32)).toEqual('32nd');
    expect(stringifyNumber(193)).toEqual('193rd');
  });

});
