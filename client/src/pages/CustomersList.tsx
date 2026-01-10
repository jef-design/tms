import { useEffect, useState, type SyntheticEvent } from "react"
import { useStore } from "../services/store"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { RiFileExcel2Line } from "react-icons/ri"
import { Oval } from 'react-loader-spinner'

const tabs = ["All", "Pending", "Responded", "Assigned", "Completed"]

const CustomersList = () => {

  const { setCoordinates } = useStore()
  const [activeTab, setActiveTab] = useState("Assigned")
  const navigate = useNavigate()
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("query") || ""
  );

  // Sync input -> URL
  useEffect(() => {
    if (search) {
      setSearchParams({ query: search });
    } else {
      setSearchParams({});
    }
  }, [search, setSearchParams]);

  const { data: ordersData } = useQuery({
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
  const storeCoordinateHandler = (id: any, long: number, lat: number) => {

    setCoordinates(Number(long), Number(lat))
    navigate(`/customer/info/${id}`)
  }
  //search customer handler
  const searchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const downloadExcel = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/upload/customers/export",
      {
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");

    link.href = url;
    link.download = "customer.xlsx";
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-8xl mx-4 mt-10 bg-white rounded-2xl p-6 text-gray-950">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 overflow-x-scroll max-sm:flex-col max-sm:items-baseline">
        <h2 className="text-lg font-semibold">Customers</h2>
        <div>
          <button onClick={downloadExcel} className="bg-green-400 flex cursor-pointer items-center gap-1 text-xs text-white p-2 rounded-sm">
            <RiFileExcel2Line className="text-base" />
            EXPORT EXCEL
            {/* <Oval
              height={20}
              width={20}
              color="green"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> */}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-gray-900 rounded-full p-1">
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
        <div className="">
          <input
            onChange={searchCustomer}
            className="border p-2 rounded-sm w-[16rem]" type="text" placeholder="Search Customer" />
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
