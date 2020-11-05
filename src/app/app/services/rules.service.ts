import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private COOKIE_KEY: string = 'RulesService';
  constructor() { }

  public getRules()
  {
    return 1
  }

  public setRules()
  {
    
  }
}
