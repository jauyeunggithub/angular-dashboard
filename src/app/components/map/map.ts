import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { PopulationRecord } from '../../models/population-record';
import { Country } from '../../models/country';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class MapComponent implements OnInit, OnChanges {
  @Output() countrySelected = new EventEmitter<{ latitude: number; longitude: number }>();
  @Input() populationData: PopulationRecord[] = [];
  @Input() countriesData: Country[] = [];
  view!: MapView;
  graphicsLayer!: GraphicsLayer;

  ngOnInit(): void {
    const map = new Map({ basemap: 'topo-vector' });

    this.view = new MapView({
      container: 'mapViewDiv',
      map,
      center: [0, 20],
      zoom: 2,
    });

    this.graphicsLayer = new GraphicsLayer();
    map.add(this.graphicsLayer);

    this.loadCountries();

    // Click listener for map
    this.view.on('click', (event) => {
      const mapPoint = event.mapPoint;
      this.countrySelected.emit({
        latitude: mapPoint.latitude,
        longitude: mapPoint.longitude,
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['countriesData'] && !changes['countriesData'].isFirstChange()) {
      this.loadCountries();
    }
  }

  loadCountries(): void {
    if (!this.countriesData || !this.view) return;

    // Clear existing graphics
    this.graphicsLayer.removeAll();

    this.countriesData.forEach((c) => {
      const geoShape = c.fields?.['geo_shape'];
      if (!geoShape) {
        return;
      }

      // Function to convert GeoJSON to ArcGIS geometry
      const convertGeoJSONToArcGIS = (geo: any) => {
        switch (geo.type) {
          case 'Point':
            return { type: 'point', longitude: geo.coordinates[0], latitude: geo.coordinates[1] };
          case 'MultiPoint':
            return { type: 'multipoint', points: geo.coordinates };
          case 'LineString':
            return { type: 'polyline', paths: [geo.coordinates] };
          case 'MultiLineString':
            return { type: 'polyline', paths: geo.coordinates };
          case 'Polygon':
            return { type: 'polygon', rings: geo.coordinates };
          case 'MultiPolygon':
            // Flatten into multiple Polygon graphics (one per polygon)
            return geo.coordinates.map((poly: any) => ({ type: 'polygon', rings: poly }));
          default:
            console.warn('Unsupported GeoJSON type:', geo.type);
            return null;
        }
      };

      const arcgisGeometry = convertGeoJSONToArcGIS(geoShape);

      if (!arcgisGeometry) return;

      // Handle MultiPolygon (array of polygons)
      const geometries = Array.isArray(arcgisGeometry) ? arcgisGeometry : [arcgisGeometry];

      geometries.forEach((geometry) => {
        const graphic = new Graphic({
          geometry,
          symbol: this.getSymbolForGeometryType(geometry.type),
          popupTemplate: {
            title: c.fields['Country Name'] || 'Country',
            content: `Population: ${c.fields['Value'] || 'N/A'}`,
          },
        });
        this.graphicsLayer.add(graphic);
      });
    });
  }

  // Helper function to return a default symbol based on geometry type
  getSymbolForGeometryType(type: string) {
    switch (type) {
      case 'point':
      case 'multipoint':
        return new SimpleMarkerSymbol({
          color: 'red',
          size: 8,
          outline: {
            color: 'white',
            width: 1,
          },
        });
      case 'polyline':
        return new SimpleLineSymbol({
          color: 'blue',
          width: 2,
        });
      case 'polygon':
        return new SimpleFillSymbol({
          color: [0, 0, 255, 0.3],
          outline: {
            color: [0, 0, 255, 0.8],
            width: 1,
          },
        });
      default:
        return null; // for unsupported types
    }
  }
}
