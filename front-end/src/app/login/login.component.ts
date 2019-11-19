import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: String="";
  constructor(private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router) { }
  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('Invalid'); return;
    }
    this.movieService.logIn(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('/movie')
      },
      (err) => this.err(err)
    )
  }
  err(err) {
    this.error = err.error.message;
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required]],
      passWord: ["", [Validators.required]]
    })
  }

}
