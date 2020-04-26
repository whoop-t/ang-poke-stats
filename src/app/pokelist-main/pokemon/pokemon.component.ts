import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  private pokemonName: string;
  public pokemonData: any;

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService
  ) {}

  ngOnInit(): void {
    // Get name from query params, fetch using name
    this.pokemonName = this.route.snapshot.paramMap.get('name');
    this.pokeService.getSinglePokeData(this.pokemonName);
    // Get data from BehaviorSubject in service
    this.pokeService.updateSinglePokeData().subscribe((data) => {
      this.pokemonData = data;
    });
  }
}
