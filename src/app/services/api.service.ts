import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  dataJson: String = '../assets/data.json';
  constructor(
    private http: HttpClient,
  ) { }

  public get(): Observable<any> {
    return this.http.get(`${this.dataJson}`).pipe(map(res => res));
  }
}
