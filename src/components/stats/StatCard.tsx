import { useMemo } from "react";
import { Card } from "../common/Card";

export function StatCard({
  stat,
  title,
  empty,
}: {
  stat: string;
  title: string;
  empty?: boolean;
}) {
  const textSize = useMemo(() => {
    if (stat.length < 3) {
      return "text-4xl";
    } else if (stat.length < 8) {
      return "text-2xl";
    } else if (stat.length < 12) {
      return "text-xl";
    }
    return "text-lg";
  }, [stat.length]);
  return (
    <Card className="w-full h-full">
      <div className="flex flex-col w-full">
        <div className="text-sm uppercase">{title}</div>
        <div className={`${textSize} font-bold text-white`}>{stat}</div>
      </div>
    </Card>
  );
}
