import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private http: HttpClient) {}

  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  // BehaviorSubjects to be able to subscribe to the data
  private pokeSource = new BehaviorSubject(null);
  private singlePokeSource = new BehaviorSubject(null);
  public pokeData = this.pokeSource.asObservable();
  public singlePokeData = this.singlePokeSource.asObservable();
  private nextPage: string;
  private previousPage: string;

  /**
   * getMainPokeList
   * Fetches data from pokeApi, updates pokeSource BehaviorSubject with data
   */
  public getMainPokeList() {
    this.http
      .get(`${this.pokeApiUrl}`, {
        headers: { header: 'Access-Control-Allow-Origin' },
      })
      .subscribe((data: any) => {
        this.pokeSource.next(data);
        this.setPages(data.next, data.previous);
      });
  }

  /**
   * getSinglePokeData
   * @param name
   * Fetches data from pokeApi, updates singlePokeSource BehaviorSubject with data
   */
  public getSinglePokeData(name: string) {
    this.http
      .get(`${this.pokeApiUrl}${name}`, {
        headers: { header: 'Access-Control-Allow-Origin' },
      })
      .subscribe((data) => {
        this.singlePokeSource.next(data);
      });
  }

  /**
   * updatePokeData
   * Return data from pokeData Observable
   */
  public updatePokeData() {
    return this.pokeData;
  }
  /**
   * updateSinglePokeData
   * Return data from singlePokeData Observable
   */
  public updateSinglePokeData() {
    return this.singlePokeData;
  }

  /**
   * getNextPageList
   * Takes nextpage pagination save from initial fetch, using that to fetch next list of pokemon
   */
  public getNextPageList() {
    if (this.nextPage) {
      this.http
        .get(`${this.nextPage}`, {
          headers: { header: 'Access-Control-Allow-Origin' },
        })
        .subscribe((data: any) => {
          this.pokeSource.next(data);
          this.setPages(data.next, data.previous);
        });
    } else {
      console.log('no next page');
    }
  }

  /**
   * getPreviousPageList
   * Takes previouspage pagination save from initial fetch, using that to fetch previous list of pokemon
   */
  public getPreviousPageList() {
    if (this.previousPage) {
      this.http
        .get(`${this.previousPage}`, {
          headers: { header: 'Access-Control-Allow-Origin' },
        })
        .subscribe((data: any) => {
          this.pokeSource.next(data);
          this.setPages(data.next, data.previous);
        });
    } else {
      console.log('no previous page');
    }
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
