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
};

export default function ClientPage({ personas, scenarios }: Props) {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { credits, setShowPaywall } = useAppState();
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('all');

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
    <div className="flex flex-col md:flex-row gap-4 w-full h-[calc(100vh-100px)] p-4">
      <div className="flex justify-between w-full max-w-[1200px]">
        <Card className="w-[300px] h-[300px] p-4" dark={true}>
          <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
            <div className="flex-1">
              <button
                onClick={() => router.push('/history')}
                className="w-full h-full flex items-center justify-center border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-lg mb-2">View History</div>
                  <div className="text-sm opacity-70">See all your past conversations</div>
                </div>
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <Card className="p-4" dark={true}>
          <div className="flex gap-4 flex-1 min-h-0">
            <div className={`w-full h-full transition-all duration-300 ${selectedPersona ? 'hidden' : 'block'}`}>
              <Card className="h-full p-4 flex flex-col" dark={true}>
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
                        className="p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100 h-[128px] flex flex-col"
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
              </Card>
            </div>

            {selectedPersona && (
              <div className="w-full">
                <Card className="h-full p-4" dark={true}>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scenarios.slice(0, 6).map((scenario) => (
                      <ScenarioCard
                        key={scenario.id}
                        item={scenario}
                        selected={selectedScenario?.id === scenario.id}
                        onClick={() => setSelectedScenario(scenario)}
                      />
                    ))}
                  </div>
                  {selectedScenario && (
                    <div className="mt-4 flex justify-center">
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
                      >
                        {loading ? (
                          <div className="w-1/2 h-full text-primary-content loading loading-dots" />
                        ) : (
                          <PlayArrowRounded className="w-full h-full text-primary-content" />
                        )}
                      </Button3D>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
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
      className={`flex bg-base-200 gap-2 hover:bg-base-300 rounded w-full h-[80px] p-2 ${selected ? "border border-primary" : ""}`}
    >
      <div className="relative overflow-hidden rounded h-full aspect-square">
        <Image
          fill={true}
          className="w-full h-full"
          src={item.image_url}
          alt={item.name}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">{item.name}</div>
        <div className="text-sm">{item.description}</div>
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
      className={`hover:bg-base-300 bg-base-200 rounded w-full h-[80px] p-2 ${selected ? "border border-primary" : ""}`}
    >
      <div className="text-lg font-bold">{item.name}</div>
      <div className="text-sm">{item.prompt}</div>
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
