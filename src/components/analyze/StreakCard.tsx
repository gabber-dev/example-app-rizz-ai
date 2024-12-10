type StreakData = {
  days: {
    label: string;
    completed: "hit" | "missed";
  }[];
  streak: number;
};

type Props = {
  streakData: StreakData;
};

export function StreakCard({ streakData }: Props) {
  return (
    <div className="bg-base-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm opacity-70">Current Streak</div>
        <div className="font-bold">{streakData.streak} days</div>
      </div>
      <div className="flex justify-between">
        {streakData.days.map((day, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-xs opacity-70 mb-1">{day.label}</div>
            <div
              className={`w-2 h-2 rounded-full ${
                day.completed === "hit"
                  ? "bg-primary"
                  : "border border-base-content opacity-30"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
