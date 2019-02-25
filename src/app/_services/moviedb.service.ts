import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  apiEndpoint = 'https://api.themoviedb.org/3';
  apiKey = '2ed54a614803785fce2d7fe401cc3b21';
  // example -> https://api.themoviedb.org/3/movie/550?api_key=2ed54a614803785fce2d7fe401cc3b21


  constructor(
    private http: HttpClient
  ) { }

  getMostPopularMovies() {
    return this.http.get(`${this.apiEndpoint}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}`);
  }
}
