import { Persona } from "@/generated";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useAppState } from "./AppStateProvider";
import { useMemo } from "react";

type Props = {
  selectedSession: string | null;
  onSelectSession: (sessionId: string) => void;
};

export function SessionList({ selectedSession, onSelectSession }: Props) {
  const { sessions, sessionsLoading, personas } = useAppState();

  const personasLookup = useMemo(() => {
    return personas.reduce(
      (acc, persona) => {
        acc[persona.id] = persona;
        return acc;
      },
      {} as Record<string, Persona>,
    );
  }, [personas]);

  if (sessionsLoading) {
    return <div className="animate-pulse">Loading sessions...</div>;
  }

  // Take only the last 30 sessions
  const recentSessions = sessions.slice(-30);

  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-200px)] overflow-y-auto pr-2">
      {recentSessions.map((session) => {
        const persona_id = session.config.generative.persona;
        const persona = persona_id && personasLookup[persona_id];
        return (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedSession === session.id
                ? "bg-primary text-primary-content"
                : "bg-base-200 hover:bg-base-100"
            }`}
          >
            <div className="flex gap-3 items-center">
              {persona && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    fill
                    src={persona.image_url || ""}
                    alt={persona.name}
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="font-bold">
                  {persona ? persona.name : "Not found"}
                </div>
                <div className="text-sm opacity-70">
                  {formatDistanceToNow(new Date(session.created_at))} ago
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
