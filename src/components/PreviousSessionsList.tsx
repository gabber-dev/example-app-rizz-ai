import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppState } from "./AppStateProvider";

export function PreviousSessionsList() {
  const [isSessionsCollapsed, setIsSessionsCollapsed] = useState(true);
  const { sessions } = useAppState();
  const router = useRouter();
  return (
    <div className="w-full h-full">
      <button
        className="flex md:hidden w-full justify-between items-center mb-4"
        onClick={() => setIsSessionsCollapsed(!isSessionsCollapsed)}
      >
        <h2 className="text-xl font-bold md:text-xl text-lg">Past Sessions</h2>
        <div
          className={`transform transition-transform ${isSessionsCollapsed ? "" : "rotate-180"}`}
        >
          ▼
        </div>
      </button>
      <h2 className="hidden md:block text-xl font-bold mb-4 md:text-xl text-lg">
        Past Sessions
      </h2>
      <div
        className={`flex flex-col gap-2 overflow-y-auto transition-all duration-300 overflow-scroll ${
          isSessionsCollapsed ? "h-0" : "h-[calc(100%-4rem)]"
        } md:h-[calc(100%-2rem)]`}
      >
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
                  quality={100}
                  fill={true}
                  sizes="512px"
                  src={session.config.generative?.persona?.image_url || ""}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold truncate">
                  {session.config.generative?.persona?.name || ""}
                </div>
                <div className="text-sm opacity-70 truncate">
                  {session.config.generative?.scenario?.name || ""}
                </div>
                <div
                  onClick={(e) => {
                    const persona_id = session.config.generative?.persona?.id;
                    const scenario_id = session.config.generative?.scenario?.id;
                    if (!persona_id || !scenario_id) {
                      toast.error("Failed to retry session");
                      return;
                    }
                    router.push(
                      `/live?persona=${persona_id}&scenario=${scenario_id}`,
                    );
                  }}
                  className="mt-2 text-sm text-primary hover:text-primary-focus"
                >
                  Retry Session →
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
