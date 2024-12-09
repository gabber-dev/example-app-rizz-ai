import { Persona } from "@/generated";
import Image from "next/image";

export function PersonaButton({
  persona,
  onClick,
}: {
  persona: Persona;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center w-full transition-all bg-base-200 hover:bg-base-100 rounded-lg p-4"
    >
      <div className="relative w-full pb-[100%] rounded-lg overflow-hidden mb-2">
        <Image
          fill={true}
          quality={100}
          sizes="256px"
          src={persona.image_url || ""}
          alt={persona.name}
          className="object-cover"
        />
      </div>
      <div className="font-bold text-center truncate w-full">
        {persona.name}
      </div>
    </button>
  );
}
