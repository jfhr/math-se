import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SystemOfCongruencesComponent} from './system-of-congruences.component';
import {SystemOfCongruencesGenerator} from './services/system-of-congruences-generator';

describe('System of congruences component', () => {
  let component: SystemOfCongruencesComponent;
  let fixture: ComponentFixture<SystemOfCongruencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemOfCongruencesComponent],
      providers: [SystemOfCongruencesGenerator]
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
