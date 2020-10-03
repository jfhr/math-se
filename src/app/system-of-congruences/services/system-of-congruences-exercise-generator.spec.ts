import {SystemOfCongruencesExerciseGenerator} from './system-of-congruences-exercise-generator';

describe('System of congruences generator', () => {

  let target: SystemOfCongruencesExerciseGenerator;

  beforeEach(() => {
    target = new SystemOfCongruencesExerciseGenerator();
  });

  it('should return a correct result', () => {
    const {exercise} = target.generateExercise();
    const {x, m} = exercise.result;

    for (const c of exercise.congruences) {
      expect(x % m).toEqual(c.x);
    }
  });

});
