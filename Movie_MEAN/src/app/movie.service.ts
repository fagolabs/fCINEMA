import { Injectable } from '@angular/core';
import { Movie } from '../movie_model/movieModel';
import { Genre } from '../movie_model/genre';
import{ Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private http: HttpClient,
  ) { }

  private moviesURL= 'http://localhost:8080';

  signupAccount(data): Observable<any> {
    let url = `${this.moviesURL}/signup`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    );
  }
  logIn(body: any){
    let url = `${this.moviesURL}/login`;
    return this.http.post(url, body, {
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  isLogIn(){
    let url = `${this.moviesURL}/isLogIn`;
    return this.http.get(url, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  logInFb(){
    let url = `${this.moviesURL}/auth/fb`;
    return this.http.get(url, {
      observe: 'response',
      withCredentials: true, 
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  creat() {
    let url = `${this.moviesURL}/create`;
    return this.http.get(url,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }); 
  }
  logout() {
    let url = `${this.moviesURL}/logout`;
    return this.http.get(url,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }); 
  }

  createMovie(data): Observable<any>{
    let url = `${this.moviesURL}/create-movie`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    );
  }
  getMovie(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.moviesURL}/movie`);
  }
  getGenre(id: number){
    return this.http.get<Genre[]>(`${this.moviesURL}/genre/${id}`);
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
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
