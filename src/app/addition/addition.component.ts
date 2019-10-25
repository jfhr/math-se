import {Component} from '@angular/core';
import {
  AdditionExercise,
  AdditionExerciseGenerator,
  AdditionExplanation,
  AdditionExplanationStep,
  AdditionResult
} from './services/addition-exercise-generator';

@Component({
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent {
  public showExercise: boolean;
  public exercise: AdditionExercise;
  public showResult: boolean;
  public result: AdditionResult;
  public showExplanation: boolean;
  public explanation: AdditionExplanation;
  public explanationStep: AdditionExplanationStep;
  public previousExplanationStepDisabled: boolean;
  public nextExplanationStepDisabled: boolean;
  private generator: AdditionExerciseGenerator;
  private explanationStepIndex = 0;

  constructor(generator: AdditionExerciseGenerator) {
    this.generator = generator;
    const generated = this.generator.generateExercise();
    this.exercise = generated.exercise;
    this.explanation = generated.explanation;
    this.showExercise = true;
  }

  public submitAnswer(answerField): boolean {
    if (this.showExercise && this.exercise !== undefined) {
      this.result = this.generator.getResult(this.exercise, answerField.value);

      this.explanationStep = this.explanation.steps[0];
      this.previousExplanationStepDisabled = true;
      this.nextExplanationStepDisabled = false;
      this.showResult = true;
      this.showExplanation = true;
    }
    return false;
  }

  public previousExplanationStep() {
    if (this.previousExplanationStepDisabled) {
      return;
    } else {
      this.explanationStepIndex--;
      this.explanationStep = this.explanation.steps[this.explanationStepIndex];
      if (this.explanationStepIndex === 0) {
        this.previousExplanationStepDisabled = true;
      }
      this.nextExplanationStepDisabled = false;
    }
  }

  public nextExplanationStep() {
    if (this.nextExplanationStepDisabled) {
      return;
    } else {
      this.explanationStepIndex++;
      this.explanationStep = this.explanation.steps[this.explanationStepIndex];
      if (this.explanationStepIndex + 1 === this.explanation.steps.length) {
        this.nextExplanationStepDisabled = true;
      }
      this.previousExplanationStepDisabled = false;
    }
  }
}
