import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
@Component({
  selector: 'app-chart',
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class ChartComponent {
  @Input() chartOption: EChartsOption = {};
  @Output() countrySelected = new EventEmitter<string>();

  onChartClick(event: any) {
    if (event?.name) this.countrySelected.emit(event.name);
  }
}
