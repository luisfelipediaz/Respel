import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  private params: { [id: string]: ReplaySubject<any> } = {};

  constructor() { }

  setParam(key: string, value: any) {
    this.verificarYCrear(key);
    this.params[key].next(value);
  }

  private verificarYCrear(key: string) {
    if (this.params[key] === undefined) {
      this.params[key] = new ReplaySubject<any>(1);
      this.params[key].next(null);
    }
  }

  getParam(key: string): Observable<any> {
    this.verificarYCrear(key);
    return this.params[key];
  }
}
