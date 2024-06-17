
  export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
  };
const PageSlider = ({page, pages, onPageChange}: Props) => {

    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
  return (
    <div className="flex justify-center mt-4">
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className={`px-3 py-1 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Previous
        </button>
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 border rounded ${page === pageNum ? "bg-gray-200" : ""}`}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page === pages}
          className={`px-3 py-1 border rounded ${page === pages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PageSlider
