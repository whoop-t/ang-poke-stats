import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../poke.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit, OnDestroy, AfterViewInit {
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
  public pokemonData: any = null;
  public stats: Object[] = [];
  public sprites: any = {};
  public sprite: string;
  // List of subscriptions to unsubscribe from when destroy
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService
  ) {}

  //! If accessing pokemon from main page by clikc link, it renders data twice, never show loading
  //! If searching from within single pokemon component, updates data and shows loading
  // Find issue
  ngOnInit() {
    this.subscriptions.add(
      // Get name from query params, fetch using name
      this.route.params.subscribe((params) => {
        this.pokemonData = null;
        this.pokemonName = params.name;
        this.pokeService.getSinglePokeData(this.pokemonName);
      })
    );
    // Get data from BehaviorSubject in service
    this.subscriptions.add(
      this.pokeService.updateSinglePokeData().subscribe((data) => {
        if (data === 'Not Found') {
          this.pokemonData = data;
        } else if (data) {
          this.stats = [];
          // Set initial data for component render
          this.pokemonData = data;
          this.sprites = data.sprites;
          this.sprite = data.sprites.front_default;
          console.log(this.pokemonData);
          this.filterStats(data);
        }
      })
    );
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
