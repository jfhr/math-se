import {
  EuclideanAlgorithmExerciseGenerator,
  EuclideanExercise,
  EuclideanExplanation,
  EuclideanExplanationStep
} from './euclidean-algorithm-exercise-generator';
import {Answer, emptyDigit, Result} from '../../services/exercise-component';
import {RingIterator} from '../../services/ring-iterator';
import {deepCopy} from '../../services/deep-copy';
import {getFromEnd} from '../../services/array-get-from-end';
import {gcd} from '../../services/gcd';

interface ExtendedEuclideanAnswer extends Answer {
  gcd: string;
  x: string;
  y: string;
}

export class ExtendedEuclideanGenerator extends EuclideanAlgorithmExerciseGenerator {
  generateExplanationForExercise(exercise: EuclideanExercise) {
    const {firstNumber, secondNumber} = exercise;
    const explanation: EuclideanExplanation = {
      steps: []
    };

    // create the first step. the following steps will be based on this
    const step: EuclideanExplanationStep = {
      rows: [],
      hint: {message: 'First, write down the initial values for x and y.'}
    };

    const calculationSteps = this.getCalculationSteps(firstNumber, secondNumber, 'extended');

    // the ring iterator will help us give the same color to each number over multiple rows
    const cssRing = new RingIterator(['text-info', 'text-warning', 'text-success', 'text-danger']);

    for (const calculation of calculationSteps) {
      const cssClasses = cssRing.next().value;
      step.rows.push({
        a: this.numberToDigit(calculation.a, cssClasses[0]),
        b: this.numberToDigit(calculation.b, cssClasses[1]),
        q: this.numberToDigit(calculation.q),
        r: this.numberToDigit(calculation.r, cssClasses[2]),
        x: this.numberToDigit(calculation.x),
        y: this.numberToDigit(calculation.y),
      });
      step.hint.message = `Calculate ${calculation.a} / ${calculation.b} using euclidean division.
      Update the x and y values.`;
      explanation.steps.push(deepCopy(step));
    }

    // add the finishing step
    const row = getFromEnd(step.rows);
    if (row !== undefined) {
      row.b.cssClass += ' text-bold';
      row.r.cssClass = '';
    }
    step.hint.message = `The gcd is the result of the last calculation, with rest 0.
    The x and y values can be used to solve the equation.`;
    explanation.steps.push(deepCopy(step));

    return explanation;
  }

  getResult(exercise: EuclideanExercise, answer: ExtendedEuclideanAnswer): Result {
    const {firstNumber, secondNumber} = exercise;
    const actualGcd = gcd(firstNumber, secondNumber);
    const correct = (actualGcd === parseInt(answer.gcd, 10))
      && (actualGcd === firstNumber * parseInt(answer.x, 10) + secondNumber * parseInt(answer.y, 10));
    return {correct};
  }
}
