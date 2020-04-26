import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PokelistMainComponent } from './pokelist-main/pokelist-main/pokelist-main.component';
import { PokemonComponent } from './pokelist-main/pokemon/pokemon.component';
import { PokeHeaderComponent } from './pokelist-main/poke-header/poke-header.component';

// Routes for app
const routes: Routes = [
  { path: '', redirectTo: '/pokelist', pathMatch: 'full' },
  { path: 'pokelist', component: PokelistMainComponent },
  { path: 'pokelist/:pagenum', component: PokelistMainComponent },
  { path: 'pokemon/:name', component: PokemonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PokelistMainComponent,
    PokemonComponent,
    PokeHeaderComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
