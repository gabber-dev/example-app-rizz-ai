"use client";
import { Card } from "@/components/common/Card";
import { useAppState } from "@/components/AppStateProvider";
import { ScenariosList } from "@/components/ScenariosList";
import { PersonasList } from "@/components/PersonasList";
import { SelectedPersonaDetails } from "@/components/SelectedPersonaDetails";
import { Analyze } from "@/components/Analyze";
import { StreakCard } from "@/components/analyze/StreakCard";
import { PastSessionsList } from "@/components/analyze/PastSessionsList";
import { useState, useMemo, useEffect } from "react";
import { SessionDetailModal } from "@/components/SessionDetailModal";

export default function ClientPage() {
  const { selectedPersona, sessions, setSelectedPersona } = useAppState();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Clear selected persona when component mounts
    setSelectedPersona(null);
  }, []); // Empty dependency array means this runs once on mount

  const streakData = useMemo(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i);
      return date;
    }).reverse();

    const sessionsByDay = new Map();
    sessions.forEach(session => {
      const sessionDate = new Date(session.created_at);
      const dateKey = sessionDate.toDateString();
      sessionsByDay.set(dateKey, (sessionsByDay.get(dateKey) || 0) + 1);
    });

    let currentStreak = 0;
    for (let i = 0; i <= 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = checkDate.toDateString();
      
      if (sessionsByDay.has(dateKey)) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      days: last7Days.map(date => ({
        label: date.getDate().toString(),
        completed: sessionsByDay.has(date.toDateString()) ? ("hit" as const) : ("missed" as const)
      })),
      streak: currentStreak
    };
  }, [sessions]);

  const recentSessions = useMemo(() => {
    if (!sessions.length) return [];
    return [...sessions]
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      })
      .slice(0, 20);
  }, [sessions]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] w-full md:max-w-[1200px]">
      {/* Mobile View */}
      <div className="md:hidden w-full">
        <Card>
          <Analyze />
        </Card>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block md:grow-[2] md:basis-0 md:min-w-200px">
        <Card>
          <StreakCard streakData={streakData} />
          <PastSessionsList 
            sessions={recentSessions}
            onSessionSelect={setSelectedSessionId}
          />
        </Card>
      </div>

      {/* Right Column - Main Content (Desktop) */}
      <div className="hidden md:flex md:grow-[4] basis-0 flex-col gap-4">
        {selectedPersona && (
          <Card>
            <SelectedPersonaDetails />
          </Card>
        )}
        <Card className="flex-1 p-4 flex flex-col min-h-0 w-full">
          {selectedPersona ? <ScenariosList /> : <PersonasList />}
        </Card>
      </div>

      <SessionDetailModal
        sessionId={selectedSessionId}
        onClose={() => setSelectedSessionId(null)}
      />
    </div>
  );
}
