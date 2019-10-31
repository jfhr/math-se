import {Component} from '@angular/core';
import {AdditionExercise, AdditionExplanationStep} from './services/addition-exercise-generator';
import {ExerciseComponent} from '../services/exercise-component';

@Component({
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent extends ExerciseComponent<AdditionExercise, AdditionExplanationStep> {
}
