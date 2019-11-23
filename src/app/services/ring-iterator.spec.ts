import {RingIterator} from './ring-iterator';

describe('Ring iterator', () => {

  it('should return shifted versions of an array', () => {
    const items = ['a', 'b', 'c'];
    const iterator = new RingIterator(items);
    expect(iterator.next()).toEqual(['a', 'b', 'c']);
    expect(iterator.next()).toEqual(['b', 'c', 'a']);
    expect(iterator.next()).toEqual(['c', 'b', 'a']);
    expect(iterator.next()).toEqual(['a', 'b', 'c']);
  });

});
