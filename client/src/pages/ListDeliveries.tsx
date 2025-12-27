import { useState } from "react"
import { useStore } from "../services/store"
import { useNavigate } from "react-router-dom"

const ListDeliveries = () => {
  const [long, setLong] = useState('')
  const [lat, setLat] = useState('')
  const navigate = useNavigate()
  const { setCoordinates } = useStore()

  const storeCoordinateHandler = () => {
    setCoordinates(Number(long), Number(lat))
    navigate('/direction')
    console.log('saved to store')
  }

  return (
    <div className="max-w-[870px] mx-auto mt-6 bg-primary rounded-md p-6">
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="long">Longitude</label>
          <input className="border rounded-sm" onChange={(e) => setLong(e.target.value)} value={long} id="long" type="text" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="lat">Latitude</label>
          <input className="border rounded-sm" onChange={e => setLat(e.target.value)} value={lat} id="lat" type="text" />
        </div>
        <div>

          <button onClick={storeCoordinateHandler} className="bg-blue-500 whitespace-nowrap text-white rounded-sm p-1.5 mt-2 cursor-pointer">
            Get Direction</button>
        </div>
      </div>
     <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="long">Longitude</label>
          <input className="border rounded-sm" onChange={(e) => setLong(e.target.value)} value={long} id="long" type="text" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="lat">Latitude</label>
          <input className="border rounded-sm" onChange={e => setLat(e.target.value)} value={lat} id="lat" type="text" />
        </div>
        <div>

          <button onClick={storeCoordinateHandler} className="bg-blue-500 whitespace-nowrap text-white rounded-sm p-1.5 mt-2 cursor-pointer">
            Get Direction</button>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="long">Longitude</label>
          <input className="border rounded-sm" onChange={(e) => setLong(e.target.value)} value={long} id="long" type="text" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="lat">Latitude</label>
          <input className="border rounded-sm" onChange={e => setLat(e.target.value)} value={lat} id="lat" type="text" />
        </div>
        <div>

          <button onClick={storeCoordinateHandler} className="bg-blue-500 whitespace-nowrap text-white rounded-sm p-1.5 mt-2 cursor-pointer">
            Get Direction</button>
        </div>
      </div>
    </div>
  )
}

export default ListDeliveries
