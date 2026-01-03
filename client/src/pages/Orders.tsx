import { useState } from "react"

const ordersData = [
  {
    id: "#AB045861",
    customer: "TNA Groups",
    type: "Electronics",
    from: "Bignay, Valenzuela",
    to: "Quezon City",
    weight: "1,200 kg",
    eta: "12 Sep, 2025",
    status: "In Transit",
  },
  {
    id: "#BC022341",
    customer: "Gravitas LLC",
    type: "Logistics",
    from: "Bignay, Valenzuela",
    to: "Quezon City",
    weight: "650 kg",
    eta: "14 Oct, 2025",
    status: "Picked Up",
  },
  {
    id: "#AB045863",
    customer: "BVI GROUP",
    type: "Telecom",
    from: "Bignay, Valenzuela",
    to: "Quezon City",
    weight: "1,352 kg",
    eta: "25 Oct, 2025",
    status: "Delivered",
  },
  {
    id: "#CA012341",
    customer: "MEGAONE",
    type: "Sports",
    from: "Bignay, Valenzuela",
    to: "Quezon City",
    weight: "45 kg",
    eta: "05 Oct, 2025",
    status: "In Transit",
  },
]

// const statusStyles = {
//   "In Transit": "text-yellow-400",
//   "Picked Up": "text-blue-400",
//   Delivered: "text-green-400",
// }

const tabs = ["All", "Pending", "Responded", "Assigned", "Completed"]

const Orders = () => {
  const [activeTab, setActiveTab] = useState("Assigned")

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl p-6 text-gray-950">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Orders</h2>

        <div className="flex items-center gap-2 bg-mainbg rounded-full p-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-full transition
                ${activeTab === tab
                  ? "bg-[#e8e1c2] text-black"
                  : "text-white hover:text-mainbg"}
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
              <th className="text-left py-3">Route</th>
              <th className="text-left py-3">Weight</th>
              <th className="text-left py-3">ETA</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map(order => (
              <tr
                key={order.id}
                className="border-b border-gray-800 cursor-pointer transition"
              >
                <td className="py-4 flex items-center gap-2">
                  🚚 <span>{order.id}</span>
                </td>

                <td className="py-4">
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-xs text-gray-400">{order.type}</p>
                </td>

                <td className="py-4">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    {order.from}
                  </p>
                  <p className="flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
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
