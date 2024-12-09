import React, { useState } from "react";

type AttributeRating = {
  name: string;
  score: "poor" | "fair" | "good";
  summary: string;
};

function getRatingColor(actual: string, rating: string): string {
  if (rating === actual) {
    return "bg-primary";
  }
  return "bg-base-content opacity-20";
}

function AttributeCard({ attr }: { attr: AttributeRating }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center justify-between bg-base-300 p-4 rounded-lg transition-all hover:bg-base-200">
          <span className="text-base-content-bold">{attr.name}</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {["poor", "fair", "good"].map((rating) => (
                <div
                  key={rating}
                  className={`w-2 h-2 rounded-full ${getRatingColor(
                    attr.score,
                    rating,
                  )}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-200 p-4 rounded-lg w-full max-w-[90%] sm:max-w-[400px] border border-primary">
            <div className="text-lg font-bold mb-2 text-white">{attr.name}</div>
            <div className="text-base-content-bold text-white">
              {attr.summary}
            </div>
            <button
              className="mt-4 bg-primary text-white p-2 rounded w-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AttributeCard;
