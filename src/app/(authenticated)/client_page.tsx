"use client";
import { Card } from "@/components/common/Card";
import { useAppState } from "@/components/AppStateProvider";
import { ScenariosList } from "@/components/ScenariosList";
import { PersonasList } from "@/components/PersonasList";
import { SelectedPersonaDetails } from "@/components/SelectedPersonaDetails";
import { PreviousSessionsList } from "@/components/PreviousSessionsList";

export default function ClientPage() {
  const { selectedPersona } = useAppState();

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] w-full md:max-w-[1200px]">
      {/* Sessions Panel - Collapsible on Mobile */}
      <Card className="md:grow-[2] md:basis-0 md:min-w-200px">
        <PreviousSessionsList />
      </Card>
      {/* Right Column - Main Content */}
      <div className="md:grow-[4] basis-0 flex flex-col gap-4">
        {/* Selected Persona Details */}
        {selectedPersona && (
          <Card>
            <SelectedPersonaDetails />
          </Card>
        )}
        {/* All Personas or Scenarios */}
        <Card className="flex-1 p-4 flex flex-col min-h-0 w-full">
          {selectedPersona ? <ScenariosList /> : <PersonasList />}
        </Card>
      </div>
    </div>
  );
}
