import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie_model/movieModel';
import  { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies:Movie[];
  constructor(
    private movieService: MovieService){
      }

  ngOnInit() {
    this.getMovieFromServer();
  }

  getMovieFromServer(): void{
    this.movieService.getMovie().subscribe(
      (updateMovies) => {
        this.movies = updateMovies;
      }
    )
  }
}
