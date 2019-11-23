/**
 * @summary
 * Return the item at the specified index in the array,
 * starting at the end of the array with index 0,
 * and counting in reverse direction.
 * If the given index does not exist, returns undefined.
 *
 * @example
 * getFromEnd(['a','b','c'])      // returns 'c'
 * getFromEnd(['a','b','c'], 1)   // returns 'b'
 * getFromEnd(['a','b','c'], 2)   // returns 'a'
 * getFromEnd(['a','b','c'], 3)   // returns undefined
 *
 * @param array The array to index
 * @param index The 0-based index, counting from the end of the array
 */
export function getFromEnd<T>(array: T[], index: number = 0): T | undefined {
  if (array.length > index) {
    return array[array.length - index - 1];
  }
  return undefined;
}
