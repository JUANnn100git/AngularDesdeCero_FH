import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor( private http: HttpClient) {
    console.log('Constructor del Home hecho');
    this.http.get('https://restcountries.eu/rest/v2/lang/es');
   }

  ngOnInit() {
  }

}
