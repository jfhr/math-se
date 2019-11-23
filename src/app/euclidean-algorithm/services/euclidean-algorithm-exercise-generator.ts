import {Digit, Generator} from '../../services/exercise-component';
import {getFromEnd} from '../../services/array-get-from-end';
import {randomInt} from '../../services/random-int';

/**
 * Generator for euclidean algorithm exercises. In this type of exercise,
 * the user must find the greatest common divisor (gcd) of two numbers by hand
 * using the euclidean algorithm. See https://en.wikipedia.org/wiki/Euclidean_algorithm
 */
export abstract class EuclideanAlgorithmExerciseGenerator extends Generator<EuclideanExercise, EuclideanExplanationStep> {

  public generateExercise() {
    const firstNumber = randomInt(256, 4096);
    const secondNumber = randomInt(256, 4096);
    // don't proceed if they happen to be the same number
    if (firstNumber === secondNumber) {
      return this.generateExercise();
    }

    const exercise: EuclideanExercise = {
      firstNumber, secondNumber
    };

    const explanation = this.generateExplanationForExercise(exercise);
    return {explanation, exercise};
  }

  public getCalculationSteps(firstNumber: number, secondNumber: number, type: 'simple' | 'complex'): InternalCalculationStep[] {
    const steps: InternalCalculationStep[] = [];
    let a = firstNumber;
    let b = secondNumber;
    let q;
    let r;
    let x;
    let y;

    // create initial values for x and y
    if (type === 'complex') {
      steps.push({x: 1, y: 0});
      steps.push({x: 0, y: 1});
    }

    // do the calculation as long as there is a rest
    do {
      // calculate the new values
      q = Math.floor(a / b);
      r = a % b;
      // if r === 0, no new x, y values are calculated
      if (type === 'complex' && r !== 0) {
        x = getFromEnd(steps, 1).x - q * getFromEnd(steps).x;
        y = getFromEnd(steps, 1).y - q * getFromEnd(steps).y;
      } else {
        x = undefined;
        y = undefined;
      }

      steps.push({a, b, q, r, x, y});

      // rotate the values for the next iteration.
      a = b;
      b = r;
    } while (r !== 0);

    return steps;
  }

  protected numberToDigit(n: number, cssClass: string = ''): Digit {
    if (n === undefined) {
      return {cssClass, isVisible: false, value: ''};
    } else {
      return {cssClass, isVisible: true, value: n.toString()};
    }
  }

  public abstract generateExplanationForExercise(exercise: EuclideanExercise);
}

/**
 * An euclidean algorithm exercise, can be used for both
 * the simple and extended variant of the algorithm.
 */
export interface EuclideanExercise {
  firstNumber: number;
  secondNumber: number;
}

/**
 * A calculation step, which contains only numbers, without any styling.
 */
interface InternalCalculationStep {
  a?: number;
  b?: number;
  q?: number;
  r?: number;
  x?: number;
  y?: number;
}

export interface EuclideanExplanation {
  steps: EuclideanExplanationStep[];
}

/**
 * An explanation step, which contains styling and explanations.
 */
export interface EuclideanExplanationStep {
  rows: {
    a: Digit;
    b: Digit;
    q: Digit;
    r: Digit;
    x: Digit;
    y: Digit;
  }[];

  /** A hint displayed for the current step */
  hint: { message: string };
}
