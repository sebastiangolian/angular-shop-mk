import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackendInterceptor } from './interceptors/backend.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketModule } from '../basket/basket.module';
import { BannerModule } from '../banner/banner.module';
import { CookieBarComponent } from './components/cookie-bar/cookie-bar.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

let providers: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true }
];

if (environment.name == "prod") {
  providers.pop()
}

@NgModule({
  declarations: [
    AppComponent,
    CookieBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    SharedModule,
    BasketModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BannerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => { return localStorage.getItem("token") },
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      }
    })
  ],
  providers: providers,
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
