import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'math-training';
  public switchThemeMessage;

  constructor() {
    this.setSwitchThemeMessage();
  }

  public toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
    this.setSwitchThemeMessage();
    // @ts-ignore
    window.loadCss();
  }

  private setSwitchThemeMessage() {
    if (localStorage.getItem('theme') === 'dark') {
      this.switchThemeMessage = 'lights on';
    } else {
      this.switchThemeMessage = 'lights off';
    }
  }
}
