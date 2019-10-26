import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import  { MovieService } from '../movie.service';
import { Movie } from '../../movie_model/movieModel';

@Component({
  selector: 'app-movietype',
  templateUrl: './movietype.component.html',
  styleUrls: ['./movietype.component.css']
})
export class MovietypeComponent implements OnInit {
  type: String;
  movieType: Movie[];
  constructor(
    private movieService: MovieService,
    private route:ActivatedRoute
  ) { }

  
  ngOnInit() {
    this.getType();
  }
  getType() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const type = params.get('type');
      this.type=type;
      this.movieService.getMovieFromType(type).subscribe(
        (movie) => {
          this.movieType = movie;
        }
      )
    })
  }
}
