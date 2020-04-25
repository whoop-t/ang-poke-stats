import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private http: HttpClient) {}

  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private nextPage: string;
  private previousPage: string;

  public getMainPokeList() {
    return this.http.get(`${this.pokeApiUrl}`, {
      headers: { header: 'Access-Control-Allow-Origin' },
    });
  }
  public getNextPageList() {
    return this.http.get(`${this.nextPage}`, {
      headers: { header: 'Access-Control-Allow-Origin' },
    });
  }
  public getPreviousPageList() {
    return this.http.get(`${this.previousPage}`, {
      headers: { header: 'Access-Control-Allow-Origin' },
    });
  }

  public setPages(next: string, previous: string) {
    this.nextPage = next;
    this.previousPage = previous;
  }
}
