import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  static KEY: string = 'app:'

  constructor() {

  }

  store(key: string, value: string) {
    if (!key) {
      return
    }
    localStorage.setItem(`${StoreService.KEY}${key}`, value)
  }

  get(key: string) {
    return localStorage.getItem(`${StoreService.KEY}${key}`)
  }

  remove(key: string) {
    return localStorage.removeItem(`${StoreService.KEY}${key}`)
  }

}
