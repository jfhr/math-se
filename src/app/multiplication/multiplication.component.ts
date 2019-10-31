import {Component} from '@angular/core';
import {ExerciseComponent} from '../services/exercise-component';

@Component({
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.css']
})
export class MultiplicationComponent extends ExerciseComponent<MultiplicationExercise, MultiplicationExplanationStep> {
}

