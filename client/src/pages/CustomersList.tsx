import {useEffect, useState} from "react";
import {useStore} from "../services/store";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RiFileExcel2Line} from "react-icons/ri";
import {useDebounce} from "../hooks/useDebounce";
import {axiosInstance} from "../services/axiosInstance";
import CustomerTaggedStatus from "../components/CustomerTaggedStatus";
import Pagination from "../layout/Pagination";
import Loading from "../components/Loading";
import type {AxiosError} from "axios";
import { toast, Toaster } from "sonner";

 type SelectedRemark = {
        customer_code: string;
        remarks: string;
    } | null;

const CustomersList = () => {
    const queryClient = useQueryClient()
    const {setCoordinates} = useStore();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
   

    const [selectedRemark, setSelectedRemark] = useState<SelectedRemark>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState<string>(searchParams.get("query") || "");

    const debouncedSearch = useDebounce(search);

    // });
    const { data: customerFilteredData, isLoading } = useQuery({
    queryKey: ["customers", debouncedSearch, page],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/customer/filter", {
        params: {
          page,
          search: debouncedSearch || undefined, // send search only if not empty
        },
      });
      return res.data;
    },// keeps previous page data while loading next page
  });
    // Sync input -> URL
    useEffect(() => {
        if (search) {
            setSearchParams({query: search});
        } else {
            setSearchParams({});
        }
    }, [search, setSearchParams]);

    const storeCoordinateHandler = (id: any, long: number, lat: number) => {
        setCoordinates(Number(long), Number(lat));
        navigate(`/customer/info/${id}`);
    };
    //search customer handler
    const searchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    // const downloadExcel = async () => {
    //     const response = await axiosInstance.get("/api/upload/customers/export", {
    //         responseType: "blob",
    //     });

    //     const url = window.URL.createObjectURL(response.data);
    //     const link = document.createElement("a");

    //     link.href = url;
    //     link.download = "customer.xlsx";
    //     link.click();

    //     window.URL.revokeObjectURL(url);
    // };

    // PAGINATION HANDLING

    const useDownloadExcel = () => {
        return useMutation<Blob, AxiosError>({
            mutationKey: ["downloadCustomersExcel"],
            mutationFn: async () => {
                const response = await axiosInstance.get("/api/upload/customers/export", {
                    responseType: "blob",
                });
                return response.data;
            },
            onError: (error) => {
                console.error("Download failed:", error.message);
                toast.success("Failed to download Excel. Please try again.");
            },
            onSuccess: (data) => {
                const url = window.URL.createObjectURL(data);
                const link = document.createElement("a");
                link.href = url;
                link.download = "customer.xlsx";
                link.click();
                window.URL.revokeObjectURL(url);
                toast.success("Customer tagging exported")
            },
        });
    };
    const downloadMutation = useDownloadExcel();
    
    const pageHandler = (page: number) => {
        setPage(page);
    };

    const {mutate: remarkMutation, isPending} = useMutation({
        mutationKey: ["addRemarks"],
        mutationFn: async (payload: {customer_code: string; remarks: string}) => {
            const res = await axiosInstance.patch("/api/customer/remarks", payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getlists"] })
        }
    });
    
    const handleRemarkChange = (customerId: string, remark: string) => {
        const payload = {customer_code: customerId, remarks: remark};

        // update UI immediately
        setSelectedRemark(payload);

        // save to backend
        remarkMutation(payload);
    };

    return (
        <div className='mt-6 mx-6 bg-white rounded-2xl p-6 text-gray-950'>
            {(isPending || downloadMutation.isPending || isLoading) && (<Loading message={downloadMutation.isPending ? `Exporting Customers data...` : `Please wait...`} />)}
         <Toaster 
         richColors
         position="top-center"
         />
            <div className='flex items-center justify-between mb-6  max-sm:items-baseline'>
                <div className=''>
                    <div className='text-lg font-semibold'>Customers</div>
                    <div>
                        <span className='text-gray-500'>Total </span>
                        {customerFilteredData?.totalCustomer}
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => downloadMutation.mutate()}
                        className='bg-green-400 flex cursor-pointer items-center gap-1 text-xs text-white p-2 rounded-sm'
                    >
                        <RiFileExcel2Line className='text-base' />
                        EXPORT EXCEL
                    </button>
                </div>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <div className=''>
                    <input
                    value={search}
                        onChange={searchCustomer}
                        className='border p-2 text-xs rounded-sm w-[18rem]'
                        type='text'
                        placeholder='Search Customer by CustCode, Name, Salesman'
                    />
                </div>
            </div>
            {/* Table */}
            <div className='overflow-x-scroll mt-2'>
                {customerFilteredData?.list?.length === 0 ? (
                    <div className="py-2 flex justify-center">
                        <p>No Results found.</p>
                    </div>
                ): (
                    <table className='w-full text-sm'>
                    {/* TABLE HEADER (Hidden on Mobile) */}
                    <thead className='hidden md:table-header-group'>
                        <tr className='text-gray-400 border-b border-gray-700'>
                            <th className='text-left py-3'>Customer ID</th>
                            <th className='text-left py-3'>Customer</th>
                            <th className='text-left py-3'>Contact No.</th>
                            <th className='text-left py-3'>Salesman</th>
                            <th className='text-left py-3'>Longitude</th>
                            <th className='text-left py-3'>Latitude</th>
                            <th className='text-left py-3'>Tagged Status</th>
                            <th className='text-left py-3'>Remarks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customerFilteredData?.list?.map((order: any) => (
                            <tr
                                key={order.customer_code}
                                onClick={() =>
                                    storeCoordinateHandler(order.customer_code, order.longitude, order.latitude)
                                }
                                className='
            block md:table-row
            border border-gray-200 md:border-0
            rounded-lg md:rounded-none
            mb-4 md:mb-0
            cursor-pointer
            hover:bg-gray-100
            p-4 md:p-0
          '
                            >
                                {/* Order ID */}
                                <td data-label='Order ID' className='block md:table-cell py-2 md:py-3 font-semibold'>
                                    {order.customer_code}
                                </td>

                                {/* Customer */}
                                <td data-label='Customer' className='block md:table-cell py-2 md:py-2'>
                                    <p className='font-medium'>{order.customer_name}</p>
                                    <p className='text-xs text-gray-400'>{order.type}</p>
                                </td>
                                <td data-label='Customer' className='block md:table-cell py-2 md:py-2'>
                                    <p className='font-medium'>{order.contact}</p>
                                    <p className='text-xs text-gray-400'>{order.type}</p>
                                </td>
                                <td data-label='Customer' className='block md:table-cell py-2 md:py-2'>
                                    <p className='font-medium'>{order.salesman}</p>
                                    <p className='text-xs text-gray-400'>{order.type}</p>
                                </td>
                                <td data-label='Customer' className='block md:table-cell py-2 md:py-2'>
                                    <p className='font-medium'>{order.longitude}</p>
                                    <p className='text-xs text-gray-400'>{order.type}</p>
                                </td>
                                <td data-label='Customer' className='block md:table-cell py-2 md:py-2'>
                                    <p className='font-medium'>{order.latitude}</p>
                                    <p className='text-xs text-gray-400'>{order.type}</p>
                                </td>

                                {/* ETA */}
                                <td data-label='ETA' className='block md:table-cell py-2 md:py-2'>
                                    <CustomerTaggedStatus status={order.taggingStatus} />
                                </td>

                                {/* Status */}
                                <td
                                    data-label='Remarks'
                                    className='block md:table-cell py-2 md:py-2'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <select
                                        value={
                                            selectedRemark?.customer_code === order.customer_code
                                                ? selectedRemark?.remarks
                                                : order.remarks ?? ""
                                        }
                                        onChange={(e) => handleRemarkChange(order.customer_code, e.target.value)}
                                        className='text-xs px-2 py-1 rounded border'
                                    >
                                        <option value='' disabled>
                                            Select Remark
                                        </option>
                                        <option value='ACCURATE'>ACCURATE</option>
                                        <option value='WRONG_TAGGING'>WRONG TAGGING</option>
                                        <option value='CLOSED'>CLOSED / NO LONGER OPERATING</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                {customerFilteredData?.list?.length ? (
                    <Pagination
                    pageHandler={pageHandler}
                    totalPages={customerFilteredData?.totalPages}
                    currentPage={customerFilteredData?.currentPage}
                    totalCustomer={customerFilteredData?.totalCustomer}
                />
                ) : ''}
            </div>
        </div>
    );
};

export default CustomersList;
