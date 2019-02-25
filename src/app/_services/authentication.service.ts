import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  apiKey = '2ed54a614803785fce2d7fe401cc3b21';
  // example -> https://api.themoviedb.org/3/movie/550?api_key=2ed54a614803785fce2d7fe401cc3b21

  public requestToken() {

console.log("Opa... gerando o token lah pah");

    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`);

  }

  public login(username: string, password: string) {
  
  }

}
