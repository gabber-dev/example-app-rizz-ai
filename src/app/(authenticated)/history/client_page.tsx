"use client";

import { Persona, Session } from "@/generated";
import { useState } from "react";
import { SessionList } from "../../../components/SessionList";
import { SessionDetail } from "../../../components/SessionDetail";
import { useAppState } from "@/components/AppStateProvider";

type Props = {
  sessions: Session[];
  personas: Record<string, Persona>;
};

export function ClientPage({ sessions, personas }: Props) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {} = useAppState();
  const [isSessionsCollapsed, setIsSessionsCollapsed] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      <div className="bg-base-300 rounded-lg p-2 md:w-1/3">
        <button
          className="w-full text-left text-lg font-medium mb-2 md:hidden py-2 px-3 bg-base-200 rounded-lg hover:bg-base-100 transition-all"
          onClick={() => setIsSessionsCollapsed(!isSessionsCollapsed)}
        >
          <div className="flex items-center justify-between">
            <span>
              {isSessionsCollapsed ? "Show Sessions" : "Hide Sessions"}
            </span>
            <div
              className={`transform transition-transform ${isSessionsCollapsed ? "" : "rotate-180"}`}
            >
              ▼
            </div>
          </div>
        </button>
        <div
          className={`transition-all duration-300 ${isSessionsCollapsed ? "hidden" : "block"} md:block`}
        >
          <SessionList
            sessions={[]} // TODO
            selectedSession={selectedSession}
            onSelectSession={(sessionId) => {
              setSelectedSession(sessionId);
              setIsSessionsCollapsed(true);
            }}
            loading={loading}
            personas={personas}
          />
        </div>
      </div>
      <div className="flex-1 bg-base-300 rounded-lg p-4">
        {selectedSession ? (
          <SessionDetail sessionId={selectedSession} />
        ) : (
          <div className="flex items-center justify-center h-full text-base-content-bold opacity-50">
            Select a session to view details
          </div>
        )}
      </div>
    </div>
  );
}
