import {Component, EventEmitter, Output} from '@angular/core';
import {FeedbackService} from '../services/feedback-service';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  public allTypes: FeedbackType[] = [
    {shortName: '🙁', rating: -1},
    {shortName: '😕', rating: -0.5},
    {shortName: '😐', rating: 0},
    {shortName: '🙂', rating: 1},
  ];

  @Output() public feedbackSubmitted = new EventEmitter();

  public selectedType: FeedbackType;
  public title = '';
  public description = '';

  constructor(private feedbackService: FeedbackService) {
    // "I don't like something" is selected by default
    this.selectedType = this.allTypes[2];
  }

  public submitFeedback() {
    const fullDescription = `
This issue was generated automatically from user feedback on the website.

${this.selectedType.shortName} ${this.selectedType.rating}

${this.description}
`;
    this.feedbackService.postFeedback(this.title, fullDescription)
      .subscribe(_ => this.feedbackSubmitted.emit());
  }
}

export interface FeedbackType {
  shortName: string;
  rating: number;
}
