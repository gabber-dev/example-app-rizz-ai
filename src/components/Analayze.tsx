import { useState, useMemo } from "react";
import { useAppState } from "./AppStateProvider";
import { SessionDetailModal } from "./SessionDetailModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/common/Card";
import { PersonasList } from "@/components/PersonasList";
import { ScenariosList } from "@/components/ScenariosList";
import { SelectedPersonaDetails } from "@/components/SelectedPersonaDetails";

export function Analyze() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'train'>('train');
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
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Calculate streak
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
        completed: sessionsByDay.has(date.toDateString()) ? "hit" : "missed"
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
        return dateB - dateA; // Most recent first
      })
      .slice(0, 20);
  }, [sessions]);

  return (
    <>
      {/* Mobile Tabs */}
      <div className="md:hidden flex mb-4">
        <button
          onClick={() => setActiveTab('analyze')}
          className={`flex-1 p-2 text-center font-medium border-b-2 ${
            activeTab === 'analyze'
              ? 'border-primary text-primary'
              : 'border-base-200 text-base-content/70'
          }`}
        >
          Analyze
        </button>
        <button
          onClick={() => setActiveTab('train')}
          className={`flex-1 p-2 text-center font-medium border-b-2 ${
            activeTab === 'train'
              ? 'border-primary text-primary'
              : 'border-base-200 text-base-content/70'
          }`}
        >
          Train
        </button>
      </div>

      {/* Analyze Section - Shows metrics and history */}
      <div className={`${activeTab === 'analyze' ? 'block' : 'hidden'} md:block`}>
        <div className="hidden md:block">
          <button
            onClick={() => {
              const randomPersona = personas[Math.floor(Math.random() * personas.length)];
              const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
              if (!randomPersona || !randomScenario) {
                toast.error("No personas or scenarios available");
                return;
              }
              router.push(`/live?persona=${randomPersona.id}&scenario=${randomScenario.id}`);
            }}
            className="w-full bg-primary text-primary-content p-4 rounded-lg hover:bg-primary-focus transition-colors mb-4 font-bold"
          >
            Surprise Me!
          </button>
        </div>
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
        <h2 className="text-xl font-bold mb-4">Past Sessions</h2>
        <div className="h-[calc(100vh-450px)] md:h-[calc(100vh-350px)] overflow-y-auto">
          {recentSessions.length > 0 ? (
            recentSessions.map((session) => (
              <div key={session.id} className="relative mb-2">
                <button
                  className="p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100 w-full group"
                  onClick={() => setSelectedSessionId(session.id)}
                >
                  <div className="flex gap-2 items-start">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        quality={100}
                        fill={true}
                        sizes="512px"
                        src={session.config.generative?.persona?.image_url || ""}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold truncate">
                            {session.config.generative?.persona?.name || ""}
                          </div>
                          <div className="text-sm opacity-70 truncate">
                            {session.config.generative?.scenario?.name || ""}
                          </div>
                          <div className="text-sm opacity-70">
                            {formatDistanceToNow(new Date(session.created_at))}{" "}
                            ago
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            const persona_id =
                              session.config.generative?.persona?.id;
                            const scenario_id =
                              session.config.generative?.scenario?.id;
                            if (!persona_id || !scenario_id) {
                              toast.error("Failed to retry session");
                              return;
                            }
                            router.push(
                              `/live?persona=${persona_id}&scenario=${scenario_id}`,
                            );
                          }}
                          className="text-sm text-primary hover:text-primary-focus transition-colors flex items-center gap-1 ml-2"
                        >
                          <span>Retry</span>
                          <span className="transform transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="text-base-content/70 text-lg mb-2">
                Start practicing to fill up your past sessions
              </div>
              <div className="text-sm opacity-50">
                Your conversation history will appear here
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Train Section - Only visible on mobile */}
      <div className={`md:hidden ${activeTab === 'train' ? 'block' : 'hidden'}`}>
        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          {selectedPersona ? <ScenariosList /> : <PersonasList />}
        </div>
      </div>

      <SessionDetailModal
        sessionId={selectedSessionId}
        onClose={() => setSelectedSessionId(null)}
      />
    </>
  );
}
