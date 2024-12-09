import { useAppState } from "./AppStateProvider";
import { GenderSelection } from "./GenderSelection";
import { PersonaButton } from "./PersonaButton";

export function PersonasList() {
  const { personas, setSelectedPersona } = useAppState();
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold md:text-xl text-lg">
          Choose a Character
        </h2>
        <GenderSelection />
      </div>
      <div className="overflow-y-auto min-h-0 flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((persona) => (
            <PersonaButton
              key={persona.id}
              persona={persona}
              onClick={() => setSelectedPersona(persona)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
