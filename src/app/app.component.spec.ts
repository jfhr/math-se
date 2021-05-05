import { TestBed, waitForAsync } from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('App component', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain the router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement.querySelectorAll('router-outlet').length).toEqual(1);
  });

  it('should contain credits', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement.innerHTML.includes('made by jfhr')).toBeTruthy();
  });

});
