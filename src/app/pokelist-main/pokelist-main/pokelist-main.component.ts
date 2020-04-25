import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-pokelist-main',
  templateUrl: './pokelist-main.component.html',
  styleUrls: ['./pokelist-main.component.css'],
})
export class PokelistMainComponent implements OnInit {
  public pokeList: any;

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    // Will fetch pokemon list data on init using method in service
    this.pokeService.getMainPokeList().subscribe((data: any) => {
      this.pokeList = data;
      this.pokeService.setPages(data.next, data.previous);
    });
  }

  /**
   * onNextPage
   * Will update nextpage qurery with pagniation sent back from intial request
   */
  public onNextPage() {
    this.pokeService.getNextPageList().subscribe((data: any) => {
      this.pokeList = data;
      this.pokeService.setPages(data.next, data.previous);
    });
  }

  /**
   * onPreviousPage
   * Will update previouspage qurery with pagniation sent back from intial request
   */
  public onPreviousPage() {
    this.pokeService.getPreviousPageList().subscribe((data: any) => {
      this.pokeList = data;
      this.pokeService.setPages(data.next, data.previous);
    });
  }
}
