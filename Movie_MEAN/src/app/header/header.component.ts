import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  movieName: string;
  login=true;
  constructor(private movieService: MovieService,
              private router: Router){}
  ngOnInit() {
    this.onclick();
  }
  onclick() {
    this.movieName = "";
  }
  logout() {
    this.movieService.logout().subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      err => console.error(err)
    )
  }
}
