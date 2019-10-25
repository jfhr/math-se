import {Component, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
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
  public showExercise = false;
  public exercise: AdditionExercise;
  public showResult = false;
  public result: AdditionResult;
  public showExplanation = false;
  public explanation: AdditionExplanation;
  public explanationStep: AdditionExplanationStep;
  public previousExplanationStepDisabled = true;
  public nextExplanationStepDisabled = true;
  private generator: AdditionExerciseGenerator;
  private explanationStepIndex = 0;

  constructor(generator: AdditionExerciseGenerator) {
    this.generator = generator;
    this.newExercise();
  }

  public newExercise() {
    const generated = this.generator.generateExercise();
    this.exercise = generated.exercise;
    this.explanation = generated.explanation;
    this.showExercise = true;
    this.showExplanation = false;
    this.showResult = false;
  }

  /**
   * Formats a number by inserting a space after a given number of characters
   * (default 4), counting from the end of the string.
   */
  public formatNumber(n: string, nSpace: number = 4): string {
    let result = '';
    for (let i = n.length - 1; i >= 0; i--) {
      result = n[i] + result;
      if (i % nSpace === n.length % nSpace) {
        result = ' ' + result;
      }
    }
    return result;
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

@Directive({
  selector: '[appAutoFocusOnShow]'
})
export class AutoFocusOnShowDirective implements OnInit {
  constructor(public renderer: Renderer2, public elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }
}
