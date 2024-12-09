import { Score as ScoreModel } from "@/lib/model/score";
import { useState } from "react";
import { Ring } from "@/components/stats/RizzScore";
import AttributeCard from "./AttributeCard";
import { motion } from "framer-motion";

type Props = {
  score: ScoreModel;
};

type AttributeRating = {
  name: string;
  score: "poor" | "fair" | "good";
  summary: string;
};

export function Score({ score }: Props) {
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);

  const handleSummaryClick = () => {
    setSummaryModalOpen(true);
  };

  const handleCloseModal = () => {
    setSummaryModalOpen(false);
  };

  const attributes: AttributeRating[] = [
    { name: "Wit", score: score.wit, summary: score.wit_summary },
    { name: "Humor", score: score.humor, summary: score.humor_summary },
    {
      name: "Confidence",
      score: score.confidence,
      summary: score.confidence_summary,
    },
    {
      name: "Seduction",
      score: score.seductiveness,
      summary: score.seductiveness_summary,
    },
    {
      name: "Conversation",
      score: score.ability_to_progress_conversation,
      summary: score.ability_to_progress_conversation_summary,
    },
    {
      name: "Kindness",
      score: score.kindness,
      summary: score.kindness_summary,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="flex flex-col gap-2 items-center h-full w-full justify-center"
    >
      {/* Score Ring */}
      <motion.div variants={item} className="relative w-[200px] h-[200px]">
        <Ring color="primary" percentage={score.rizz_score / 100} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl text-primary">Your Rizz Score</div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
            className="text-7xl font-bold text-white"
          >
            {score.rizz_score}
          </motion.div>
        </div>
      </motion.div>

      {/* Summary Button */}
      <motion.button
        variants={item}
        className="mt-2 mb-2 bg-primary text-white p-2 rounded w-full max-w-[600px]"
        onClick={handleSummaryClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Feedback
      </motion.button>

      {/* Attribute Ratings */}
      <motion.div
        variants={container}
        className="grid grid-cols-2 gap-4 w-full max-w-[600px]"
      >
        {attributes.map((attr) => (
          <motion.div key={attr.name} variants={item}>
            <AttributeCard attr={attr} />
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Modal */}
      {isSummaryModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-base-200 p-4 rounded-lg w-full max-w-[90%] sm:max-w-[540px] border border-primary"
          >
            <div className="text-lg font-bold mb-2 text-white">Summary</div>
            <div className="text-base-content-bold text-white">
              {score.overall_summary}
            </div>
            <button
              className="mt-4 bg-primary text-white p-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
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
