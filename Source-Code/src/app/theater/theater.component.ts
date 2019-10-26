import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie_model/movieModel';
import  { MovieService } from '../movie.service';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {
  movieTheater: Movie[];
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovieTheater();
  }
  getMovieTheater() {
    this.movieService.getMovieFromTheater().subscribe(
      (movie) => {
        this.movieTheater = movie;
      }
    )
  }
}
