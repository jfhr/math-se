import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ConvertBaseComponent} from './convert-base/convert-base.component';
import {RouterModule, Routes} from '@angular/router';
import {NavigatorComponent} from './navigator/navigator.component';
import {AdditionExerciseGenerator} from './addition/services/addition-exercise-generator';
import {AdditionComponent} from './addition/addition.component';
import {AutoFocusOnShowDirective} from './directives';
import {SimpleEuclideanAlgorithmComponent} from './euclidean-algorithm/simple-euclidean-algorithm.component';
import {DigitComponent} from './app-digit/digit.component';
import {SimpleEuclideanGenerator} from "./euclidean-algorithm/services/simple-euclidean-generator";

const appRoutes: Routes = [
  {path: 'convert-base', component: ConvertBaseComponent},
  {path: 'addition-base', component: AdditionComponent},
  {path: 'euclidean-algorithm', component: SimpleEuclideanAlgorithmComponent},
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
    AutoFocusOnShowDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      paramsInheritanceStrategy: 'always',
    })
  ],
  providers: [
    AdditionExerciseGenerator,
    SimpleEuclideanGenerator,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
