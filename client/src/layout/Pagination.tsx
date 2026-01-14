import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IPagination {
  totalPages: number;
  currentPage: number;
  totalCustomer: number;
  pageHandler: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  totalCustomer,
  pageHandler,
}: IPagination) => {

  const toTopPage = () => {
    window.scrollTo(0, 0);
  };

  const getPaginationRange = () => {
    const maxVisiblePages = 5;
    const range: number[] = [];

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      range.push(1);
      if (start > 2) range.push(-1);
      for (let i = start; i <= end; i++) range.push(i);
      if (end < totalPages - 1) range.push(-1);
      range.push(totalPages);
    }

    return range;
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      pageHandler(currentPage - 1);
      toTopPage();
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      pageHandler(currentPage + 1);
      toTopPage();
    }
  };

  const paginationRange = getPaginationRange();

  const resultEnd = Math.min(currentPage * 10, totalCustomer);
  const resultStart = (currentPage - 1) * 10 + 1;

  return (
    <div className="mt-6 flex justify-between items-center xs:flex-col">
      <span className="text-xs">
        Showing results {resultStart} - {resultEnd} of {totalCustomer} Customers
      </span>

      <div className="flex items-center gap-1">
        <IoIosArrowBack
          onClick={handlePrevClick}
          className={`text-xl cursor-pointer ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
          }`}
        />

        {paginationRange.map((page, index) => (
          <div
            key={index}
            onClick={() => page !== -1 && pageHandler(page)}
            className={`border rounded-sm px-5 py-2 cursor-pointer ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            } ${page === -1 ? "cursor-default text-gray-500" : ""}`}
          >
            {page === -1 ? "..." : page}
          </div>
        ))}

        <IoIosArrowForward
          onClick={handleNextClick}
          className={`text-xl cursor-pointer ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Pagination;
