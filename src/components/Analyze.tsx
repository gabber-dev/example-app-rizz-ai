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
import { useStreakData } from "@/hooks/useStreakData";

export function Analyze() {
  const [activeTab, setActiveTab] = useState<"analyze" | "practice">(
    "practice",
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const { sessions, personas, scenarios, selectedPersona } = useAppState();
  const router = useRouter();
  const streakData = useStreakData(sessions);

  // Only show on mobile
  return (
    <div className="md:hidden h-[calc(100vh-140px)]">
      <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Analyze Tab Content */}
      {activeTab === "analyze" && (
        <div className="h-full flex flex-col">
          <StreakCard streakData={streakData} />
          <div className="flex-1 min-h-0">
            <div className="h-full pb-24">
              <PastSessionsList
                sessions={sessions}
                onSessionSelect={setSelectedSessionId}
                className="h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Practice Tab Content */}
      {activeTab === "practice" && (
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
