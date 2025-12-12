import Map from 'react-map-gl/mapbox';
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import 'mapbox-gl/dist/mapbox-gl.css';

 const MapDirection = () => {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiamVwcHAiLCJhIjoiY2xsMDc3d2ppMDRzYjNxbXlubDA3NzVibCJ9.AxgzM3fm0IkZR5WlQ_IOMg"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}
export default MapDirection