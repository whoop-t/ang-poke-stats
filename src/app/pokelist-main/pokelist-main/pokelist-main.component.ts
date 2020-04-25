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
    this.pokeService.getMainPokeList().subscribe((data: any) => {
      this.pokeList = data;
      this.pokeService.setPages(data.next, data.previous);
    });
  }

  public onNextPage() {
    this.pokeService.getNextPageList().subscribe((data: any) => {
      this.pokeList = data;
      this.pokeService.setPages(data.next, data.previous);
    });
  }
  public onPreviousPage() {
    this.pokeService.getPreviousPageList().subscribe((data: any) => {
      this.pokeList = data;
      this.pokeService.setPages(data.next, data.previous);
    });
  }
}
