import {Component} from '@angular/core';
import {ExerciseComponent} from '../services/exercise-component';
import {
  SystemOfCongruencesExercise,
  SystemOfCongruencesGenerator,
  SystemOfCongruencesExplanationStep,
  SystemOfCongruencesAnswer,
} from './services/system-of-congruences-generator';

@Component({
  selector: 'app-system-of-congruences',
  templateUrl: './system-of-congruences.component.html',
  styleUrls: ['./system-of-congruences.component.css']
})
export class SystemOfCongruencesComponent extends ExerciseComponent<SystemOfCongruencesExercise, SystemOfCongruencesExplanationStep> {

  public answer: SystemOfCongruencesAnswer = {m: '', x: ''};

  constructor(generator: SystemOfCongruencesGenerator) {
    super(generator);
  }
}
