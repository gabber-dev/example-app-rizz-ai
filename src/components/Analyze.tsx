import { useState, useMemo } from "react";
import { useAppState } from "./AppStateProvider";
import { SessionDetailModal } from "./SessionDetailModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MobileTabs } from "./analyze/MobileTabs";
import { StreakCard } from "./analyze/StreakCard";
import { PastSessionsList } from "./analyze/PastSessionsList";
import { ScenariosList } from "./ScenariosList";
import { PersonasList } from "./PersonasList";
import { SelectedPersonaDetails } from "./SelectedPersonaDetails";

export function Analyze() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'practice'>('practice');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const { sessions, personas, scenarios, selectedPersona } = useAppState();
  const router = useRouter();

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

  // Only show on mobile
  return (
    <div className="md:hidden h-[calc(100vh-140px)]">
      <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Analyze Tab Content */}
      {activeTab === 'analyze' && (
        <div className="h-full flex flex-col">
          <StreakCard streakData={streakData} />
          <div className="flex-1 min-h-0">
            <div className="h-full pb-24">
              <PastSessionsList 
                sessions={recentSessions}
                onSessionSelect={setSelectedSessionId}
                className="h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Practice Tab Content */}
      {activeTab === 'practice' && (
        <div className="h-full flex flex-col">
          {selectedPersona && <SelectedPersonaDetails />}
          <div className="flex-1 min-h-0 overflow-y-auto pb-12">
            {selectedPersona ? <ScenariosList /> : <PersonasList />}
          </div>
        </div>
      )}

      <SessionDetailModal
        sessionId={selectedSessionId}
        onClose={() => setSelectedSessionId(null)}
      />
    </div>
  );
}
