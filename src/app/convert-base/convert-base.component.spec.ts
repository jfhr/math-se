import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertBaseComponent } from './convert-base.component';

describe('ConvertBaseComponent', () => {
  let component: ConvertBaseComponent;
  let fixture: ComponentFixture<ConvertBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
