import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../components/chart/chart';
import { MapComponent } from '../components/map/map';
import { InfoCardComponent } from '../components/info-card/info-card';
import { PopulationService } from '../services/population';
import type { EChartsOption } from 'echarts';
import { point, booleanPointInPolygon, simplify } from '@turf/turf';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ChartComponent, MapComponent, InfoCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], // fixed typo
})
export class DashboardComponent implements OnInit {
  populationData: any[] = [];
  countriesData: any;
  selectedCountry: any;
  chartOption: EChartsOption = {};

  constructor(private popService: PopulationService) {}

  ngOnInit(): void {
    this.popService.getPopulationData().subscribe((data) => {
      this.populationData = data;
    });

    this.popService.getCountriesData().subscribe((data) => {
      this.countriesData = data;
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
      title: { text: `Population of ${this.selectedCountry.fields.name}` },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: years },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: values }],
    };
  }

  /** Called from MapComponent when map is clicked */
  onCountrySelected(click: { latitude: number; longitude: number }): void {
    const clickedPoint = point([click.longitude, click.latitude]);

    // Find the first country whose geo_shape contains the clicked point
    const country = this.countriesData.find((c: any) => {
      if (!c.fields.geo_shape) {
        return false;
      }
      return booleanPointInPolygon(clickedPoint.geometry, c.fields.geo_shape);
    });

    if (country) {
      this.selectedCountry = country;
      this.setupChart();
      console.log('Clicked country:', country.fields.name);
    }
  }
}
