import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConvertBaseComponent} from './convert-base.component';

describe('Convert base component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConvertBaseComponent
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ConvertBaseComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should auto-create an exercise on load', () => {
    const fixture = TestBed.createComponent(ConvertBaseComponent);
    expect(fixture.nativeElement.querySelectorAll('.exercise').length).toEqual(1);
  });
});
