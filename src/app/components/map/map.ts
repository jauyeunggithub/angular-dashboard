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

    // Add graphics
    this.populationData.forEach((c) => {
      const graphic = new Graphic({
        geometry: {
          type: 'point',
          longitude: c.longitude || 0,
          latitude: c.latitude || 0,
        },
        attributes: { name: c.name, population: c.Value },
        popupTemplate: {
          title: '{name}',
          content: 'Population: {population}',
        },
      });

      this.view.graphics.add(graphic);
    });

    // Click listener using hitTest
    this.view.on('click', async (event) => {
      const hit = await this.view.hitTest(event);

      // Filter results that actually have a graphic
      const graphicHit = hit.results
        .map((r: any) => r.graphic) // r may be any type
        .filter((g: any): g is Graphic => !!g);

      if (graphicHit.length > 0) {
        this.countrySelected.emit(graphicHit[0].attributes);
      }
    });
  }
}
