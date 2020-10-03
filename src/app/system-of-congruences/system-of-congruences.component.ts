import {Component} from '@angular/core';
import {ExerciseComponent} from '../services/exercise-component';
import {SystemOfCongruencesExercise, SystemOfCongruencesExplanationStep} from './services/system-of-congruences-exercise-generator';

@Component({
  selector: 'app-system-of-congruences',
  templateUrl: './system-of-congruences.component.html',
  styleUrls: ['./system-of-congruences.component.css']
})
export class SystemOfCongruencesComponent  extends ExerciseComponent<SystemOfCongruencesExercise, SystemOfCongruencesExplanationStep> {
  constructor(generator) {
    super(generator);
  }
}
