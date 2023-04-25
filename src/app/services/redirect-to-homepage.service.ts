import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectToHomepageService {
  selectedTabIndexSource = new BehaviorSubject<number>(0);

  constructor() {}
}
