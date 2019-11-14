import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../movie_model/movieModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detailmovie',
  templateUrl: './detailmovie.component.html',
  styleUrls: ['./detailmovie.component.css']
})
export class DetailmovieComponent implements OnInit {
  movie: Movie[];
  constructor(
    private route:ActivatedRoute ,
    private movieService:MovieService ,
    private location:Location ,
  ) { }

  ngOnInit() {
    this.movieDetail();
  }

  movieDetail(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieFromId(id).subscribe((movie) => {this.movie = movie});
  }

  selectmovie:1;
  onSelect():void{
    this.selectmovie=1;
  }
}
