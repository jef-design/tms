// import { useState } from "react"
// import { useStore } from "../services/store"
// import { useNavigate } from "react-router-dom"
import Orders from "./CustomersList"

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

  return (
    <div className="max-w-[970px] mx-auto mt-8 space-y-6">
      
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

      <Orders/>
    </div>
  )
}

export default ListDeliveries
