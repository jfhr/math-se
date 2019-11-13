import {Digit, Generator, Result} from '../../services/exercise-component';
import {randomInt} from '../../services/random-int';
import {deepCopy} from '../../services/deep-copy';
import {gcd} from '../../services/gcd';

/**
 * Generator for euclidean algorithm exercises. In this type of exercise,
 * the user must find the greatest common divisor (gcd) of two numbers by hand
 * using the euclidean algorithm. See https://en.wikipedia.org/wiki/Euclidean_algorithm
 */
export class EuclideanAlgorithmExerciseGenerator extends Generator<EuclideanAlgorithmExercise, EuclideanAlgorithmExplanationStep> {
  public generateExercise(): EuclideanAlgorithmExerciseWithExplanation {
    const firstNumber = randomInt(256, 4096);
    const secondNumber = randomInt(256, 4096);
    // don't proceed if they happen to be the same number
    if (firstNumber === secondNumber) {
      return this.generateExercise();
    }

    const exercise: EuclideanAlgorithmExercise = {
      firstNumber, secondNumber
    };

    const explanation = this.generateExplanationForExercise(exercise);
    return {explanation, exercise};
  }

  public generateExplanationForExercise(exercise: EuclideanAlgorithmExercise) {
    let {firstNumber, secondNumber} = exercise;
    // ensure firstNumber >= secondNumber
    if (firstNumber < secondNumber) {
      firstNumber = [secondNumber, secondNumber = firstNumber][0];
    }

    const explanation: EuclideanAlgorithmExplanation = {
      steps: []
    };

    const step: EuclideanAlgorithmExplanationStep = {
      rows: [],
      hint: {
        message: 'Begin by placing the greater number to the left ' +
          'and the smaller number to the right of the equal sign.'
      }
    };

    let dividend = firstNumber;
    let divisor = secondNumber;
    let result;
    let rest;

    function resetRowHighlighting() {
      if (step.rows.length > 0) {
        step.rows[step.rows.length - 1].dividend.cssClass = '';
        step.rows[step.rows.length - 1].divisor.cssClass = '';
        step.rows[step.rows.length - 1].result.cssClass = '';
        step.rows[step.rows.length - 1].rest.cssClass = '';
      }
    }

    do {
      // save the current step
      explanation.steps.push(deepCopy(step));

      // calculate result & rest
      result = Math.floor(dividend / divisor);
      rest = dividend % divisor;

      // reset highlighting from the last step
      resetRowHighlighting();

      // add the new results to the step
      step.rows.push({
        dividend: this.numberToDigit(dividend, 'text-info'),
        divisor: this.numberToDigit(divisor, 'text-info'),
        result: this.numberToDigit(result, 'text-warning'),
        rest: this.numberToDigit(rest, 'text-warning'),
      });

      // set the hint message
      step.hint.message = `Calculate ${dividend} / ${divisor} using division with rest.`;

      // go to the next dividend & divisor
      dividend = divisor;
      divisor = rest;
    } while (rest !== 0);

    // save the last step
    explanation.steps.push(deepCopy(step));

    // add the finishing step
    resetRowHighlighting();
    step.rows[step.rows.length - 1].divisor.cssClass = 'text-success';
    step.hint.message = `The gcd is the result of the last calculation, with rest 0.`;
    explanation.steps.push(deepCopy(step));

    return explanation;
  }

  private numberToDigit(n: number, cssClass: string = ''): Digit {
    if (n === undefined) {
      return {cssClass, isVisible: false, value: ''};
    } else {
      return {cssClass, isVisible: true, value: n.toString()};
    }
  }

  getResult(exercise: EuclideanAlgorithmExercise, answer: string): Result {
    const correct = parseInt(answer) === gcd(exercise.firstNumber, exercise.secondNumber);
    return {correct};
  }
}


/**
 * Container for a euclidean algorithm exercise with explanation.
 */
export interface EuclideanAlgorithmExerciseWithExplanation {
  /** The exercise */
  exercise: EuclideanAlgorithmExercise;
  /** The explanation */
  explanation: EuclideanAlgorithmExplanation;
}

/**
 * An EuclideanAlgorithm exercise that the user might solve
 */
export interface EuclideanAlgorithmExercise {
  /** The first number to find the gcd of */
  firstNumber: number;
  /** The second number to find the gcd */
  secondNumber: number;
}

/**
 * The explanation of an EuclideanAlgorithm exercise.
 */
export interface EuclideanAlgorithmExplanation {
  /**
   *  Contains the steps in the explanation.
   * The user can navigate between the steps to better understand the process
   */
  steps: EuclideanAlgorithmExplanationStep[];
}

/**
 * A single step in the explanation of an EuclideanAlgorithm exercise
 */
export interface EuclideanAlgorithmExplanationStep {
  rows: {
    dividend: Digit;
    divisor: Digit;
    result: Digit;
    rest: Digit;
  }[];

  /** A hint displayed for the current step */
  hint: EuclideanAlgorithmExplanationHint;
}

/**
 * Provides hints for what happened in a single explanation step
 */
export interface EuclideanAlgorithmExplanationHint {
  /** The calculation performed in this step */
  message: string;
}
