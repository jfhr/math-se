import {SystemOfCongruencesGenerator} from './system-of-congruences-generator';

describe('System of congruences generator', () => {

  let target: SystemOfCongruencesGenerator;

  beforeEach(() => {
    target = new SystemOfCongruencesGenerator();
  });

  it('should return a correct result', () => {
    const {exercise} = target.generateExercise();
    const {x, m} = exercise.result;

    for (const c of exercise.congruences) {
      expect(x % m).toEqual(c.x);
    }
  });

});
