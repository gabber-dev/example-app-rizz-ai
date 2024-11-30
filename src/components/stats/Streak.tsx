import { Stats } from "@/lib/model/stats";
import { Check } from "@mui/icons-material";
import { useMemo } from "react";
import { Card } from "../common/Card";

export function Streak({stats}: {stats: Stats}) {
  const statLookup = useMemo(() => {
    const days = ["S", "M", "T", "W", "T", "F", "S"]
    let lookup: ({label: string, completed: "missed" | "hit" | "future"} | null)[] = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    for(const day of stats.days) {
      const dayOfWeek = day.day.getDay();
      lookup[dayOfWeek] = { label: days[dayOfWeek], completed: day.number_of_sessions > 0 ? "hit" : "missed"};
    }

    lookup = lookup.map((day, i) => {
      return day ? day : { label: days[i], completed: "future" };
    });
    return lookup;
  }, [stats.days]);
  return (
      <Card className="w-full h-full pt-4">
        <div className="flex gap-2">
          {statLookup.map((stat, i) => (
            <Day key={i} label={stat!.label} completed={stat!.completed} />
          ))}
        </div>
      </Card>
  );
}

function Day({
  label,
  completed,
}: {
  label: string;
  completed: "hit" | "missed" | "future";
}) {
  const icon = useMemo(() => {
    if (completed === "hit") {
      return (
        <div className="w-full h-full flex items-center justify-center rounded-full bg-primary">
          <Check className="text-base-100 w-full h-full" />
        </div>
      );
    }

    return <div className="w-full h-full rounded-full border"  />;
  }, [completed]);
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <div className="w-[20px] h-[20px]">
        {icon}
      </div>
      <div className="">{label}</div>
    </div>
  );
}