import { Component, OnInit } from '@angular/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  /** Chart Properties **************/
  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Stats';
  showYAxisLabel = false;

  colorScheme = {
    domain: ['#F85888', '#78C750', '#6890F0', '#F8D030', '#F07F2E', '#FD0002'],
  };
  /** Chart Properties **************/

  public pokemonName: string;
  public pokemonData: any;
  public stats: Object[] = [];
  public sprites: any = {};
  public sprite: string;

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
      if (data) {
        // Set initial data for component render
        this.pokemonData = data;
        this.sprites = data.sprites;
        this.sprite = data.sprites.front_default;
        console.log(this.pokemonData);
        this.filterStats(data);
      }
    });
  }

  /**
   * filterStats
   * @param data
   * Filter pokemon stat data to readable format for Chart
   */
  private filterStats(data) {
    if (data && data.stats) {
      data.stats.forEach((stat) => {
        let filteredObj: { name: string; value: number } = {
          name: '',
          value: 0,
        };
        filteredObj.name = stat.stat.name;
        filteredObj.value = stat.base_stat;
        this.stats.push(filteredObj);
      });
    }
  }

  /**
   * onSpriteChangeClick
   * @param e
   * Updates sprite property based on class on button clicked
   */
  onSpriteChangeClick(e) {
    switch (e.target.className) {
      case 'front':
        this.sprite = this.sprites.front_default;
        break;
      case 'back':
        this.sprite = this.sprites.back_default;
        break;
      case 'sfront':
        this.sprite = this.sprites.front_shiny;
        break;
      case 'sback':
        this.sprite = this.sprites.back_shiny;
        break;
      default:
        this.sprite = this.sprites.front_default;
    }
  }
}
