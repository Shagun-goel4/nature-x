import React from "react";

export default function LessonPageNav({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className={`px-4 py-2 rounded ${
          page === 0
            ? "bg-gray-300 text-gray-500"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {page + 1} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages - 1}
        className={`px-4 py-2 rounded ${
          page === totalPages - 1
            ? "bg-gray-300 text-gray-500"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Next
      </button>
    </div>
  );
}
