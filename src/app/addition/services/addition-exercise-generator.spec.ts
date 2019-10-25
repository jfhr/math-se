import {AdditionExerciseGenerator} from './addition-exercise-generator';
import {convert, sum} from '../../convert-base/services/base-converter';

describe('addition-exercise-generator', () => {

  it('should generate a valid exercise', () => {
    const target = new AdditionExerciseGenerator();
    const output = target.generateExercise();

    expect(output).not.toBeUndefined();
    expect(output.exercise).not.toBeUndefined();
    expect(output.explanation).not.toBeUndefined();

    // last step of explanation should contain result
    const resultDigits = output.explanation.steps.splice(-1)[0].result;
    const resultString = resultDigits.map(d => d.value).join('');
    const resultNumber = convert(resultString).fromBase(output.exercise.base).toNumber();
    const firstNumber = convert(output.exercise.firstSummand).fromBase(output.exercise.base).toNumber();
    const secondNumber = convert(output.exercise.secondSummand).fromBase(output.exercise.base).toNumber();

    expect(firstNumber + secondNumber).toEqual(resultNumber);
  });

  it('should generate a valid result', () => {
    const target = new AdditionExerciseGenerator();
    const exercise = target.generateExercise().exercise;
    const answer = sum(exercise.firstSummand, exercise.secondSummand).withBase(exercise.base);
    const result = target.getResult(exercise, answer);

    expect(result).not.toBeUndefined();
    expect(result.correct).toBeTruthy();
  });

});
