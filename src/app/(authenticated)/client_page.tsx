"use client";
import { Button3D } from "@/components/Button3D";
import { Card } from "@/components/common/Card";
import { RizzScore } from "@/components/stats/RizzScore";
import { Persona, Scenario } from "@/generated";
import { PlayArrowRounded } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  return (
    <div className="flex flex-col gap-4 items-center w-full h-full p-4">
      <div className="flex justify-between w-full max-w-[1200px]">
        <Card className="w-[300px] h-[300px]" dark={true}>
          <RizzScore score={0} empty={true} />
        </Card>
        
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

      <div className="flex gap-2 grow">
        <div className="w-[400px] h-full flex flex-col items-center gap-1">
          Select a Persona
          <ItemList
            items={personas}
            itemComponent={PersonaCard}
            selected={selectedPersona}
            onSelected={setSelectedPersona}
          />
        </div>
        <div className="w-[400px] h-full flex flex-col items-center gap-1">
          Select a Scenario
          <ItemList
            items={scenarios}
            itemComponent={ScenarioCard}
            selected={selectedScenario}
            onSelected={setSelectedScenario}
          />
        </div>
      </div>
      <div className="h-[90px] w-[180px]">
        <StartButton
          loading={loading}
          enabled={selectedPersona !== null && selectedScenario !== null}
          onClick={async () => {
            if (credits <= 0) {
              setShowPaywall({});
              return;
            }
            setLoading(true);
            try {
              router.push(
                "/live?persona=" +
                  selectedPersona?.id +
                  "&scenario=" +
                  selectedScenario?.id,
              );
            } catch (error) {
              toast.error("Failed to start");
            } finally {
              setLoading(false);
            }
          }}
        />
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
