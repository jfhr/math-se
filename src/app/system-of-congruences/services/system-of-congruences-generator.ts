import {Answer, Digit, Generator, Result} from '../../services/exercise-component';
import {randomInt} from '../../services/random-int';
import {gcd} from '../../services/gcd';
import {mulInverse} from '../../services/mul-inverse';

export class SystemOfCongruencesGenerator extends Generator<SystemOfCongruencesExercise, SystemOfCongruencesExplanationStep> {

  public generateExercise(): { exercise: SystemOfCongruencesExercise, explanation: SystemOfCongruencesExplanation } {
    const congruences: Congruence[] = [];
    while (congruences.length < 3) {
      this.tryAddCongruence(congruences);
    }

    const m = congruences.reduce((p, c) => p * c.m, 1);
    const M = congruences.map(c => m / c.m);
    const N = congruences.map((c, i) => mulInverse(M[i], c.m));
    const s = congruences.map((c, i) => c.x * M[i] * N[i]).reduce((p, c) => p + c, 0);
    const x = s % m;

    const und = {m: undefined, M: undefined, N: undefined, s: undefined, x: undefined};

    const explanationSteps: SystemOfCongruencesExplanationStep[] = [
      {...und, step: 0, hint: [{message: 'Check to make sure all modulo values are pairwise prime'}]},
      {
        ...und, m, step: 1, hint: [
          {message: 'The value of '},
          {d: {isVisible: true, cssClass: 'text-success', value: 'm'}},
          {message: ' is the product of all modulo values'},
        ]
      },
      {
        ...und, m, M, step: 2, hint: [
          {message: 'For each term, the value of '},
          {d: {isVisible: true, cssClass: 'text-warning', value: 'M'}},
          {message: ' is '},
          {d: {isVisible: true, cssClass: 'text-success', value: 'm'}},
          {message: ' divided by that terms modulo value'},
        ]
      },
      {
        ...und, m, M, N, step: 3, hint: [
          {message: 'For each term, '},
          {d: {isVisible: true, cssClass: 'text-info', value: 'N'}},
          {message: ' is the multiplicative inverse of '},
          {d: {isVisible: true, cssClass: 'text-warning', value: 'M'}},
          {message: ' modulo that terms modulo value'},
        ]
      },
      {
        ...und, m, M, N, s, step: 4, hint: [
          {message: 'For each term, multiply x, '},
          {d: {isVisible: true, cssClass: 'text-warning', value: 'M'}},
          {message: ' and '},
          {d: {isVisible: true, cssClass: 'text-info', value: 'N'}},
          {message: ', and add those values together to get '},
          {d: {isVisible: true, cssClass: 'text-danger', value: 's'}},
        ]
      },
      {
        m, M, N, s, x, step: 5, hint: [
          {message: 'The possible values of x are given by '},
          {d: {isVisible: true, cssClass: 'text-danger', value: 's'}},
          {message: ' modulo '},
          {d: {isVisible: true, cssClass: 'text-success', value: 'm'}},
        ]
      },
    ];

    return {
      exercise: {congruences, result: {x, m}},
      explanation: {steps: explanationSteps}
    };
  }

  private tryAddCongruence(congruences: { x: number, m: number }[]) {
    let m;
    do {
      m = randomInt(2, 13);
    } while (!this.arePairwisePrime(m, ...congruences.map(c => c.m)));

    const x = randomInt(0, m);
    congruences.push({x, m});
  }

  private arePairwisePrime(...numbers: number[]): boolean {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (gcd(numbers[i], numbers[j]) !== 1) {
          return false;
        }
      }
    }
    return true;
  }

  getResult(exercise: SystemOfCongruencesExercise, answer: SystemOfCongruencesAnswer): Result {
    const x = parseInt(answer.x, 10);
    const m = parseInt(answer.m, 10);
    return {correct: m === exercise.result.m && x === exercise.result.x};
  }
}

interface Congruence {
  x: number;
  m: number;
}

/**
 * A system of congruences exercise.
 */
export interface SystemOfCongruencesExercise {
  congruences: Congruence[];
  result: {
    m: number;
    x: number;
  };
}

export interface SystemOfCongruencesExplanation {
  steps: SystemOfCongruencesExplanationStep[];
}

export interface SystemOfCongruencesExplanationStep {
  m: number;
  M: number[];
  N: number[];
  s: number;

  x: number;

  /**
   * 0 - check if all modules are pairwise prime
   * 1 - calculate m
   * 2 - calculate M_i
   * 3 - calculate N_i
   * 4 - calculate s
   * 5 - calculate x, m
   */
  step: number;

  /** A hint displayed for the current step */
  hint: SystemOfCongruencesExplanationStepHintPart[];
}

export interface SystemOfCongruencesExplanationStepHintPart {
  message?: string;
  d?: Digit;
}

export interface SystemOfCongruencesAnswer extends Answer {
  x: string;
  m: string;
}
