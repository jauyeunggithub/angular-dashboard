import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.css'], // fixed typo
})
export class MapComponent implements OnInit {
  @Output() countrySelected = new EventEmitter<{ latitude: number; longitude: number }>();
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
          longitude: c.longitude ?? 0,
          latitude: c.latitude ?? 0,
        },
        popupTemplate: {},
      });

      this.view.graphics.add(graphic);
    });

    // Click listener: emit lat/lon instead of attributes
    this.view.on('click', (event) => {
      const mapPoint = event.mapPoint;
      this.countrySelected.emit({
        latitude: mapPoint.latitude,
        longitude: mapPoint.longitude,
      });
    });
  }
}
