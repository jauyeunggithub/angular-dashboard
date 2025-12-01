import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../components/chart/chart';
import { MapComponent } from '../components/map/map';
import { InfoCardComponent } from '../components/info-card/info-card';
import { PopulationService } from '../services/population';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ChartComponent, MapComponent, InfoCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  populationData: any[] = [];
  selectedCountry: any;
  chartOption: EChartsOption = {};

  constructor(private popService: PopulationService) {}

  ngOnInit(): void {
    this.popService.getCombinedData().subscribe((data) => {
      this.populationData = data;
      this.selectedCountry = this.populationData[0];
      this.setupChart();
    });
  }

  setupChart(): void {
    if (!this.selectedCountry) return;

    const countryData = this.populationData.filter(
      (c) => c['Country Code'] === this.selectedCountry['Country Code']
    );
    const years = countryData.map((c) => c.Year);
    const values = countryData.map((c) => Number(c.Value));

    this.chartOption = {
      title: { text: `Population of ${this.selectedCountry.name}` },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: years },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: values }],
    };
  }

  onCountrySelected(country: any): void {
    this.selectedCountry = country;
    this.setupChart();
  }
}
