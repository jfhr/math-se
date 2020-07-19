import {Component} from '@angular/core';
import {ExerciseComponent} from '../services/exercise-component';
import {
  EuclideanExercise,
  EuclideanExplanationStep
} from './services/euclidean-algorithm-exercise-generator';
import {ExtendedEuclideanGenerator} from './services/extended-euclidean-generator';

@Component({
  templateUrl: './extended-euclidean-algorithm.component.html',
  styleUrls: ['./extended-euclidean-algorithm.component.css']
})
export class ExtendedEuclideanAlgorithmComponent extends ExerciseComponent<EuclideanExercise, EuclideanExplanationStep> {
  public answerGcd: string;
  public answerX: string;
  public answerY: string;

  constructor(generator: ExtendedEuclideanGenerator) {
    super(generator);
  }

  public submitAnswer(): boolean {
    if (this.showExercise && this.exercise !== undefined) {
      const answer = {
        gcd: this.answerGcd, x: this.answerX, y: this.answerY
      };
      this.result = this.generator.getResult(this.exercise, answer);
      this.resetExplanationStep();
      this.showResult = true;
      this.showExplanation = true;
    }
    return false;
  }
}
