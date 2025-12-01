import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopulationRecord } from '../../models/population-record';
import { Country } from '../../models/country';
@Component({
  selector: 'app-info-card',
  imports: [CommonModule],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCardComponent {
  @Input() country: Country = {} as Country;
  @Input() populationData: PopulationRecord[] = [];

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
