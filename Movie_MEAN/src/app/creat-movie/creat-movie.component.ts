import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../../movie_model/movieModel';
import { MovieService } from '../movie.service';
import { from } from 'rxjs';



@Component({
  selector: 'app-creat-movie',
  templateUrl: './creat-movie.component.html',
  styleUrls: ['./creat-movie.component.css']
})
export class CreatMovieComponent implements OnInit {
  movieForm: FormGroup;
  name: String="";
  constructor(private fb: FormBuilder,
              private movieService: MovieService,
              private router: Router) {
                  this.movieService.creat().subscribe(
                  data => {
                    this.addName(data);
                    console.log(data);
                  },
                  err => {
                    console.log(err);
                    this.router.navigateByUrl('/login')}
                )
               }
  addName(data) {
    this.name = data.userName;
  }
  onSubmit() {
    this.movieService.createMovie(this.movieForm.value).subscribe(
      (res) => {
        console.log("Create movie successfull");
        this.movieForm.reset();
      },
      (err) => console.log(err)
    );
    

  }
  ngOnInit() {
    this.movieForm = this.fb.group({
      id: Validators.required,
      name: ["", Validators.required],
      release_year: Validators.required,
      run_time: Validators.required,
      rate: Validators.required,
      poster_path: ["", Validators.required],
      genre: this.fb.group({
        phimhanhdong: false,
        phimvientuong: false,
        phimchientranh: false,
        phimhinhsu: false,
        phimphieuluu: false,
        phimhaihuoc: false,
        phimvothuat: false,
        phimkinhdi: false,
        phimhoihopgaycan: false,
        phimbiansieunhien: false,
        phimcotrang: false,
        phimhoathinh: false,
        phimchieurap: false
      }),
    })
  }

}
