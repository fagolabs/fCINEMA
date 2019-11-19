import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap} from '@angular/router';
import  { MovieService } from '../movie.service';
import { Movie } from '../../movie_model/movieModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  moviesSearch: Movie[];
  
  constructor(
    private movieService: MovieService,
    private route:ActivatedRoute ){ }

  ngOnInit() {
    this.getMovieByName();
  }
  getMovieByName(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      const movieName = params.get('name');
      this.movieService.getMovieFromName(movieName).subscribe(movie => this.moviesSearch=movie);
    })
    
  }
}
