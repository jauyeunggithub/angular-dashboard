import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-info-card',
  imports: [CommonModule],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCardComponent {
  @Input() country: any;
  @Input() populationData: any[] = [];

  get latestPopulation(): number | null {
    if (!this.populationData?.length) {
      return null;
    }

    const sorted = [...this.populationData]
      .filter((c) => c['Country Code'] === this.country.fields.iso3)
      .sort((a, b) => b.Year - a.Year);
    return sorted[0].Value;
  }
}
