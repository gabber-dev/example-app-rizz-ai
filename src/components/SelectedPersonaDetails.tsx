import Image from "next/image";
import { useAppState } from "./AppStateProvider";

export function SelectedPersonaDetails() {
  const { selectedPersona, setSelectedPersona } = useAppState();
  return (
    <div className="p-2 w-full">
      <div className="flex items-center gap-2 h-full">
        <button
          onClick={() => setSelectedPersona(null)}
          className="text-primary hover:text-primary-focus"
          aria-label="Back to persona selection"
        >
          ←
        </button>
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            quality={100}
            fill={true}
            sizes="512px"
            className="object-cover"
            src={selectedPersona?.image_url || ""}
            alt={selectedPersona?.name || ""}
          />
        </div>
        <div className="flex-1 flex items-center">
          <h2 className="text-lg font-bold md:text-lg text-md">
            {selectedPersona?.name || ""}
          </h2>
        </div>
      </div>
    </div>
  );
}
