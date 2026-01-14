import { FaPeopleGroup } from "react-icons/fa6";
import Orders from "./CustomersList"


const ListDeliveries = () => {

  return (
    <div className="max-w-[1200px] mx-auto mt-8 space-y-6">

      {/* Stats Cards */}
      <div className="grid bg-white p-2 mx-6 rounded-2xl grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
          {/* Active Vehicles */}
          <div className="bg-indigo-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Vehicles</p>
              <h2 className="text-xl font-semibold text-gray-800">20</h2>
            </div>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M3 13l2-5a2 2 0 012-1h10a2 2 0 012 1l2 5M5 13h14M5 13a2 2 0 100 4h1m12-4a2 2 0 110 4h-1" />
              </svg>
            </div>
          </div>

          {/* Total Deliveries */}
          <div className="bg-orange-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Deliveries</p>
              <h2 className="text-xl font-semibold text-gray-800">15</h2>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-8 5-8-5" />
              </svg>
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-sky-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <h2 className="text-xl font-semibold text-gray-800">9,210</h2>
            </div>
            <div className="bg-sky-100 p-2 rounded-lg">
             <FaPeopleGroup />
            </div>
          </div>

          {/* Fuel Efficiency */}
          <div className="bg-emerald-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fuel Efficiency</p>
              <h2 className="text-xl font-semibold text-gray-800">₱2,250</h2>
            </div>
            <div className="bg-emerald-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M3 3h13v13H3zM16 7h3l2 2v7a2 2 0 01-2 2h-1" />
              </svg>
            </div>
          </div>

        

      </div>

      <Orders />
    </div>
  )
}

export default ListDeliveries
