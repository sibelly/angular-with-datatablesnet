import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { MoviedbService } from '../../_services/moviedb.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  
  movieTable: any;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  moviesList: any = [];

  constructor(
    private chRef: ChangeDetectorRef,
    private moviedbService: MoviedbService
  ) { }

  ngOnInit() { 
    //When calling this method the error.interceptor is activated normally
    //this.getMostPopularMovies();   

    //But when I call direct using the AJAX the interceptor doesn't work
     this.dtOptions = {
       // ajax: (dataTablesParameters: any, callback) => {
       //   this.pesoService.index().subscribe(response => {
       //     console.log("testando testando => ", response);
       //     this.pesosLista = response["data"];

       //     callback({
       //       recordsTotal: "",
       //       recordsFiltered: "",
       //       data: []
       //     });
       //   });
       // }  
       ajax: {
         url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2ed54a614803785fce2d7fe401cc3b21',
         params: {
           api_key: this.moviedbService.apiKey
         },
         dataSrc: 'results'
         //type: 'GET',
         //headers: {"Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('authUser'))["token"]}
       },
       columns: [
         { data: 'title' },
         { data: 'release_date' }
       ]
     };

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getMostPopularMovies(){

     this.moviedbService.getMostPopularMovies().
       subscribe((movies: any) => {
         this.moviesList = movies.results;

console.log("====", movies);

        //  this.chRef.detectChanges();
        //  const table: any = $('table');
        //  this.movieTable = table.dataTable({
        //    language: {
        //      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
        //    },
        //    pageLength: 100,
        //    pagingType: 'full_numbers',
        //  });
        
       }, (error: any) => {
         console.error("Erro-> ", error);
     });
  }

}
