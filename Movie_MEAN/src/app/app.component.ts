import { Component, OnInit } from '@angular/core';
import{ Observable } from 'rxjs';
import{ Subject } from 'rxjs';
import{ debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Movie } from  '../movie_model/movieModel';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movie: Observable<Movie[]>;
  private searchsubject = new Subject<string>();

  constructor(private movieService: MovieService){}

  search(searchstring: string): void{
    this.searchsubject.next(searchstring);
  }

  ngOnInit(){
  //   this.movie= this.searchsubject.pipe(
  //     // debounceTime(300),
  //     // distinctUntilChanged(),
  //     // switchMap((this.searchstring: string)=> this.movieService.searchmovie(searchstring))
  //   );
   }
}
