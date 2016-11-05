import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {Http} from "@angular/http";
import {User} from "./user";
import {ApiResponse} from "./api-response";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private baseAPIUrl = "https://icangopmg-develop.azurewebsites.net/api/v1/users";

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    console.log("baseAPIUrl -> ", this.baseAPIUrl);
    return Promise.resolve(HEROES);
  }

  getUsers(): Promise<User[]> {
    console.log("baseAPIUrl -> ", this.baseAPIUrl);
    return this.http.get(this.baseAPIUrl)
      .toPromise()
      .then(response => response.json().data as ApiResponse )
      .catch(this.handleError)
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000))
      .then(() => this.getHeroes()
    );
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
