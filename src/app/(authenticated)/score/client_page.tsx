"use client";

import { Button3D } from "@/components/Button3D";
import { Score as ScoreComponent } from "@/components/Score";
import { Score } from "@/lib/model/score";

type Props = {
  session: string;
  score: Score;
};

export function ClientPage({ session, score }: Props) {
  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto md:w-full">
        <ScoreComponent score={score}/>
      </div>
    </div>
  );
}
