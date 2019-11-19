import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { DetailmovieComponent } from './detailmovie/detailmovie.component';
import { WatchmovieComponent } from './watchmovie/watchmovie.component';
import { MovietypeComponent } from './movietype/movietype.component';
import { Movie } from '../movie_model/movieModel';
import { SearchComponent } from './search/search.component';
import { TheaterComponent } from './theater/theater.component';
import { CreatMovieComponent } from './creat-movie/creat-movie.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginFacebookComponent } from './login-facebook/login-facebook.component';
import { from } from 'rxjs';

const routes: Routes = [
   {path: '', redirectTo: '/movie', pathMatch: 'full'},
   {path: 'movie', component: MoviesComponent},
   {path: 'watchmovie/:name', component: WatchmovieComponent},
   {path: 'search/:name', component: SearchComponent},
   {path: 'movietype/:type', component: MovietypeComponent},
   {path: 'detailmovie/:id', component: DetailmovieComponent},
   {path: 'phim-chieu-rap', component: TheaterComponent},
   {path: 'creat-movie', component: CreatMovieComponent},
   {path: 'login', component: LoginComponent},
   {path: 'signup' , component: SignupComponent},
   {path: 'login-facebook', component: LoginFacebookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
