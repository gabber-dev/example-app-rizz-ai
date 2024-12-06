import { Score as ScoreModel } from "@/lib/model/score";
import { useState, useEffect } from "react";
import { Ring } from "@/components/stats/RizzScore";

type Props = {
  score: ScoreModel;
};

type AttributeRating = {
  name: string;
  score: "poor" | "fair" | "good";
};

export function Score({ score }: Props) {
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score.rizz_score;
    if (start === end) return;

    let incrementTime = Math.abs(Math.floor(2000 / (end - start)));
    let timer = setInterval(() => {
      start += 1;
      setDisplayScore(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [score.rizz_score]);

  const handleSummaryClick = () => {
    setSummaryModalOpen(true);
  };

  const handleCloseModal = () => {
    setSummaryModalOpen(false);
  };

  const attributes: AttributeRating[] = [
    { name: "Wit", score: score.wit },
    { name: "Humor", score: score.humor },
    { name: "Confidence", score: score.confidence },
    { name: "Seduction", score: score.seductiveness },
    { name: "Conversation", score: score.ability_to_progress_conversation },
    { name: "Kindness", score: score.kindness },
  ];

  return (
    <div className="flex flex-col gap-2 items-center h-full w-full justify-center">
      {/* Score Ring */}
      <div className="relative w-[200px] h-[200px]">
        <Ring color="primary" percentage={displayScore / 100} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl text-primary">Your Rizz Score</div>
          <div className="text-7xl font-bold text-white">{displayScore}</div>
        </div>
      </div>

      {/* Summary Button */}
      <button
        className="mt-2 mb-2 bg-primary text-white p-2 rounded w-full max-w-[600px]"
        onClick={handleSummaryClick}
      >
        View Summary
      </button>
     {/* Attribute Ratings */}
     <div className="grid grid-cols-2 gap-4 w-full max-w-[600px]">
        {attributes.map((attr) => (
          <div
            key={attr.name}
            className="flex items-center justify-between bg-base-300 p-4 rounded-lg"
          >
            <span className="text-base-content-bold">{attr.name}</span>
            <div className="flex gap-1">
              {["poor", "fair", "good"].map((rating) => (
                <div
                  key={rating}
                  className={`w-2 h-2 rounded-full ${
                    getRatingColor(attr.score, rating)
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Summary Modal */}
      {isSummaryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-base-200 p-4 rounded-lg w-full max-w-[90%] sm:max-w-[540px] border border-primary">
            <div className="text-lg font-bold mb-2 text-white">Summary</div>
            <div className="text-base-content-bold text-white">{score.summary}</div>
            <button
              className="mt-4 bg-primary text-white p-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FeedbackSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-base-300 p-4 rounded-lg">
      <div className="italic text-sm mb-2">{title}</div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <div className="rounded-full bg-base-content-bold w-[6px] h-[6px]" />
            <span className="text-base-content-bold">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getRatingColor(actual: string, rating: string): string {
  if (rating === actual) {
    return "bg-primary";
  }
  return "bg-base-content opacity-20";
}