import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-pokelist-main',
  templateUrl: './pokelist-main.component.html',
  styleUrls: ['./pokelist-main.component.css'],
})
export class PokelistMainComponent implements OnInit {
  public pokeData: any;

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    // Fetch pokemon list data on init using method in service
    this.pokeService.getMainPokeList();

    // updatePokeData is reuturning observable, subscribing to data on the service BehaviorSubject pokeData
    this.pokeService.updatePokeData().subscribe((data) => {
      this.pokeData = data;
    });
  }
}
