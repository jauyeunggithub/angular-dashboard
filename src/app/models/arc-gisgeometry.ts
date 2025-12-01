// Allowed geometry types
type GeometryType = 'point' | 'multipoint' | 'polyline' | 'polygon';

// Strongly typed ArcGIS geometries
interface ArcGISPoint {
  type: 'point';
  longitude: number;
  latitude: number;
}

interface ArcGISMultipoint {
  type: 'multipoint';
  points: number[][];
}

interface ArcGISPolyline {
  type: 'polyline';
  paths: number[][][];
}

interface ArcGISPolygon {
  type: 'polygon';
  rings: number[][][];
}

// Union type for all geometries
export type ArcGISGeometry = ArcGISPoint | ArcGISMultipoint | ArcGISPolyline | ArcGISPolygon;
