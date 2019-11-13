import {Component} from '@angular/core';
import {AdditionExercise, AdditionExerciseGenerator, AdditionExplanationStep} from './services/addition-exercise-generator';
import {ExerciseComponent} from '../services/exercise-component';

@Component({
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent extends ExerciseComponent<AdditionExercise, AdditionExplanationStep> {
  constructor() {
    super(new AdditionExerciseGenerator());
  }
}
