import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapComponent implements OnInit {
  @Output() countrySelected = new EventEmitter<any>();
  @Input() populationData: any[] = [];
  view!: MapView;

  ngOnInit(): void {
    const map = new Map({ basemap: 'topo-vector' });
    this.view = new MapView({
      container: 'mapViewDiv',
      map,
      center: [0, 20],
      zoom: 2,
    });

    this.loadCountries();
  }

  loadCountries(): void {
    if (!this.populationData) return;

    this.populationData.forEach((c) => {
      const graphic = new Graphic({
        geometry: { type: 'point', longitude: c.longitude || 0, latitude: c.latitude || 0 },
        attributes: { name: c.name, population: c.Value },
        popupTemplate: { title: '{name}', content: 'Population: {population}' },
      });

      this.view.graphics.add(graphic);
      graphic.on('click', () => this.countrySelected.emit(c));
    });
  }
}
