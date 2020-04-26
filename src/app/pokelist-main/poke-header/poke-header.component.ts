import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-poke-header',
  templateUrl: './poke-header.component.html',
  styleUrls: ['./poke-header.component.css'],
})
export class PokeHeaderComponent implements OnInit {
  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {}

  /**
   * onNextPage
   * Will update nextpage qurery with pagniation sent back from intial request
   */
  public onNextPage() {
    this.pokeService.getNextPageList();
  }

  /**
   * onPreviousPage
   * Will update previouspage qurery with pagniation sent back from intial request
   */
  public onPreviousPage() {
    this.pokeService.getPreviousPageList();
  }
}
