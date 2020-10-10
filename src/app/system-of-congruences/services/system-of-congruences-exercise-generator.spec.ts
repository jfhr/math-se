import {SystemOfCongruencesGenerator} from './system-of-congruences-generator';

describe('System of congruences generator', () => {

  let target: SystemOfCongruencesGenerator;

  beforeEach(() => {
    target = new SystemOfCongruencesGenerator();
  });

  it('should return a correct result', () => {
    const {exercise} = target.generateExercise();
    const {x} = exercise.result;

    for (const c of exercise.congruences) {
      expect(x % c.m).toEqual(c.x);
    }
  });

});
