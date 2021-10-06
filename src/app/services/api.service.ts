import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private server = environment.server;

  constructor(private http: HttpClient) { }

  getForecast() {
    return firstValueFrom(this.http.get(`${this.server}/conagua`));
  }
}
