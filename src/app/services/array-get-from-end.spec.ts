import {getFromEnd} from './array-get-from-end';

describe('Array > Get from end', () => {

  it('should return the last element in the array if no index is given', () => {
    const actual = getFromEnd(['a', 'b', 'c']);
    expect(actual).toEqual('c');
  });

  it('should return the element at the given reverse index', () => {
    const actual = getFromEnd(['a', 'b', 'c'], 1);
    expect(actual).toEqual('b');
  });

  it('should return undefined if the given index does not exist', () => {
    const actual = getFromEnd(['a', 'b', 'c'], 3);
    expect(actual).toBeUndefined();
  });

  it('should return undefined if given an empty array', () => {
    const actual = getFromEnd([]);
    expect(actual).toBeUndefined();
  });

});
