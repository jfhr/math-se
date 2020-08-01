import {gcd} from '../../services/gcd';
import {RingIterator} from '../../services/ring-iterator';
import {deepCopy} from '../../services/deep-copy';
import {getFromEnd} from '../../services/array-get-from-end';
import {
  EuclideanAlgorithmExerciseGenerator,
  EuclideanExercise,
  EuclideanExplanation,
  EuclideanExplanationStep
} from './euclidean-algorithm-exercise-generator';
import {emptyDigit} from '../../services/exercise-component';

/**
 * Generator for simple euclidean algorithm exercises,
 * where the goal is to find the gcd of two numbers.
 */
export class SimpleEuclideanGenerator extends EuclideanAlgorithmExerciseGenerator {
  public getResult(exercise, answer) {
    const correct = parseInt(answer, 10) === gcd(exercise.firstNumber, exercise.secondNumber);
    return {correct};
  }

  public generateExplanationForExercise(exercise: EuclideanExercise) {
    const {firstNumber, secondNumber} = exercise;
    const explanation: EuclideanExplanation = {
      steps: []
    };

    // create the first step. the following steps will be based on this
    const step: EuclideanExplanationStep = {
      rows: [],
      hint: {message: ''}
    };

    const calculationSteps = this.getCalculationSteps(firstNumber, secondNumber, 'simple');

    // the ring iterator will help us give the same color to each number over multiple rows
    const cssRing = new RingIterator(['text-info', 'text-warning', 'text-success', 'text-danger']);

    for (const calculation of calculationSteps) {
      const cssClasses = cssRing.next().value;
      step.rows.push({
        a: this.numberToDigit(calculation.a, cssClasses[0]),
        b: this.numberToDigit(calculation.b, cssClasses[1]),
        q: this.numberToDigit(calculation.q),
        r: this.numberToDigit(calculation.r, cssClasses[2]),
        x: emptyDigit,
        y: emptyDigit,
      });
      step.hint.message = `Calculate ${calculation.a} / ${calculation.b} using euclidean division.`;
      explanation.steps.push(deepCopy(step));
    }

    // add the finishing step
    const row = getFromEnd(step.rows);
    if (row !== undefined) {
      row.b.cssClass += ' text-bold';
      row.r.cssClass = '';
    }
    step.hint.message = `The gcd is the result of the last calculation, with rest 0.`;
    explanation.steps.push(deepCopy(step));

    return explanation;
  }
}
