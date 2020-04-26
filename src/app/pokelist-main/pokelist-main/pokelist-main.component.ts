import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokeService } from '../poke.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokelist-main',
  templateUrl: './pokelist-main.component.html',
  styleUrls: ['./pokelist-main.component.css'],
})
export class PokelistMainComponent implements OnInit, OnDestroy {
  public pokeData: any;
  private subscriptions = new Subscription();

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    // Fetch pokemon list data on init using method in service
    this.pokeService.getMainPokeList();

    // updatePokeData is reuturning observable, subscribing to data on the service BehaviorSubject pokeData
    this.subscriptions.add(
      this.pokeService.updatePokeData().subscribe((data) => {
        this.pokeData = data;
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
