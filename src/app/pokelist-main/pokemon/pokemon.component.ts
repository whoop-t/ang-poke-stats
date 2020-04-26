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
  view: any[] = [500, 300];

  // options
  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  // xAxisLabel = 'Stats';
  showYAxisLabel = false;

  colorScheme = {
    domain: ['#F85888', '#78C750', '#6890F0', '#F8D030', '#F07F2E', '#FD0002'],
  };

  /** Chart Properties **************/

  public pokemonName: string;
  public pokemonData: any;
  public stats: Object[] = [];

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
        this.pokemonData = data;
        console.log(this.pokemonData);
        this.filterStats(data);
        console.log(this.stats);
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
        console.log(stat.base_stat);
        console.log(stat.stat.name);
        filteredObj.name = stat.stat.name;
        filteredObj.value = stat.base_stat;
        this.stats.push(filteredObj);
      });
    }
  }
}
