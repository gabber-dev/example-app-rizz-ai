import React, { useState, useEffect } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative"
      onClick={() => isMobile && setIsOpen(!isOpen)}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <div className="flex items-center justify-between bg-base-300 p-4 rounded-lg cursor-pointer">
        <span className="text-base-content-bold">{attr.name}</span>
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
      
      {/* Summary Popup */}
      {isOpen && (
        <div className="absolute z-10 left-0 right-0 mt-2 p-4 bg-base-200 rounded-lg shadow-lg border border-primary">
          <p className="text-sm text-base-content">{attr.summary}</p>
          {isMobile && (
            <button 
              className="mt-2 text-xs text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AttributeCard;
