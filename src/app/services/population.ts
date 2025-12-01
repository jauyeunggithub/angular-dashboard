import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class PopulationService {
  private popUrl = './population.csv';
  private countriesUrl =
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=world-administrative-boundaries&q=&rows=5000';

  constructor(private http: HttpClient) {}

  getPopulationData(): Observable<any[]> {
    return this.http
      .get(this.popUrl, { responseType: 'text' })
      .pipe(map((csv) => Papa.parse(csv, { header: true, skipEmptyLines: true }).data));
  }

  getCountriesData(): Observable<any[]> {
    return this.http.get<any>(this.countriesUrl).pipe(
      map((res) => res.records) // extract records array
    );
  }
}
