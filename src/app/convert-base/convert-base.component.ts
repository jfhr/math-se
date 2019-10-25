import {Component} from '@angular/core';
import {ConvertBaseExerciseGenerator, Exercise} from './services/convert-base-exercise-generator';
import {MsToWidthConverter} from './services/ms-to-width-converter';

@Component({
  selector: 'app-convert-base',
  templateUrl: './convert-base.component.html',
  styleUrls: ['./convert-base.component.css']
})
export class ConvertBaseComponent {
  public currentExercise: Exercise;
  public currentResult: Result;
  public lastResults: Result[] = [];
  private generator: ConvertBaseExerciseGenerator;
  private msToWidth: MsToWidthConverter;
  private currentInterval;

  constructor() {
    this.generator = new ConvertBaseExerciseGenerator({
      bases: [2, 8, 10, 16],
      maxValue: 2048,
    });
    this.msToWidth = new MsToWidthConverter();
    this.newExercise();
  }

  public newExercise(answerField?) {
    clearInterval(this.currentInterval);
    if (answerField !== undefined) {
      answerField.value = '';
    }

    this.currentExercise = this.generator.getExercise();
    this.currentResult = {
      finished: false,
      milliseconds: 0,
      class: 'result',
    };

    this.currentInterval = setInterval(() => {
      this.currentResult.milliseconds += 10;
      this.currentResult.width = this.msToWidth.getWidth(this.currentResult.milliseconds);
    }, 10);
  }

  public checkResult(answerField) {
    this.currentResult.correct = this.generator.checkResult(this.currentExercise, answerField.value);
    this.currentResult.class = this.resultClass(this.currentResult);
    this.lastResults.unshift(this.currentResult);
    if (this.currentResult.correct) {
      this.msToWidth.adaptScaleFactor(this.currentResult.width);
    }

    this.newExercise(answerField);
    return false;
  }

  public resultClass(result: Result) {
    if (result.correct === true) {
      return 'result-correct';
    } else if (result.correct === false) {
      return 'result-false';
    } else {
      return 'result';
    }
  }
}

export interface Result {
  finished: boolean;
  correct?: boolean;
  milliseconds: number;

  class?: string;
  width?: number;
}
