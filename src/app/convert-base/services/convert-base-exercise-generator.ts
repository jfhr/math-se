import {convert} from '../../services/base-converter';

export class ConvertBaseExerciseGenerator {
  public cheatCode = 'idk';

  constructor(private options: ConvertBaseExerciseGeneratorOptions) {
  }

  public getExercise(): Exercise {
    const sourceBase = this.getRandomBase();
    const expectedBase = this.getRandomBase(sourceBase);
    const n = Math.floor(Math.random() * this.options.maxValue);
    const source = convert(n).toBase(sourceBase);
    return {source, sourceBase, expectedBase, value: n};
  }

  public checkResult(exercise: Exercise, answer: string): boolean {
    if (answer === this.cheatCode) {
      return true;
    }
    const n = convert(answer).fromBase(exercise.expectedBase).toNumber();
    return n === exercise.value;
  }

  private getRandomBase(exclude?: number): number {
    const index = Math.floor(Math.random() * this.options.bases.length);
    const base = this.options.bases[index];
    if (exclude === base) {
      return this.getRandomBase(exclude);
    } else {
      return base;
    }
  }
}

export interface ConvertBaseExerciseGeneratorOptions {
  bases: number[];
  maxValue: number;
}

export interface Exercise {
  source: string;
  sourceBase: number;
  expectedBase: number;
  value: number;
}
