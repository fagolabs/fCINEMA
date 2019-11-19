import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DetailmovieComponent } from './detailmovie/detailmovie.component';
import { WatchmovieComponent } from './watchmovie/watchmovie.component';
import { ContactComponent } from './contact/contact.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { LoginComponent } from './login/login.component';
import { SettingComponent } from './setting/setting.component';
import { ShareComponent } from './share/share.component';
import { MovieService } from './movie.service';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovietypeComponent } from './movietype/movietype.component';
import { SearchComponent } from './search/search.component';
import { TheaterComponent } from './theater/theater.component';
import { CreatMovieComponent } from './creat-movie/creat-movie.component';
import { SignupComponent } from './signup/signup.component';
import { LoginFacebookComponent } from './login-facebook/login-facebook.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeaderComponent,
    FooterComponent,
    DetailmovieComponent,
    WatchmovieComponent,
    ContactComponent,
    IntroduceComponent,
    LoginComponent,
    SettingComponent,
    ShareComponent,
    MovietypeComponent,
    SearchComponent,
    TheaterComponent,
    CreatMovieComponent,
    SignupComponent,
    LoginFacebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
