import { Injectable } from '@angular/core';
import { Movie } from '../movie_model/movieModel';
import{ Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private http: HttpClient,
  ) { }

  private moviesURL= 'http://localhost:8080';

  getMovie(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.moviesURL}/movie`);
  }

  getMovieFromId(id: number): Observable<Movie[]>{
    // const url=`${this.moviesURL}/${id}`;//gọi đến đường dẫn phim
    return this.http.get<Movie[]>(`${this.moviesURL}/detailmovie/${id}`);
  }

  getMovieFromName(name: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.moviesURL}/search/${name}`);
  }
  getMovieFromType(typeName: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.moviesURL}/type/${typeName}`);
  }
  getMovieFromTheater(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.moviesURL}/theater`);
  }
}
