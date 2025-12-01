type GeometryType = 'point' | 'multipoint' | 'polyline' | 'polygon';

interface ArcGISGeometry {
  type: GeometryType;
  longitude?: number;
  latitude?: number;
  points?: number[][];
  paths?: number[][][];
  rings?: number[][][];
  coordinates: number[] | number[][] | number[][][];
}
