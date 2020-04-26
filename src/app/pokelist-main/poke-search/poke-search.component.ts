import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.css'],
})
export class PokeSearchComponent implements OnInit {
  private url: string = '/pokelist/';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * onSubmit
   * @param f
   * Navigate to component with value entered as params
   */
  onSubmit(f) {
    // Dont allow submissions with no input
    if (f.value.pokemon !== '') {
      this.router.navigate([this.url, f.value.pokemon]);
      f.reset();
    }
  }
}
