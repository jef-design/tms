import Map, { FullscreenControl, Marker } from 'react-map-gl/mapbox';
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStore } from '../services/store';
import { useEffect, useState } from 'react';

const MapDirection = () => {
  const { longitude, latitude } = useStore()
  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | any>(null);

  console.log(userLocation)
  useEffect(() => {
    // const response = fetch('https://ipapi.co/json')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     dispatch(storeUpdatedLocation({longitude: data?.longitude,latitude: data?.latitude}))
    //     // dispatch(storePlaceLocation(`${data.country_capital},${data.country_name}`))
    //   })

    const getCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { longitude, latitude } = position.coords;
          setUserLocation({ longitude, latitude });

        },
        error => {
          console.error('Error getting coordinates:', error);
        }
      );
    };
    getCoordinates();

  }, [])

  return (
    <>
      <div className='mx-auto w-full'>
        <Map
          mapboxAccessToken="pk.eyJ1IjoiamVwcHAiLCJhIjoiY2xsMDc3d2ppMDRzYjNxbXlubDA3NzVibCJ9.AxgzM3fm0IkZR5WlQ_IOMg"
          initialViewState={{
            longitude: longitude,
            latitude: latitude,
            zoom: 16
          }}
          //
          style={{ width: "100%", height: "500px" }}
          // mapStyle="mapbox://styles/jeppp/cll0i6qb7003z01r841kb8h1t"
          mapStyle="mapbox://styles/mapbox/streets-v11"

        >
          <FullscreenControl />
          <Marker color='red' longitude={longitude} latitude={latitude}></Marker>
          <Marker color='blue' longitude={userLocation?.longitude ?? 0} latitude={userLocation?.latitude ?? 0}></Marker>
        </Map>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() =>
            window.open(
              "https://www.google.com/maps/dir/?api=1&destination=121.08460684,14.68503197&travelmode=driving",
              "_blank"
            )
          }
          className=' text-center rounded-md bg-mainbg hover mt-4 cursor-pointer w-34 py-2 px-6 text-white'>Start</button>
      </div>
    </>
  );
}
export default MapDirection