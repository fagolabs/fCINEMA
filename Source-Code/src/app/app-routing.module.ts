import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { SigninComponent } from './signin/signin.component';
import { DetailmovieComponent } from './detailmovie/detailmovie.component';
import { WatchmovieComponent } from './watchmovie/watchmovie.component';
import { MovietypeComponent } from './movietype/movietype.component';
import { Movie } from '../movie_model/movieModel';
import { SearchComponent } from './search/search.component';
import { TheaterComponent } from './theater/theater.component';
const routes: Routes = [
   {path: '', redirectTo: '/movie', pathMatch: 'full'},
   {path: 'movie', component: MoviesComponent},
   {path: 'watchmovie/:name', component: WatchmovieComponent},
   {path: 'signin', component: SigninComponent},
   {path: 'search/:name', component: SearchComponent},
   {path: 'movietype/:type', component: MovietypeComponent},
   {path: 'detailmovie/:id', component: DetailmovieComponent},
   {path: 'phim-chieu-rap', component: TheaterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
