import {Digit} from '../../services/exercise-component';
import {randomInt} from '../../services/random-int';
import {convert} from '../../services/base-converter';

export class MultiplicationExerciseGenerator {
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

  private generateExplanationForExercise(exercise: MultiplicationExercise): MultiplicationExplanation {
    const {firstFactor, secondFactor, base} = exercise;
    const steps: MultiplicationExplanationStep[] = [];

    // if the first factor has at least two more set digits than the second,
    // we switch the two to make the calculation simpler.
    const setDigitsDelta = this.getSetDigits(firstFactor) - this.getSetDigits(secondFactor);
    const switchFactors = setDigitsDelta > 1;
    steps.push({
      hint: 'The first factor has a lot more set digits than the second. ' +
        'We switch the two factors to make the calculation easier.'
    });


    return {switchFactors, steps};
  }

  /**
   * Calculates the number of non-zero digits in the number.
   * Works for any not-weird base.
   */
  private getSetDigits(value: string): number {
    let set = 0;
    for (const char of value) {
      if (char !== '0') {
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

export interface MultiplicationExplanationHint {
  message: string;
}

/**
 * A single step in the explanation of an multiplication exercise
 */
export interface MultiplicationExplanationStep {
  /** The lines represent the summands we got from the pen-and-paper calculation. */
  lines: Digit[][];
  hint: MultiplicationExplanationHint;
}
