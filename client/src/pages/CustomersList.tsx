import { useState } from "react"
import { useStore } from "../services/store"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// const ordersData = [
//   {
//     id: "#AB045861",
//     customer: "Marilyn Store",
//     type: "Store",
//     from: "Bignay, Valenzuela",
//     to: "BLK 1 LOT 5 APOLLO CMP. ALIBANGBANG ST., BRGY. 179 AMPARO",
//     weight: "1,200 kg",
//     eta: "12 Sep, 2025",
//     coordinates: {
//       long: 121.08068945,
//       lat: 14.75457374,
//     },
//     status: "In Transit",
//   },
//   {
//     id: "#BC022341",
//     customer: " GOLDHORN STORE ",
//     type: "Store",
//     from: "Bignay, Valenzuela",
//     to: "BRGY. 179, Caloocan City",
//     weight: "650 kg",
//     eta: "14 Oct, 2025",
//     coordinates: {
//       long: 121.07640319,
//       lat: 14.74630339,
//     },
//     status: "Picked Up",
//   },
//   {
//     id: "#BC022342",
//     customer: " VEGGIE BLISS STORE",
//     type: "Store",
//     from: "Bignay, Valenzuela",
//     to: "FLORIDA BLANCA ST. PH 1 DELA COSTA HOMES, BRGY. 179",
//     weight: "650 kg",
//     eta: "14 Oct, 2025",
//     coordinates: {
//       long: 121.07538347,
//       lat: 14.74670967,
//     },
//     status: "Picked Up",
//   },
//   {
//     id: "#BC022343",
//     customer: "INDAY STORE ",
//     type: "Store",
//     from: "Bignay, Valenzuela",
//     to: "24 MINDANAO ST., BRGY. PAYATAS B",
//     weight: "650 kg",
//     eta: "14 Oct, 2025",
//     coordinates: {
//       long: 121.06514561,
//       lat: 14.74227812,
//     },
//     status: "Picked Up",
//   },
// ]

// const statusStyles = {
//   "In Transit": "text-yellow-400",
//   "Picked Up": "text-blue-400",
//   Delivered: "text-green-400",
// }

const tabs = ["All", "Pending", "Responded", "Assigned", "Completed"]


const CustomersList = () => {

  const { setCoordinates } = useStore()
  const [activeTab, setActiveTab] = useState("Assigned")
  const navigate = useNavigate()

  const [statuses, setStatuses] = useState(
   
  )
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-yellow-100 text-yellow-700"
      case "Picked Up":
        return "bg-blue-100 text-blue-700"
      case "Completed":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }
  const STATUS_OPTIONS = [
    "In Transit",
    "Picked Up",
    "Completed",
  ]
  const {data: ordersData} = useQuery({
    queryKey: ['getcustomers'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/upload/customers')
        return response.data
      } catch (error) {
        
      }
    }
  })
console.log(ordersData)
  const storeCoordinateHandler = (id: any,long: number, lat: number) => {
    
    setCoordinates(Number(long), Number(lat))
    navigate(`/customer/info/${id}`)
  }

  return (
    <div className="max-w-8xl mx-4 mt-10 bg-white rounded-2xl p-6 text-gray-950">

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
          {/* TABLE HEADER (Hidden on Mobile) */}
          <thead className="hidden md:table-header-group">
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-3">Customer ID</th>
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Contact No.</th>
              <th className="text-left py-3">Salesman</th>
              <th className="text-left py-3">Longitude</th>
              <th className="text-left py-3">Latitude</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {ordersData?.customers?.map((order: any) => (
              <tr
                key={order.customer_code}
                onClick={() =>
                  storeCoordinateHandler(
                    order.customer_code,
                    order.longitude,
                    order.latitude
                  )
                }
                className="
            block md:table-row
            border border-gray-200 md:border-0
            rounded-lg md:rounded-none
            mb-4 md:mb-0
            cursor-pointer
            hover:bg-gray-100
            p-4 md:p-0
          "
              >
                {/* Order ID */}
                <td
                  data-label="Order ID"
                  className="block md:table-cell py-2 md:py-4 font-semibold"
                >
                  {order.customer_code}
                </td>

                {/* Customer */}
                <td
                  data-label="Customer"
                  className="block md:table-cell py-2 md:py-4"
                >
                  <p className="font-medium">{order.customer_name}</p>
                  <p className="text-xs text-gray-400">{order.type}</p>
                </td>
                <td
                  data-label="Customer"
                  className="block md:table-cell py-2 md:py-4"
                >
                  <p className="font-medium">{order.contact}</p>
                  <p className="text-xs text-gray-400">{order.type}</p>
                </td>
                <td
                  data-label="Customer"
                  className="block md:table-cell py-2 md:py-4"
                >
                  <p className="font-medium">{order.salesman}</p>
                  <p className="text-xs text-gray-400">{order.type}</p>
                </td>
                <td
                  data-label="Customer"
                  className="block md:table-cell py-2 md:py-4"
                >
                  <p className="font-medium">{order.longitude}</p>
                  <p className="text-xs text-gray-400">{order.type}</p>
                </td>
                <td
                  data-label="Customer"
                  className="block md:table-cell py-2 md:py-4"
                >
                  <p className="font-medium">{order.latitude}</p>
                  <p className="text-xs text-gray-400">{order.type}</p>
                </td>

                {/* ETA */}
                <td
                  data-label="ETA"
                  className="block md:table-cell py-2 md:py-4"
                >
                  {order.taggingStatus}
                </td>

                {/* Status */}
                <td
                  data-label="Status"
                  className="block md:table-cell py-2 md:py-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* <select
                    value={statuses[order.id]}
                    onChange={(e) =>
                      setStatuses(prev => ({
                        ...prev,
                        [order.id]: e.target.value,
                      }))
                    }
                    className={`
      w-full md:w-auto
      rounded-md px-3 py-1.5 text-sm font-medium
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${getStatusStyle(statuses[order.id])}
    `}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select> */}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default CustomersList
