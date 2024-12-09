import { useAppState } from "./AppStateProvider";
import { GenderSelection } from "./GenderSelection";
import { PersonaButton } from "./PersonaButton";

export function PersonasList() {
  const { personas, setSelectedPersona } = useAppState();
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold md:text-xl text-lg">
          Choose a Character
        </h2>
        <GenderSelection />
      </div>
      <div className="flex-1 overflow-y-auto -mx-4 px-4 max-h-[calc(100vh-250px)]">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
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
