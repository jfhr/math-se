import {AdditionComponent} from './addition.component';

describe('AdditionComponent', () => {
  let target: AdditionComponent;

  beforeEach(() => {
    target = new AdditionComponent();
  });

  // Some tests require at least two or three explanation steps.
  // In the unlikely case that the random exercise explanation has fewer steps,
  // we generate a new one.
  const ensureExplanationSteps = (atLeast: number) => {
    while (target.explanation.steps.length < atLeast) {
      target.newExercise();
    }
  };

  it('should immediately generate an exercise', () => {
    expect(target.exercise).toBeDefined();
  });


  it('should initially display only the exercise', () => {
    expect(target.showExercise).toBeTruthy();
    expect(target.showResult).toBeFalsy();
    expect(target.showExplanation).toBeFalsy();
  });

  it('should display result & explanation when an answer is submitted', () => {
    target.submitAnswer({value: 'whatever'});

    // addition-exercise-generator.spec.ts tests if the result is correct
    // we just care if it is displayed
    expect(target.showResult).toBeTruthy();
    expect(target.showExplanation).toBeTruthy();
    expect(target.result).toBeDefined();
    expect(target.explanation).toBeDefined();
    expect(target.explanationStep).toBeDefined();
  });

  it('should allow navigating the explanation', () => {
    ensureExplanationSteps(2);
    target.submitAnswer({value: 'whatever'});

    const firstStep = target.explanationStep;
    expect(target.nextExplanationStepDisabled).toBeFalsy();
    expect(target.previousExplanationStepDisabled).toBeTruthy();
    target.nextExplanationStep();
    expect(target.previousExplanationStepDisabled).toBeFalsy();
    expect(target.explanationStep).not.toEqual(firstStep);
  });

  it('should still allow navigation after a new answer was submitted', () => {
    ensureExplanationSteps(2);
    target.submitAnswer({value: 'whatever'});
    target.nextExplanationStep();
    target.submitAnswer({value: 'smth else'});
    target.previousExplanationStep();
    target.nextExplanationStep();
  });

  it('should generate a new exercise', () => {
    const firstExercise = target.exercise;
    target.newExercise();
    expect(firstExercise).not.toEqual(target.exercise);
  });

});
