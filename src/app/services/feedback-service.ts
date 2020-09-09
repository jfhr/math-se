import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

/**
 * Posts feedback to the backend, which forwards it to Azure DevOps.
 */
@Injectable()
export class FeedbackService {
  private url = environment.netBackendUrl + '/math-se-feedback/create-bug';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create a new issue with the specified title and description.
   */
  public postFeedback(title: string, description: string): Observable<any> {
    console.log(this.url);
    return this.httpClient.post(this.url, null, {
      params: {title, description}
    });
  }
}
