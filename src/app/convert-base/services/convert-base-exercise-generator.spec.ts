import {ConvertBaseExerciseGenerator} from './convert-base-exercise-generator';

describe('convert-base-exercise-generator', () => {

  it('should create a correct exercise', () => {
    const target = new ConvertBaseExerciseGenerator({
      bases: [2, 4, 8], maxValue: 24
    });

    // exercises are generated randomly.
    // we run the test four times for higher confidence
    for (let i = 0; i < 4; i++) {
      const exercise = target.getExercise();

      expect(exercise).not.toBeUndefined();
      expect(exercise).not.toBeNull();
      expect([2, 4, 8]).toContain(exercise.sourceBase);
      expect([2, 4, 8]).toContain(exercise.expectedBase);
      expect(exercise.sourceBase).not.toEqual(exercise.expectedBase);
    }
  });

});
