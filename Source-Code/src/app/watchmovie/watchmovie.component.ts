import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  { MovieService } from '../movie.service';
import { Movie } from '../../movie_model/movieModel';

@Component({
  selector: 'app-watchmovie',
  templateUrl: './watchmovie.component.html',
  styleUrls: ['./watchmovie.component.css']
})
export class WatchmovieComponent implements OnInit {
  movies: Movie[];
  constructor(
    private movieService: MovieService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMovieByName();
  }
  getMovieByName(){
    const movieName = this.route.snapshot.paramMap.get('name');
    this.movieService.getMovieFromName(movieName).subscribe(movie => this.movies=movie);
  }
}
