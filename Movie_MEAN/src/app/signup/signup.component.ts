import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  success = true;
  constructor(private fb: FormBuilder,
              private movieService: MovieService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      userName: ["", [Validators.required]],
      passWord: ["", [Validators.required]]
    })
  }
  onSubmit() {
    this.movieService.signupAccount(this.signupForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('/login')
        console.log('sign up success')
      }, (err) => {
        this.success = false;
      }
    )
  }
}
