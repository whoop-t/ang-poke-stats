import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PokelistMainComponent } from './pokelist-main/pokelist-main/pokelist-main.component';
import { PokemonComponent } from './pokelist-main/pokemon/pokemon.component';
import { PokeHeaderComponent } from './pokelist-main/poke-header/poke-header.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { PokeSearchComponent } from './pokelist-main/poke-search/poke-search.component';
import { FormsModule } from '@angular/forms';

// Routes for app
const routes: Routes = [
  { path: '', redirectTo: '/pokelist', pathMatch: 'full' },
  { path: 'pokelist', component: PokelistMainComponent },
  { path: 'pokelist/:name', component: PokemonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PokelistMainComponent,
    PokemonComponent,
    PokeHeaderComponent,
    LoadingComponent,
    PokeSearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
