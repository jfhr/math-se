import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemOfCongruencesComponent } from './system-of-congruences.component';

describe('SystemOfCongruencesComponent', () => {
  let component: SystemOfCongruencesComponent;
  let fixture: ComponentFixture<SystemOfCongruencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemOfCongruencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemOfCongruencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
