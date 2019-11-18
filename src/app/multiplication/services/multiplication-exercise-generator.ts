import {Digit, Generator, Result} from '../../services/exercise-component';
import {randomInt} from '../../services/random-int';
import {convert} from '../../services/base-converter';
import {stringifyNumber} from '../../services/stringify-number';
import {deepCopy} from '../../services/deep-copy';

export class MultiplicationExerciseGenerator extends Generator<MultiplicationExercise, MultiplicationExplanationStep> {
  constructor() {
    super();
  }

  public generateExercise(): MultiplicationExerciseWithExplanation {
    const base = 2;  // TODO inject base
    const firstNumber = randomInt(1, 256);
    const secondNumber = randomInt(1, 256);

    const firstFactor = convert(firstNumber).toBase(base);
    const secondFactor = convert(secondNumber).toBase(base);
    const exercise: MultiplicationExercise = {base, firstFactor, secondFactor};

    const explanation = this.generateExplanationForExercise(exercise);

    return {explanation, exercise};
  }

  public getResult(exercise: MultiplicationExercise, answer: string): Result {
    const firstNumber = convert(exercise.firstFactor).fromBase(exercise.base).toNumber();
    const secondNumber = convert(exercise.firstFactor).fromBase(exercise.base).toNumber();
    const expectedNumber = firstNumber * secondNumber;
    const actualNumber = convert(answer).fromBase(exercise.base).toNumber();
    return {correct: expectedNumber === actualNumber};
  }

  private generateExplanationForExercise(exercise: MultiplicationExercise): MultiplicationExplanation {
    let {firstFactor, secondFactor} = exercise;
    const {base} = exercise;
    const steps: MultiplicationExplanationStep[] = [];

    const resultLength = firstFactor.length + secondFactor.length + 1;
    const step: MultiplicationExplanationStep = {
      hint: '',
      firstFactor: this.toDigitArray(resultLength, firstFactor),
      secondFactor: this.toDigitArray(resultLength, secondFactor),
      lines: []
    };

    // if the first factor has at least two more set digits than the second,
    // we switch the two to make the calculation simpler.
    const setDigitsDelta = this.getSetDigits(firstFactor) - this.getSetDigits(secondFactor);
    const switchFactors = setDigitsDelta > 1;
    if (switchFactors) {
      step.hint = 'The first factor has a lot more set digits than the second. ' +
        'We switch the two factors to make the calculation easier.';
      steps.push(deepCopy(step));
      // swap the factors
      secondFactor = [firstFactor, firstFactor = secondFactor][0];
    }

    step.hint = 'Go through the digits of the second factor from left to right.';
    steps.push(deepCopy(step));

    let idx = 1;
    for (const digit of secondFactor) {
      step.hint = `The ${stringifyNumber(idx)} digit of the second factor is ${digit}.`;
      if (digit === '0') {
        step.hint += 'Continue to the next digit.';
      } else {
        const newLine: Digit[] = [];
        for (let i = 0; i < idx; i++) {
          newLine.push({value: ' ', isVisible: false, cssClass: ''});
        }
        // TODO for base !== 2, we may have to do this multiple times.
        for (const d of step.secondFactor) {
          newLine.push({value: d.value, cssClass: '', isVisible: true});
        }
        step.lines.push(newLine);
      }

      steps.push(deepCopy(step));
      idx++;
    }

    return {switchFactors, steps};
  }

  /**
   * Calculates the number of non-zero digits in the number.
   * Works for any not-weird base.
   */
  private getSetDigits(value: string): number {
    let set = 0;
    for (const digit of value) {
      if (digit !== '0') {
        set++;
      }
    }
    return set;
  }
}

export interface MultiplicationExerciseWithExplanation {
  exercise: MultiplicationExercise;
  explanation: MultiplicationExplanation;
}

/**
 * A multiplication exercise that the user might solve.
 */
export interface MultiplicationExercise {
  /** The base of the summands */
  base: number;
  /** The first factor in the correct base */
  firstFactor: string;
  /** The second factor in the correct base */
  secondFactor: string;
}

/**
 * The explanation of a multiplication exercise.
 */
export interface MultiplicationExplanation {
  /**
   *  Contains the steps in the explanation.
   * The user can navigate between the steps to better understand the process
   */
  steps: MultiplicationExplanationStep[];
  /**
   * If true, the first step is to switch the factors around to simplify the calculation.
   */
  switchFactors: boolean;
}

/**
 * A single step in the explanation of an multiplication exercise
 */
export interface MultiplicationExplanationStep {
  firstFactor: Digit[];
  secondFactor: Digit[];
  /** The lines represent the summands we got from the pen-and-paper calculation. */
  lines?: Digit[][];
  /** Hint for the user */
  hint: string;
}

