import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class PopulationService {
  private popUrl = 'https://datahub.io/core/population/_r/data/population.csv';
  private countriesUrl =
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=world-administrative-boundaries&q=';

  constructor(private http: HttpClient) {}

  getCombinedData(): Observable<any[]> {
    const popData$ = this.http.get(this.popUrl, { responseType: 'text' });
    const countriesData$ = this.http.get(this.countriesUrl);

    return forkJoin([popData$, countriesData$]).pipe(
      map(([popCsv, countries]: any) => {
        const popJson = Papa.parse(popCsv, { header: true, skipEmptyLines: true }).data;
        const records = countries.records;

        return popJson
          .map((p: any) => {
            const country = records.find((c: any) => c.fields.iso3 === p['Country Code']);
            return country ? { ...p, ...country.fields } : null;
          })
          .filter(Boolean);
      })
    );
  }
}
