import {RingIterator} from './ring-iterator';

describe('Ring iterator', () => {

  it('should return shifted versions of an array', () => {
    const items = ['a', 'b', 'c'];
    const iterator = new RingIterator(items);
    expect(iterator.next().value).toEqual(['a', 'b', 'c']);
    expect(iterator.next().value).toEqual(['b', 'c', 'a']);
    expect(iterator.next().value).toEqual(['c', 'a', 'b']);
    expect(iterator.next().value).toEqual(['a', 'b', 'c']);
  });

});
