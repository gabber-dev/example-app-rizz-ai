import { Persona } from "@/generated";
import { Score as ScoreModel } from "@/lib/model/score";
//import { Ring } from "./stats/RizzScore";

type Props = {
  score: ScoreModel;
  persona: Persona;
};

type AttributeRating = {
  name: string;
  score: "poor" | "fair" | "good";
};

export function Score({ score, persona }: Props) {
  const attributes: AttributeRating[] = [
    { name: "Wit", score: score.wit },
    { name: "Humor", score: score.humor },
    { name: "Confidence", score: score.confidence },
    { name: "Seductiveness", score: score.seductiveness },
    { name: "Conversation", score: score.ability_to_progress_conversation },
    { name: "Kindness", score: score.kindness },
  ];

  return (
    <div className="flex flex-col gap-4 items-center h-full w-full justify-center p-4">
      {/* Score Ring */}
      <div className="relative w-[300px] h-[300px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl text-primary">Your Rizz Score</div>
          <div className="text-8xl font-bold text-white">{score.rizz_score}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-base-300 p-4 rounded-lg w-full max-w-[600px] mb-4">
        <div className="italic text-sm mb-2">Summary</div>
        <div className="text-base-content-bold">{score.summary}</div>
      </div>

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

      {/* Feedback Sections */}
      <div className="flex flex-col gap-4 w-full max-w-[600px]">
        {/* <FeedbackSection title="Things you did well" items={[score.good_1, score.good_2, score.good_3]} /> */}
        {/* <FeedbackSection
          title="Areas for improvement"
          items={[score.improve_1, score.improve_2, score.improve_3]}
        />*/}
        <div className="bg-base-300 p-4 rounded-lg">
          <div className="italic text-sm mb-2">Notes</div>
          <div className="text-base-content-bold">{score.summary}</div>
        </div>
      </div>
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