"use client";

import { Button3D } from "@/components/Button3D";
import { Score as ScoreComponent } from "@/components/Score";
import { Score } from "@/lib/model/score";
import { useRouter } from "next/navigation";

type Props = {
  session: string;
  score: Score;
};

export function ClientPage({ session, score }: Props) {
  const router = useRouter();

  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 bg-base-300 hover:bg-base-200 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        ← Home
      </button>
      <div className="max-w-4xl mx-auto md:w-full">
        <ScoreComponent score={score} />
      </div>
    </div>
  );
}
