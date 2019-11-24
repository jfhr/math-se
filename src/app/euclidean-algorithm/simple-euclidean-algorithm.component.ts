import {Component} from '@angular/core';
import {ExerciseComponent} from '../services/exercise-component';
import {
  EuclideanExercise,
  EuclideanExplanationStep
} from './services/euclidean-algorithm-exercise-generator';
import {SimpleEuclideanGenerator} from './services/simple-euclidean-generator';

@Component({
  templateUrl: './simple-euclidean-algorithm.component.html',
  styleUrls: ['./simple-euclidean-algorithm.component.css']
})
export class SimpleEuclideanAlgorithmComponent extends ExerciseComponent<EuclideanExercise, EuclideanExplanationStep> {
  constructor(generator: SimpleEuclideanGenerator) {
    super(generator);
  }
}
