import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FeedbackComponent} from './feedback/feedback.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public switchThemeMessage;
  private params: URLSearchParams;

  constructor(private modalService: NgbModal) {
    // we read the user's theme preference from the url query params
    // use location.hash instead of location.search to avoid reload on set
    this.params = new URLSearchParams(location.search);
    this.setSwitchThemeMessage();
  }

  public toggleTheme() {
    if (this.params.get('theme') === 'dark') {
      this.params.set('theme', 'light');
    } else {
      this.params.set('theme', 'dark');
    }
    const newHref = `${location.pathname}?${this.params.toString()}`;
    if (history.state !== undefined) {
      history.replaceState(history.state.data, history.state.title, newHref);
    } else {
      history.replaceState(undefined, undefined, newHref);
    }
    this.setSwitchThemeMessage();
    // @ts-ignore
    window.loadCss();
  }

  private setSwitchThemeMessage() {
    if (this.params.get('theme') === 'dark') {
      this.switchThemeMessage = 'lights on';
    } else {
      this.switchThemeMessage = 'lights off';
    }
  }

  public openFeedbackModal() {
    const modalRef = this.modalService.open(FeedbackComponent);
    modalRef.componentInstance.feedbackSubmitted
      .subscribe(_ => this.modalService.dismissAll('Finished.'));
  }
}
