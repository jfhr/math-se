/**
 * Generic code that is shared between exercise components.
 */

import {GlobalKeyboardShortcut} from './global-keyboard-shortcut';
import { OnDestroy, OnInit, Directive } from '@angular/core';

/**
 * The result of an exercise with a user-submitted answer.
 */
export interface Result {
  /** Indicates whether the users answer was correct */
  correct: boolean;
}

/**
 * The step-by-step explanation of an exercise.
 */
export interface Explanation<TExplanationStep> {
  steps: TExplanationStep[];
}

export abstract class Generator<TExercise, TExplanationStep> {
  abstract generateExercise(): { exercise: TExercise, explanation: Explanation<TExplanationStep> };

  abstract getResult(exercise: TExercise, answer: string | Answer): Result;

  protected toDigitArray(length: number, value: string, cssClass: string = '', isVisible: boolean = false): Digit[] {
    const digits: Digit[] = [];
    for (let fill = length - value.length; fill > 0; fill--) {
      digits.push({value: '', cssClass, isVisible});
    }
    for (const c of value) {
      digits.push({value: c, cssClass, isVisible});
    }
    return digits;
  }

  protected ensureDigit(digit: string) {
    if (digit.length === 1) {
      return digit;
    } else {
      return '0';
    }
  }
}

/**
 * This interface exists to be extended by interfaces
 * representing structured user answers.
 */
// tslint:disable-next-line:no-empty-interface
export interface Answer {
}

/**
 * Abstract superclass for components that represent an exercise type.
 */
@Directive()
export abstract class ExerciseComponent<TExercise, TExplanationStep> implements OnInit, OnDestroy {
  public showExercise = false;
  public exercise: TExercise;
  public showResult = false;
  public result: Result;
  public showExplanation = false;
  public explanation: Explanation<TExplanationStep>;
  public explanationStep: TExplanationStep;
  public previousExplanationStepDisabled = true;
  public nextExplanationStepDisabled = true;
  protected generator: Generator<TExercise, TExplanationStep>;
  protected explanationStepIndex = 0;

  protected shortcut: GlobalKeyboardShortcut;

  constructor(generator: Generator<TExercise, TExplanationStep>) {
    this.generator = generator;
    this.newExercise();
  }

  ngOnInit(): void {
    this.shortcut = new GlobalKeyboardShortcut(ev => {
      switch (ev.code) {
        case 'ArrowLeft':
          this.previousExplanationStep();
          break;
        case 'ArrowRight':
          this.nextExplanationStep();
          break;
      }
    });
    this.shortcut.startListener();
  }

  ngOnDestroy(): void {
    if (this.shortcut !== undefined) {
      this.shortcut.stopListener();
    }
  }

  /**
   * Generates a new exercise. Hides the result and explanation
   * until the user submits a new answer.
   */
  public newExercise() {
    const generated = this.generator.generateExercise();
    this.exercise = generated.exercise;
    this.explanation = generated.explanation;
    this.resetExplanationStep();
    this.showExercise = true;
    this.showExplanation = false;
    this.showResult = false;
  }

  /**
   * Formats a number by inserting a space after a given number of characters
   * (default 4), counting from the end of the string.
   */
  public formatNumber(n: string, nSpace: number = 4): string {
    let result = '';
    for (let i = n.length - 1; i >= 0; i--) {
      result = n[i] + result;
      if (i % nSpace === n.length % nSpace) {
        result = ' ' + result;
      }
    }
    return result;
  }

  /**
   * Reads the answer from an <input> field and shows the result and explanation.
   */
  public submitAnswer(answerField): boolean {
    if (this.showExercise && this.exercise !== undefined) {
      this.result = this.generator.getResult(this.exercise, answerField.value);

      this.resetExplanationStep();
      this.showResult = true;
      this.showExplanation = true;
    }
    return false;
  }

  /**
   * Reads the answer from an object and shows the result and explanation.
   */
  public submitAnswerObject(answer): boolean {
    if (this.showExercise && this.exercise !== undefined) {
      this.result = this.generator.getResult(this.exercise, answer);

      this.resetExplanationStep();
      this.showResult = true;
      this.showExplanation = true;
    }
    return false;
  }

  protected resetExplanationStep() {
    this.explanationStepIndex = 0;
    this.explanationStep = this.explanation.steps[0];
    this.previousExplanationStepDisabled = true;
    this.nextExplanationStepDisabled = false;
  }

  public previousExplanationStep() {
    if (this.previousExplanationStepDisabled) {
      return;
    } else {
      this.explanationStepIndex--;
      this.explanationStep = this.explanation.steps[this.explanationStepIndex];
      if (this.explanationStepIndex === 0) {
        this.previousExplanationStepDisabled = true;
      }
      this.nextExplanationStepDisabled = false;
    }
  }

  public nextExplanationStep() {
    if (this.nextExplanationStepDisabled) {
      return;
    } else {
      this.explanationStepIndex++;
      this.explanationStep = this.explanation.steps[this.explanationStepIndex];
      if (this.explanationStepIndex + 1 === this.explanation.steps.length) {
        this.nextExplanationStepDisabled = true;
      }
      this.previousExplanationStepDisabled = false;
    }
  }
}


/**
 * A single digit used in various exercise types,
 * with optional highlighting.
 */
export interface Digit {
  /** The value of the digit as a single character */
  value: string;
  /** Indicates whether the digit should be visible */
  isVisible: boolean;
  /** If set, indicates the css-class of the digit for highlighting */
  cssClass: string;
}

/**
 * An empty, not visible digit.
 */
export const emptyDigit: Digit = {
  value: '',
  isVisible: false,
  cssClass: '',
};
