import { useEffect, useRef } from 'react'
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapRef = useRef<MapboxMap | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamVwcHAiLCJhIjoiY2xsMDc3d2ppMDRzYjNxbXlubDA3NzVibCJ9.AxgzM3fm0IkZR5WlQ_IOMg'

    if (!mapContainerRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [120.9608436, 14.67559411],
      zoom: 50,
      style: 'mapbox://styles/mapbox/streets-v11'
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  return (
    <div>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  )
}

export default Map
