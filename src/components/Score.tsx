import { Persona } from "@/generated";
import { Score as ScoreModel } from "@/lib/model/score";
import { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

type Props = {
  score: ScoreModel;
  persona: Persona;
};

type AttributeRating = {
  name: string;
  score: "poor" | "fair" | "good";
};

export function Score({ score, persona }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const attributes: AttributeRating[] = [
    { name: "Wit", score: score.wit },
    { name: "Humor", score: score.humor },
    { name: "Confidence", score: score.confidence },
    { name: "Seductiveness", score: score.seductiveness },
    { name: "Conversation", score: score.ability_to_progress_conversation },
    { name: "Kindness", score: score.kindness },
  ];

  return (
    <div className="flex flex-col gap-4 items-center h-full w-full justify-center">
      {/* Persona Info */}
      <div className="w-full max-w-[600px] bg-base-300 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="font-bold text-lg">{persona.name}</div>
            <div className="text-sm opacity-70">{persona.description}</div>
          </div>
        </div>
      </div>

      {/* Score Ring */}
      <div className="relative w-[300px] h-[300px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl text-primary">Your Rizz Score</div>
          <div className="text-8xl font-bold text-white">{score.rizz_score}</div>
        </div>
      </div>

      {/* Summary - Expandable */}
      <div 
        className={`relative w-full max-w-[600px] bg-base-300 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
          isExpanded ? 'absolute inset-0 z-10 m-4' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="italic text-sm">Summary</div>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </div>
        <div className={`text-base-content-bold ${isExpanded ? '' : 'line-clamp-2'}`}>
          {score.summary}
        </div>
      </div>

      {/* Attribute Ratings */}
      <div className={`grid grid-cols-2 gap-4 w-full max-w-[600px] transition-opacity duration-300 ${
        isExpanded ? 'opacity-0' : 'opacity-100'
      }`}>
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
    </div>
  );
}

function getRatingColor(actual: string, rating: string): string {
  if (rating === actual) {
    return "bg-primary";
  }
  return "bg-base-content opacity-20";
}