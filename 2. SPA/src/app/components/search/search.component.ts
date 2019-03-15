import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe} from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  heroes:Heroe[] = [];
  termino:string;

  constructor(private _heroesService:HeroesService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.termino = params['termino'];
      this.heroes = this._heroesService.searchHeroes(params['termino']);
    });
    console.log(this.heroes);
    
  }

  verHeroeNombre(nombre:string) {
    // console.log(idx);
    let idx = this._heroesService.getHeroeIndexByName(nombre);
    this.router.navigate(['/heroe', idx]);
   }

}
