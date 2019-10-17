import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ConvertBaseComponent} from './convert-base/convert-base.component';
import {RouterModule, Routes} from '@angular/router';
import {NavigatorComponent} from './navigator/navigator.component';

const appRoutes: Routes = [
  {path: 'convert-base', component: ConvertBaseComponent},
  {path: '**', component: NavigatorComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ConvertBaseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
