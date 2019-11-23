import {Component, Input} from '@angular/core';
import {Digit} from '../services/exercise-component';

@Component({
  selector: 'app-digit',
  template: '<span [style.visibility.hidden]="!d.isVisible" [classList]="d.cssClass">{{d.value}}</span>'
})
export class DigitComponent {
  @Input() public d: Digit;
}
