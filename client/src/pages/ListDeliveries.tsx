import { useState } from "react"
import Map from "../components/Map"

const ListDeliveries = () => {
    const [long, setLong] = useState('')
    const [lat, setLat] = useState('')

    console.log(long, lat)

  return (
    <div className="max-w-[570px] mx-auto mt-6">
      <div className="flex flex-col">
         <label htmlFor="long">Longitude</label>
        <input className="border rounded-sm" onChange={(e) => setLong(e.target.value)} value={long} id="long" type="text"/>
      </div>
       <div className="flex flex-col">
        <label htmlFor="lat">Latitude</label>
        <input className="border rounded-sm" onChange={e => setLat(e.target.value)} value={lat} id="lat" type="text"/>
      </div>
      <div>
        <button className="bg-blue-500 text-white rounded-sm p-1.5 mt-2 cursor-pointer">Direction</button>
      </div>
      <div>
        <Map/>
      </div>
    </div>
  )
}

export default ListDeliveries
