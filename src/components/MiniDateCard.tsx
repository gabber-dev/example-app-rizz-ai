import { Persona } from "@/lib/model/persona";
import { useMemo } from "react";
import { QuestionAnswer } from "@mui/icons-material";
import Image from "next/image";
import { Card } from "./common/Card";
import { colorFromString } from "@/lib/utils/utils";

type State = "normal" | "loading" | "disabled";

type Props = {
  persona: Persona;
  dateCount: number;
  locked: boolean;
  state: State;
  onSessionCreateClicked: () => void;
};

export function MiniDateCard({ persona, state, onSessionCreateClicked, locked, dateCount }: Props) {

  const dateCountString = useMemo(() => {
    if (dateCount < 1000) {
      return dateCount.toString();
    }
    const k = dateCount / 1000;
    const decimal = k.toFixed(1);

    if (decimal.endsWith("0")) {
      return decimal.slice(0, -2) + "k";
    }
    return decimal + "k";
  }, [dateCount]);

  const minutesString = useMemo(() => {
    const time = persona.date_length_s;
    const minutes = Math.floor(time / 60);
    const label = minutes === 1 ? "minute" : "minutes";
    const seconds = time % 60;
    if (minutes < 2) {
      return `${time} seconds`;
    }
    if(seconds !== 0) {
      return `${minutes} ${label} ${seconds} second`;
    }
    return `${minutes} ${label}`;
  }, [persona.date_length_s]);

  return (
    <Card className="cursor-pointer hover:bg-base-hover transition-all">
      <div
        onClick={() => {
          if (!locked) {
            onSessionCreateClicked();
          }
        }}
        className="w-full h-full flex flex-col gap-2 cursor-pointer"
      >
        <div
          className={`flex gap-2 ${
            state === "disabled" ? "opacity-[0.2]" : ""
          }`}
        >
          <div className="relative overflow-hidden rounded-full w-[60px] h-[60px]">
            <Image
              style={{ objectFit: "cover", objectPosition: "center" }}
              fill={true}
              sizes="75px"
              src={persona.image_url}
              alt={`Image for ${persona.name}`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <div className="text-base-content-bold">{persona.name}</div>
              <div className="px-2 bg-base-300 flex items-center justify-center rounded-full uppercase text-xs">
                {minutesString}
              </div>
            </div>
            <div className="flex">
              {persona.tags.map((tag, index) => (
                <div
                  key={tag.name}
                  className="italic text-xs"
                  style={{
                    color: colorFromString(tag.name),
                  }}
                >
                  {tag.human_name}
                </div>
              ))}
            </div>
            <div className="text-base-content-bold text-xl bold">
              {persona.title}
            </div>
            <div className="flex items-center gap-1 text-sm italic">
              <div className="h-[16px] w-[16px] flex items-center justify-center">
                <QuestionAnswer className="w-full h-full" />
              </div>
              {dateCountString}
            </div>
          </div>
          <div className="grow" />
        </div>
      </div>
    </Card>
  );
}