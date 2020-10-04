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

  public answer = {gcd: '', x: '', y: ''};

  constructor(generator: ExtendedEuclideanGenerator) {
    super(generator);
  }
}
