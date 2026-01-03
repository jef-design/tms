
const TransFlowLogo = () => {
  return (
    <div className="flex items-center gap-1">
      {/* Icon */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <span className="absolute w-1.5 h-full bg-linear-to-b from-blue-500 to-green-500 rounded"></span>
        <span className="absolute w-1.5 h-3/5 bg-linear-to-b from-blue-500 to-green-500 rotate-45 rounded"></span>
      </div>

      {/* Text */}
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-green-500">
        TransFlow
      </span>
    </div>
  );
};

export default TransFlowLogo;
