import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private http: HttpClient) {}

  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private nextPage: string;
  private previousPage: string;

  /**
   * getMainPokeList
   * @param name
   * Returns data from pokeapi, it can accept a param of name which will which specific data on the pokemon name passed in.
   * If no param, it will return list of pokemon names with pagination included
   */
  public getMainPokeList(name?: string) {
    return this.http.get(`${this.pokeApiUrl}${name ? name : ''}`, {
      headers: { header: 'Access-Control-Allow-Origin' },
    });
  }

  /**
   * getNextPageList
   * Takes nextpage pagination save from initial fetch, using that to fetch next list of pokemon
   */
  public getNextPageList() {
    return this.http.get(`${this.nextPage}`, {
      headers: { header: 'Access-Control-Allow-Origin' },
    });
  }

  /**
   * getPreviousPageList
   * Takes previouspage pagination save from initial fetch, using that to fetch previous list of pokemon
   */
  public getPreviousPageList() {
    return this.http.get(`${this.previousPage}`, {
      headers: { header: 'Access-Control-Allow-Origin' },
    });
  }

  /**
   * setPages
   * @param next
   * @param previous
   * Stores next and previous pagination in properties in pokeService
   */
  public setPages(next: string, previous: string) {
    this.nextPage = next;
    this.previousPage = previous;
  }
}
