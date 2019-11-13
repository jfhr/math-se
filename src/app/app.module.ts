import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ConvertBaseComponent} from './convert-base/convert-base.component';
import {RouterModule, Routes} from '@angular/router';
import {NavigatorComponent} from './navigator/navigator.component';
import {AdditionExerciseGenerator} from './addition/services/addition-exercise-generator';
import {AdditionComponent} from './addition/addition.component';
import {EuclideanAlgorithmExerciseGenerator} from './euiclidean-algorithm/services/euclidean-algorithm-exercise-generator';
import {EuclideanAlgorithmComponent} from './euiclidean-algorithm/euclidean-algorithm.component';
import {AutoFocusOnShowDirective} from './directives';

const appRoutes: Routes = [
  {path: 'convert-base', component: ConvertBaseComponent},
  {path: 'addition-base', component: AdditionComponent},
  {path: 'euclidean-algorithm', component: EuclideanAlgorithmComponent},
  {path: '**', component: NavigatorComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ConvertBaseComponent,
    AdditionComponent,
    EuclideanAlgorithmComponent,
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
    EuclideanAlgorithmExerciseGenerator,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
