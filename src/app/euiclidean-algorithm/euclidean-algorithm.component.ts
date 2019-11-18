import {Component} from '@angular/core';
import {ExerciseComponent} from '../services/exercise-component';
import {
  EuclideanAlgorithmExercise,
  EuclideanAlgorithmExerciseGenerator,
  EuclideanAlgorithmExplanationStep
} from './services/euclidean-algorithm-exercise-generator';

@Component({
  templateUrl: './euclidean-algorithm.component.html',
  styleUrls: ['./euclidean-algorithm.component.css']
})
export class EuclideanAlgorithmComponent extends ExerciseComponent<EuclideanAlgorithmExercise, EuclideanAlgorithmExplanationStep> {
  constructor() {
    super(new EuclideanAlgorithmExerciseGenerator());
  }
}
