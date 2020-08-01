import {convert, sum} from '../../services/base-converter';
import {randomInt} from '../../services/random-int';
import {deepCopy} from '../../services/deep-copy';
import {Digit, Generator, Result} from '../../services/exercise-component';
import { Injectable } from "@angular/core";

@Injectable()
export class AdditionExerciseGenerator extends Generator<AdditionExercise, AdditionExplanationStep> {
  public generateExercise(): AdditionExerciseWithExplanation {
    const base = 2;  // TODO inject allowed bases
    const firstNumber = randomInt(1, 256);
    const secondNumber = randomInt(1, 256);

    const firstSummand = convert(firstNumber).toBase(base);
    const secondSummand = convert(secondNumber).toBase(base);
    const exercise: AdditionExercise = {
      base, firstSummand, secondSummand
    };

    const explanation = this.generateExplanationForExercise(exercise);

    return {explanation, exercise};
  }

  public generateExplanationForExercise(exercise: AdditionExercise) {
    const {firstSummand, secondSummand, base} = exercise;
    const resultLength = Math.max(firstSummand.length, secondSummand.length) + 2;
    const explanation: AdditionExplanation = {
      steps: []
    };
    const step: AdditionExplanationStep = {
      firstSummand: this.toDigitArray(resultLength, firstSummand),
      secondSummand: this.toDigitArray(resultLength, secondSummand),
      carry: this.toDigitArray(resultLength, ''),
      result: this.toDigitArray(resultLength, ''),
      hint: {done: false, calc: '', carry: ''},
    };

    explanation.steps.push(deepCopy(step));

    for (let index = resultLength - 1; index > 0; index--) {
      const firstDigit = step.firstSummand[index];
      const secondDigit = step.secondSummand[index];
      const carryDigit = step.carry[index];
      // skip the last step if there's nothing left and no carry.
      if (index === 1 && carryDigit.value === '') {
        continue;
      }
      const result = sum(firstDigit.value, secondDigit.value, carryDigit.value).withBase(base);
      firstDigit.cssClass = 'text-warning';
      secondDigit.cssClass = 'text-warning';
      carryDigit.cssClass = 'text-warning';

      if (result.length === 1) {
        step.result[index] = {value: result, isVisible: true, cssClass: 'text-success'};
      } else if (result.length === 2) {
        step.result[index] = {value: result[1], isVisible: true, cssClass: 'text-success'};
        step.carry[index - 1] = {value: result[0], isVisible: true, cssClass: 'text-danger'};
      } else {
        throw new Error(`Unexpected: ${firstDigit.value} + ${secondDigit.value} + ${carryDigit.value}` +
          `gave ${result} with length not equal to 1 or 2`);
      }

      step.hint = this.getHint(firstDigit.value, secondDigit.value, carryDigit.value, result);
      explanation.steps.push(deepCopy(step));

      // reset css classes so digits don't remain highlighted forever
      firstDigit.cssClass = '';
      secondDigit.cssClass = '';
      carryDigit.cssClass = '';
      step.result[index].cssClass = '';
      if (index > 0) {
        step.carry[index - 1].cssClass = '';
      }
    }

    // Add 'done' message to the last step.
    explanation.steps[explanation.steps.length - 1].hint.done = true;

    return explanation;
  }

  public getResult(exercise: AdditionExercise, answer: string): Result {
    const firstNumber = convert(exercise.firstSummand).fromBase(exercise.base).toNumber();
    const secondNumber = convert(exercise.secondSummand).fromBase(exercise.base).toNumber();
    const expectedNumber = firstNumber + secondNumber;
    const actualNumber = convert(answer).fromBase(exercise.base).toNumber();
    return {correct: expectedNumber === actualNumber};
  }

  private getHint(firstDigit: string, secondDigit: string, carry: string, result: string): AdditionExplanationHint {
    firstDigit = this.ensureDigit(firstDigit);
    secondDigit = this.ensureDigit(secondDigit);
    const hint: AdditionExplanationHint = {
      calc: `${firstDigit} + ${secondDigit} `,
      carry: '',
      done: false,
    };
    if (carry.length === 1) {
      hint.calc += `+ ${carry} `;
    }
    hint.calc += `= ${result} `;
    if (result.length === 2) {
      hint.carry = `carry the ${result[0]}`;
    }
    return hint;
  }
}

/**
 * Container for an exercise with explanation
 */
export interface AdditionExerciseWithExplanation {
  /** The exercise */
  exercise: AdditionExercise;
  /** The explanation */
  explanation: AdditionExplanation;
}

/**
 * An addition exercise that the user might solve
 */
export interface AdditionExercise {
  /** The base of the summands */
  base: number;
  /** The first summand in the correct base */
  firstSummand: string;
  /** The second summand in the correct base */
  secondSummand: string;
}

/**
 * The explanation of an addition exercise.
 */
export interface AdditionExplanation {
  /**
   *  Contains the steps in the explanation.
   * The user can navigate between the steps to better understand the process
   */
  steps: AdditionExplanationStep[];
}

/**
 * A single step in the explanation of an addition exercise
 */
export interface AdditionExplanationStep {
  /** The first summand */
  firstSummand: Digit[];
  /** The second summand */
  secondSummand: Digit[];
  /** The carried digits (so far) */
  carry: Digit[];
  /** The result (so far) */
  result: Digit[];
  /** A hint displayed for the current step */
  hint: AdditionExplanationHint;
}

/**
 * Provides hints for what happened in a single explanation step
 */
export interface AdditionExplanationHint {
  /** The digit-wise calculation performed in this step */
  calc: string;
  /** Optionally a message about what digit should be carried */
  carry: string;
  /** Indicates if the addition is done after this step */
  done: boolean;
}
