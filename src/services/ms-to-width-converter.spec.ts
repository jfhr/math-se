import {MsToWidthConverter} from './ms-to-width-converter';

describe('millisecond-to-width-converter', () => {

  it('should change the scale factor to approach the target width', () => {
    const targetValue = 50;
    const target = new MsToWidthConverter();

    const before = target.getWidth(2000);
    const deltaBefore = Math.abs(targetValue - before);
    target.adaptScaleFactor(before);
    const after = target.getWidth(2000);
    const deltaAfter = Math.abs(targetValue - after);

    if (deltaBefore === 0) {
      expect(deltaAfter).toEqual(deltaBefore);
    } else {
      expect(deltaAfter).toBeLessThan(deltaBefore);
    }
  });
});
