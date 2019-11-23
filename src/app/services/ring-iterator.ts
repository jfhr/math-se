/**
 * @summary An iterator that yields shifted copies
 * of an array indefinitely.
 *
 * @example new RingIterator(['a','b','c'])
 * next() -> ['a', 'b', 'c']
 * next() -> ['b', 'c', 'a']
 * next() -> ['c', 'a', 'b']
 * next() -> ['a', 'b', 'c']
 * ...
 */
export class RingIterator<T> implements Iterator<T[]> {
  private index = 0;

  public constructor(private items: T[]) {
  }

  public next(): IteratorResult<T[]> {
    this.index = (this.index + 1) % this.items.length;
    const value = this.items.slice(this.index).concat(this.items.slice(0, this.index));
    return {
      value, done: false,  // we're never done
    };
  }
}
