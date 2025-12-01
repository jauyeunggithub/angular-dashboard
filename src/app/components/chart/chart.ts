import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { Country } from '../../models/country';

@Component({
  selector: 'app-chart',
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
  providers: [{ provide: NGX_ECHARTS_CONFIG, useValue: { echarts } }],
})
export class ChartComponent {
  @Input() chartOption: EChartsOption = {};
  @Output() countrySelected = new EventEmitter<Country>();
}
