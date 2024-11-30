import { Persona } from "@/lib/model/persona";
import { Score as ScoreModel } from "@/lib/model/score";

type Props = {
  score: ScoreModel;
  persona: Persona
}

export function Score({ score, persona }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center h-full w-full justify-center">
      <div className="text-2xl text-primary">Your Rizz Score</div>
      <div className="text-base-content-bold text-6xl bold">{score.score}</div>
      <div className="flex flex-col rounded-lg bg-base-300 max-w-[600px] w-2/3">
        <div className="italic text-sm m-2">Primary Goal</div>
        <div className="flex flex-col gap-y-4 pb-4 px-4">
          <Goal
            goal={persona.ui_first_goal}
            success={score.primary_goal}
            primary={true}
          />
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-base-300 max-w-[600px] w-2/3">
        <div className="italic text-sm m-2">Challenges</div>
        <div className="flex flex-col gap-y-2 pb-4 px-4">
          <Goal
            goal={persona.ui_second_goal}
            success={score.secondary_goal_1}
            primary={false}
          />
          <Goal
            goal={persona.ui_third_goal}
            success={score.secondary_goal_2}
            primary={false}
          />
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-base-300 max-w-[600px] w-2/3">
        <div className="italic text-sm m-2">Things you did well</div>
        <div className="text-base-content-bold gap-1 flex flex-col pb-4 px-4">
          <li className="flex items-center gap-2"><div className="rounded-full bg-base-content-bold w-[6px] h-[6px]" />{score.good_1}</li>
          <li className="flex items-center gap-2"><div className="rounded-full bg-base-content-bold w-[6px] h-[6px]" />{score.good_2}</li>
          <li className="flex items-center gap-2"><div className="rounded-full bg-base-content-bold w-[6px] h-[6px]" />{score.good_3}</li>
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-base-300 max-w-[600px] w-2/3">
        <div className="italic text-sm m-2">Areas for improvement</div>
        <div className="text-base-content-bold gap-1 flex flex-col pb-2 px-2">
          <li className="flex items-center gap-2"><div className="rounded-full bg-base-content-bold w-[6px] h-[6px]" />{score.improve_1}</li>
          <li className="flex items-center gap-2"><div className="rounded-full bg-base-content-bold w-[6px] h-[6px]" />{score.improve_2}</li>
          <li className="flex items-center gap-2"><div className="rounded-full bg-base-content-bold w-[6px] h-[6px]" />{score.improve_3}</li>
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-base-300 max-w-[600px] w-2/3">
        <div className="italic text-sm m-2">Notes</div>
        <div className="pb-2 px-2 text-base-content-bold italic text-sm">{score.notes}</div>
      </div>
    </div>
  );
}

function Goal({
  goal,
  success,
  primary,
}: {
  goal: string;
  success: boolean;
  primary: boolean;
}) {
  return (
    <div
      className={`flex w-full text-base-content-bold ${
        primary ? "text-lg" : "text-md"
      }`}
    >
      <div>{goal}</div>
      <div className="grow min-w-[20px] overflow-hidden" />
      <div>{success ? "✅" : "❌"}</div>
    </div>
  );
}