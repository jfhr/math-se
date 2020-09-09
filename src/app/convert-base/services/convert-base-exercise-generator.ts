import {Answer, Explanation, Generator, Result} from '../../services/exercise-component';
import {randomInt} from '../../services/random-int';
import {convert} from '../../services/base-converter';

export class ConvertBaseExerciseGenerator extends Generator<Exercise, ExplanationStep> {

  constructor(private bases: number[], private maxValue: number) {
    super();
  }

  generateExercise(): { exercise: Exercise; explanation: Explanation<ExplanationStep> } {
    const num = randomInt(0, this.maxValue);
    const exValues = [];
    // The 1 base for which the value is given. The user must fill in all other bases.
    const hintBase = this.bases[randomInt(0, this.bases.length)];

    for (const base of this.bases) {
      if (base === hintBase) {
        exValues.push({base, value: convert(num).toBase(base)});
      } else {
        exValues.push({base});
      }
    }

    const exercise = new Exercise();
    exercise.values = exValues;

    return {exercise, explanation: {steps: []}};
  }

  getResult(exercise: Exercise, answer: string | Answer): Result {
    return undefined;
  }
}

export class Exercise {
  /**
   * Contains the available bases with values.
   * If value is undefined, that base should be filled in by the user.
   */
  values: { base: number, value?: string }[];
}

export class ExplanationStep {
  // nothing in here, since there is no explanation
  // for this type of exercise.
}
