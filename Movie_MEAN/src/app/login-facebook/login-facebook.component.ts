import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.css']
})
export class LoginFacebookComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  
  ngOnInit() {
    this.loginFacebook();
  }
  loginFacebook() {
    this.movieService.logInFb().subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    
    )
  }
}
