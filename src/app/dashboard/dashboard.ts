import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../components/chart/chart';
import { MapComponent } from '../components/map/map';
import { InfoCardComponent } from '../components/info-card/info-card';
import { PopulationService } from '../services/population';
import type { EChartsOption } from 'echarts';
import { Country } from '../models/country';
import { PopulationRecord } from '../models/population-record';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ChartComponent, MapComponent, InfoCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], // fixed typo
})
export class DashboardComponent implements OnInit {
  populationData: PopulationRecord[] = [];
  countriesData: Country[] = [];
  selectedCountry: Country = {} as Country;
  chartOption: EChartsOption = {};

  constructor(private popService: PopulationService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.popService.getPopulationData().subscribe((data) => {
      this.populationData = data;
      this.cd.detectChanges();
    });

    this.popService.getCountriesData().subscribe((data) => {
      this.countriesData = data;
      this.cd.detectChanges();
    });
  }

  setupChart(): void {
    if (!this.selectedCountry) return;

    const countryData = this.populationData.filter(
      (c) => c['Country Code'] === this.selectedCountry.fields.iso3
    );
    const years = countryData.map((c) => c.Year);
    const values = countryData.map((c) => Number(c.Value));

    this.chartOption = {
      title: { text: `Population of ${this.selectedCountry.fields['name']}` },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: years },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: values }],
    };
  }

  /** Called from MapComponent when map is clicked */
  onCountrySelected(country: Country): void {
    if (country) {
      this.selectedCountry = country;
      this.setupChart();
      console.log('Clicked country:', country.fields['name']);
    }
  }
}
