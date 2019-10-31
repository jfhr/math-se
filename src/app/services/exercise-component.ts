/**
 * Generic code that is shared between exercise components.
 */

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

export interface Generator<TExercise, TExplanationStep> {
  generateExercise(): { exercise: TExercise, explanation: Explanation<TExplanationStep> };

  getResult(exercise: TExercise, answer: string): Result;
}

/**
 * Abstract superclass for components that represent an exercise type.
 */
export abstract class ExerciseComponent<TExercise, TExplanationStep> {
  public showExercise = false;
  public exercise: TExercise;
  public showResult = false;
  public result: Result;
  public showExplanation = false;
  public explanation: Explanation<TExplanationStep>;
  public explanationStep: TExplanationStep;
  public previousExplanationStepDisabled = true;
  public nextExplanationStepDisabled = true;
  private generator: Generator<TExercise, TExplanationStep>;
  private explanationStepIndex = 0;

  constructor(generator: Generator<TExercise, TExplanationStep>) {
    this.generator = generator;
    this.newExercise();
  }

  /**
   * Generates a new exercise. Hides the result and explanation
   * until the user submits a new answer.
   */
  public newExercise() {
    const generated = this.generator.generateExercise();
    this.exercise = generated.exercise;
    this.explanation = generated.explanation;
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

      this.explanationStep = this.explanation.steps[0];
      this.previousExplanationStepDisabled = true;
      this.nextExplanationStepDisabled = false;
      this.showResult = true;
      this.showExplanation = true;
    }
    return false;
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
