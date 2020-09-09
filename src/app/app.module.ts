import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {ConvertBaseComponent} from './convert-base/convert-base.component';
import {NavigatorComponent} from './navigator/navigator.component';
import {AdditionExerciseGenerator} from './addition/services/addition-exercise-generator';
import {AdditionComponent} from './addition/addition.component';
import {AutoFocusOnShowDirective} from './directives';
import {SimpleEuclideanAlgorithmComponent} from './euclidean-algorithm/simple-euclidean-algorithm.component';
import {DigitComponent} from './app-digit/digit.component';
import {SimpleEuclideanGenerator} from './euclidean-algorithm/services/simple-euclidean-generator';
import {ExtendedEuclideanAlgorithmComponent} from './euclidean-algorithm/extended-euclidean-algorithm.component';
import {ExtendedEuclideanGenerator} from './euclidean-algorithm/services/extended-euclidean-generator';
import {FeedbackComponent} from './feedback/feedback.component';
import {FeedbackService} from './services/feedback-service';
import {NgbModalRef, NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  {path: 'convert-base', component: ConvertBaseComponent},
  {path: 'addition-base', component: AdditionComponent},
  {path: 'euclidean-algorithm', component: SimpleEuclideanAlgorithmComponent},
  {path: 'extended-euclidean-algorithm', component: ExtendedEuclideanAlgorithmComponent},
  {path: '**', component: NavigatorComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DigitComponent,
    NavigatorComponent,
    ConvertBaseComponent,
    AdditionComponent,
    SimpleEuclideanAlgorithmComponent,
    ExtendedEuclideanAlgorithmComponent,
    FeedbackComponent,
    AutoFocusOnShowDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      paramsInheritanceStrategy: 'always',
    }),
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    AdditionExerciseGenerator,
    SimpleEuclideanGenerator,
    ExtendedEuclideanGenerator,
    FeedbackService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FeedbackComponent,
  ]
})
export class AppModule {
}
