"use client";
import { Button3D } from "@/components/Button3D";
import { Card } from "@/components/common/Card";
import { RizzScore } from "@/components/stats/RizzScore";
import { Persona, Scenario } from "@/generated";
import { PlayArrowRounded } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppState } from "@/components/AppStateProvider";

type Props = {
  personas: Persona[];
  scenarios: Scenario[];
  sessions: any[];
};

export default function ClientPage({ personas, scenarios, sessions }: Props) {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('all');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { credits, setShowPaywall } = useAppState();
  const [isMobile, setIsMobile] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSessionsCollapsed, setIsSessionsCollapsed] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] p-4">
      {/* Sessions Panel - Collapsible on Mobile */}
      <div className={`md:w-[20%] md:min-w-[300px] transition-all duration-300 ${
        isSessionsCollapsed ? 'h-[60px]' : 'h-[300px]'
      } md:h-full`}>
        <Card className="h-full p-4" dark={true}>
          <button 
            className="flex md:hidden w-full justify-between items-center mb-4"
            onClick={() => setIsSessionsCollapsed(!isSessionsCollapsed)}
          >
            <h2 className="text-xl font-bold">Past Sessions</h2>
            <div className={`transform transition-transform ${isSessionsCollapsed ? '' : 'rotate-180'}`}>
              ▼
            </div>
          </button>
          <h2 className="hidden md:block text-xl font-bold mb-4">Past Sessions</h2>
          <div className={`flex flex-col gap-2 overflow-y-auto transition-all duration-300 ${
            isSessionsCollapsed ? 'h-0' : 'h-[calc(100%-4rem)]'
          } md:h-[calc(100%-2rem)]`}>
            {sessions.map((session) => (
              <button
                key={session.id}
                className="p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100"
                onClick={() => {
                  if (session.id) {
                    router.push(`/history?session=${session.id}`);
                  }
                }}
              >
                <div className="flex gap-2 items-start">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      fill
                      src={personas.find(p => p.id === session.persona)?.image_url || ''}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold truncate">
                      {personas.find(p => p.id === session.persona)?.name}
                    </div>
                    <div className="text-sm opacity-70 truncate">
                      {scenarios.find(s => s.id === session.scenario)?.name}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/live?persona=${session.persona}&scenario=${session.scenario}`);
                      }}
                      className="mt-2 text-sm text-primary hover:text-primary-focus"
                    >
                      Retry Session →
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column - Main Content */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Recommended/Selected Personas */}
        <Card className="p-4" dark={true}>
          {selectedPersona ? (
            <>
              <h2 className="text-xl font-bold mb-4">Selected</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm opacity-70 mb-2">Persona</div>
                  <PersonaCard item={selectedPersona} selected={true} />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm opacity-70 mb-2">Scenario</div>
                  {selectedScenario ? (
                    <ScenarioCard item={selectedScenario} selected={true} />
                  ) : (
                    <div className="flex items-center justify-center bg-base-200 rounded w-full h-[128px] p-2 border border-dashed border-base-content/20">
                      <span className="text-sm opacity-50">Select a scenario below</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Recommended Personas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personas.slice(0, isDesktop ? 3 : (isMobile ? 1 : 2)).map((persona) => (
                  <button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona)}
                    className="p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100 h-[128px]"
                  >
                    <div className="flex gap-2 items-start">
                      {persona.image_url && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            fill
                            src={persona.image_url}
                            alt={persona.name}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 overflow-hidden">
                        <div className="font-bold truncate">{persona.name}</div>
                        <div className="text-sm opacity-70 line-clamp-3">{persona.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </Card>

        {/* All Personas or Scenarios */}
        <Card className="flex-1 p-4 flex flex-col min-h-0" dark={true}>
          {selectedPersona ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Select a Scenario</h2>
                <button
                  onClick={() => {
                    setSelectedPersona(null);
                    setSelectedScenario(null);
                  }}
                  className="text-sm opacity-70 hover:opacity-100"
                >
                  Change Persona
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1">
                {scenarios.slice(0, 6).map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className={`p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100 h-[128px] ${
                      selectedScenario?.id === scenario.id ? "border-2 border-primary" : ""
                    }`}
                  >
                    <div className="h-full flex flex-col">
                      <div className="font-bold truncate">{scenario.name}</div>
                      <div className="text-sm opacity-70 line-clamp-3 flex-1">{scenario.prompt}</div>
                    </div>
                  </button>
                ))}
              </div>
              {selectedScenario && (
                <div className="mt-auto pt-4 flex justify-center">
                  <Button3D
                    enabled={!loading}
                    onClick={async () => {
                      if (credits <= 0) {
                        setShowPaywall({});
                        return;
                      }
                      setLoading(true);
                      try {
                        router.push(
                          `/live?persona=${selectedPersona.id}&scenario=${selectedScenario.id}`
                        );
                      } catch (error) {
                        toast.error("Failed to start");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-24 h-24"
                  >
                    {loading ? (
                      <div className="w-1/2 h-full text-primary-content loading loading-dots" />
                    ) : (
                      <PlayArrowRounded className="w-full h-full text-primary-content" />
                    )}
                  </Button3D>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Personas</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGenderFilter('all')}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      genderFilter === 'all' 
                        ? 'bg-primary text-primary-content' 
                        : 'bg-base-200 hover:bg-base-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setGenderFilter('men')}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      genderFilter === 'men' 
                        ? 'bg-primary text-primary-content' 
                        : 'bg-base-200 hover:bg-base-100'
                    }`}
                  >
                    Men
                  </button>
                  <button
                    onClick={() => setGenderFilter('women')}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      genderFilter === 'women' 
                        ? 'bg-primary text-primary-content' 
                        : 'bg-base-200 hover:bg-base-100'
                    }`}
                  >
                    Women
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1 -mx-2 px-2">
                {personas
                  .filter(persona => 
                    genderFilter === 'all' ? true : 
                    genderFilter === 'men' ? persona.gender === 'male' :
                    persona.gender === 'female'
                  )
                  .map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => setSelectedPersona(persona)}
                      className="p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100 h-[128px]"
                    >
                      <div className="flex gap-2 items-start">
                        {persona.image_url && (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              fill
                              src={persona.image_url}
                              alt={persona.name}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 overflow-hidden">
                          <div className="font-bold truncate">{persona.name}</div>
                          <div className="text-sm opacity-70 line-clamp-3">{persona.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function StartButton({
  enabled,
  loading,
  onClick,
}: {
  enabled: boolean;
  loading: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="text-primary-content p-2 rounded cursor-pointer w-full h-full">
      <Button3D enabled={enabled} onClick={enabled ? onClick : undefined}>
        {loading ? (
          <div className="w-1/2 h-full text-primary-content loading loading-dots" />
        ) : (
          <PlayArrowRounded className="w-full h-full text-primary-content" />
        )}
      </Button3D>
    </div>
  );
}

function PersonaCard({ item, selected }: { item: Persona; selected: boolean }) {
  return (
    <div
      className={`flex bg-base-200 gap-4 hover:bg-base-300 rounded w-full h-[128px] p-4 ${selected ? "border border-primary" : ""}`}
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <Image
          fill={true}
          className="object-cover"
          src={item.image_url}
          alt={item.name}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">{item.name}</div>
        <div className="text-sm line-clamp-3">{item.description}</div>
      </div>
    </div>
  );
}

function ScenarioCard({
  item,
  selected,
}: {
  item: Scenario;
  selected: boolean;
}) {
  return (
    <div
      className={`hover:bg-base-300 bg-base-200 rounded w-full h-[128px] p-4 flex flex-col ${selected ? "border border-primary" : ""}`}
    >
      <div className="text-lg font-bold">{item.name}</div>
      <div className="text-sm line-clamp-3">{item.prompt}</div>
    </div>
  );
}

function ItemList<T extends { id: string }>({
  items,
  selected,
  onSelected,
  itemComponent,
}: {
  itemComponent: (props: { item: T; selected: boolean }) => JSX.Element;
  onSelected: (item: T) => void;
  items: T[];
  selected: T | null;
}) {
  return (
    <div className="flex flex-col gap-4 items-center w-full overflow-scroll">
      {items.map((item) => (
        <div
          className="cursor-pointer w-full"
          key={item.id}
          onClick={() => {
            onSelected(item);
          }}
        >
          {itemComponent({ item, selected: selected === item })}
        </div>
      ))}
    </div>
  );
}
