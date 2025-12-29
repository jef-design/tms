import { useState } from "react"
import { useStore } from "../services/store"
import { useNavigate } from "react-router-dom"
import Orders from "./Orders"

const stats = [
  {
    title: "Active Vehicles",
    value: "20",
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M3 13l2-5a2 2 0 012-1h10a2 2 0 012 1l2 5M5 13h14M5 13a2 2 0 100 4h1m12-4a2 2 0 110 4h-1" />
      </svg>
    ),
  },
  {
    title: "Total Deliveries",
    value: "15",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    icon: (
      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-8 5-8-5" />
      </svg>
    ),
  },
  {
    title: "On-Time Rate",
    value: "80.4%",
    bg: "bg-sky-50",
    iconBg: "bg-sky-100",
    icon: (
      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
  },
  {
    title: "Fuel Efficiency",
    value: "₱2,250",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M3 3h13v13H3zM16 7h3l2 2v7a2 2 0 01-2 2h-1" />
      </svg>
    ),
  },
]

const ListDeliveries = () => {
  const [long, setLong] = useState("")
  const [lat, setLat] = useState("")
  const navigate = useNavigate()
  const { setCoordinates } = useStore()

  const storeCoordinateHandler = () => {
    setCoordinates(Number(long), Number(lat))
    navigate("/direction")
  }

  return (
    <div className="max-w-[870px] mx-auto mt-8 space-y-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-xl p-4 flex items-center justify-between`}
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {item.value}
              </h2>
            </div>

            <div className={`${item.iconBg} p-2 rounded-lg`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Coordinate Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-600" htmlFor="long">
              Longitude
            </label>
            <input
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLong(e.target.value)}
              value={long}
              id="long"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-600" htmlFor="lat">
              Latitude
            </label>
            <input
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLat(e.target.value)}
              value={lat}
              id="lat"
              type="text"
            />
          </div>

          <button
            onClick={storeCoordinateHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-5 py-2 whitespace-nowrap transition"
          >
            Get Direction
          </button>
        </div>
      </div>
      <Orders/>
    </div>
  )
}

export default ListDeliveries
