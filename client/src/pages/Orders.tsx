import { useState } from "react"
import { useStore } from "../services/store"
import { useNavigate } from "react-router-dom"

const ordersData = [
  {
    id: "#AB045861",
    customer: "Marilyn Store",
    type: "Store",
    from: "Bignay, Valenzuela",
    to: "BLK 1 LOT 5 APOLLO CMP. ALIBANGBANG ST., BRGY. 179 AMPARO",
    weight: "1,200 kg",
    eta: "12 Sep, 2025",
    coordinates: {
      long: 121.08068945,
      lat: 14.75457374,
    },
    status: "In Transit",
  },
  {
    id: "#BC022341",
    customer: " GOLDHORN STORE ",
    type: "Store",
    from: "Bignay, Valenzuela",
    to: "BRGY. 179, Caloocan City",
    weight: "650 kg",
    eta: "14 Oct, 2025",
    coordinates: {
      long: 121.07640319,
      lat: 14.74630339,
    },
    status: "Picked Up",
  },
  {
    id: "#BC022341",
    customer: " VEGGIE BLISS STORE",
    type: "Store",
    from: "Bignay, Valenzuela",
    to: "FLORIDA BLANCA ST. PH 1 DELA COSTA HOMES, BRGY. 179",
    weight: "650 kg",
    eta: "14 Oct, 2025",
    coordinates: {
      long: 121.07538347,
      lat: 14.74670967,
    },
    status: "Picked Up",
  },
  {
    id: "#BC022341",
    customer: "INDAY STORE ",
    type: "Store",
    from: "Bignay, Valenzuela",
    to: "24 MINDANAO ST., BRGY. PAYATAS B",
    weight: "650 kg",
    eta: "14 Oct, 2025",
    coordinates: {
      long: 121.06514561,
      lat: 14.74227812,
    },
    status: "Picked Up",
  },
]

// const statusStyles = {
//   "In Transit": "text-yellow-400",
//   "Picked Up": "text-blue-400",
//   Delivered: "text-green-400",
// }

const tabs = ["All", "Pending", "Responded", "Assigned", "Completed"]


const Orders = () => {

  const { setCoordinates } = useStore()
  const [activeTab, setActiveTab] = useState("Assigned")
  const navigate = useNavigate()

  const storeCoordinateHandler = (long: number, lat: number) => {
    console.log('test')
    setCoordinates(Number(long), Number(lat))
    navigate("/direction")
  }

  return (
    <div className="max-w-8xl mx-auto mt-10 bg-white rounded-2xl p-6 text-gray-950">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 overflow-x-scroll max-sm:flex-col max-sm:items-baseline">
        <h2 className="text-lg font-semibold">Orders</h2>

        <div className="flex items-center gap-2 bg-mainbg rounded-full p-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-full cursor-pointer transition
                ${activeTab === tab
                  ? "bg-[#e8e1c2] text-black"
                  : "text-white hover:text-sky-300"}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-3">Order ID</th>
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3 ">Route</th>
              <th className="text-left py-3">Weight</th>
              <th className="text-left py-3">ETA</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map(order => (
              <tr
                key={order.id}
                onClick={() =>
                  storeCoordinateHandler(
                    order.coordinates.long,
                    order.coordinates.lat
                  )
                }
                className="border-b border-gray-800 cursor-pointer transition hover:bg-gray-100"
              >
                <td className="py-4 flex items-center gap-2">
                   <span>{order.id}</span>
                </td>

                <td className="py-4">
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-xs text-gray-400">{order.type}</p>
                </td>

                <td className="py-4 whitespace-nowrap">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {order.from}
                  </p>
                  <p className="flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    {order.to}
                  </p>
                </td>

                <td className="py-4">{order.weight}</td>
                <td className="py-4">{order.eta}</td>
                <td className={`py-4 font-medium`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
