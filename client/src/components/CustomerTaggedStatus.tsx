interface CustomerStatusProps {
  status: string; // but less type-safe
}


const CustomerStatus: React.FC<CustomerStatusProps> = ({ status }) => {
 
  const isTagged = status === "Y"; // true if tagged

  return (
    <span
      className={`px-3 py-1 rounded font-semibold text-xs
        ${  
          isTagged
            ? "text-green-800 bg-green-100 border border-green-500"
            : "text-red-800 bg-red-100 border border-red-500"
        }`}
    >
      {isTagged ? "GEO TAGGED" : "NOT GEO TAGGED"}
    </span>
  );
};

export default CustomerStatus;
