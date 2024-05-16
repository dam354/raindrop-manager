import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(0, currentPage - maxPagesToShow);
    const endPage = Math.min(totalPages - 1, currentPage + maxPagesToShow);

    // Add the first page and ellipsis if needed
    if (startPage > 0) {
      pageLinks.push(
        <a
          key={0}
          onClick={() => handlePageClick(0)}
          className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
            0 === currentPage
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
          aria-current={0 === currentPage ? "page" : undefined}
        >
          1
        </a>
      );
      if (startPage > 1) {
        pageLinks.push(
          <span key="start-ellipsis" className="px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
    }

    // Add pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <a
          key={i}
          onClick={() => handlePageClick(i)}
          className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
            i === currentPage
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i + 1}
        </a>
      );
    }

    // Add the last page and ellipsis if needed
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pageLinks.push(
          <span key="end-ellipsis" className="px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
      pageLinks.push(
        <a
          key={totalPages - 1}
          onClick={() => handlePageClick(totalPages - 1)}
          className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
            totalPages - 1 === currentPage
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
          aria-current={totalPages - 1 === currentPage ? "page" : undefined}
        >
          {totalPages}
        </a>
      );
    }

    return pageLinks;
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <a
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
            currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex pagelinks">{renderPageLinks()}</div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <a
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
          className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
            currentPage + 1 >= totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
};
