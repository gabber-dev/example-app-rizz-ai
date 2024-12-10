import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RealtimeSession } from "@/generated";

type Props = {
  sessions: RealtimeSession[];
  onSessionSelect: (sessionId: string) => void;
  className?: string;
};

export function PastSessionsList({
  sessions,
  onSessionSelect,
  className,
}: Props) {
  const router = useRouter();

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Past Sessions</h2>
      <div
        className={`overflow-y-auto ${className || "h-[calc(100vh-450px)] md:h-[calc(100vh-350px)]"}`}
      >
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.id} className="relative mb-2">
              <button
                className="p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100 w-full group"
                onClick={() => onSessionSelect(session.id)}
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
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold truncate">
                          {session.config.generative?.persona?.name || ""}
                        </div>
                        <div className="text-sm opacity-70 truncate">
                          {session.config.generative?.scenario?.name || ""}
                        </div>
                        <div className="text-sm opacity-70">
                          {formatDistanceToNow(new Date(session.created_at))}{" "}
                          ago
                        </div>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          const persona_id =
                            session.config.generative?.persona?.id;
                          const scenario_id =
                            session.config.generative?.scenario?.id;
                          if (!persona_id || !scenario_id) {
                            toast.error("Failed to retry session");
                            return;
                          }
                          router.push(
                            `/live?persona=${persona_id}&scenario=${scenario_id}`,
                          );
                        }}
                        className="text-sm text-primary hover:text-primary-focus transition-colors flex items-center gap-1 ml-2"
                      >
                        <span>Retry</span>
                        <span className="transform transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="text-base-content/70 text-lg mb-2">
              Start practicing to fill up your past sessions
            </div>
            <div className="text-sm opacity-50">
              Your conversation history will appear here
            </div>
          </div>
        )}
      </div>
    </>
  );
}
