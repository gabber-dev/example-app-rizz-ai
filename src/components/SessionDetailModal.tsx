import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { StatCard } from "@/components/StatCard";
import { useAppState } from "@/components/AppStateProvider";

type Message = {
  agent: boolean;
  content: string;
  created_at: string;
};

type TimelineItem = {
  type: "user" | "agent" | "silence";
  seconds: number;
};

type Props = {
  sessionId: string | null;
  onClose: () => void;
};

export function SessionDetailModal({ sessionId, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { sessionApi, llmApi, realtimeApi } = useAppState();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) return;
      setLoading(true);
      try {
        const session = await realtimeApi.getRealtimeSession(sessionId);
        const [messagesRes, timelineRes] = await Promise.all([
          sessionApi.apiV1SessionSessionIdMessagesGet(sessionId),
          sessionApi.apiV1SessionSessionIdTimelineGet(sessionId),
        ]);
        setMessages(
          messagesRes.data.values.map((msg) => ({
            agent: msg.agent || false,
            content: msg.content || "",
            created_at: msg.created_at || new Date().toISOString(),
          })),
        );
        setTimeline(
          (timelineRes.data.values ?? []).map((item) => ({
            type: item.type || "user",
            seconds: item.seconds || 0,
          })),
        );
      } catch (e) {
        console.error("Failed to fetch session details:", e);
      } finally {
        setLoading(false);
      }
    };

    // Reset states when sessionId changes
    setMessages([]);
    setTimeline([]);
    setLoading(true);

    fetchSessionDetails();
  }, [sessionId, sessionApi, realtimeApi]);

  if (!sessionId) return null;

  const totalUserTime = timeline
    .filter((item) => item.type === "user")
    .reduce((acc, item) => acc + item.seconds, 0);

  const totalSilenceTime = timeline
    .filter((item) => item.type === "silence")
    .reduce((acc, item) => acc + item.seconds, 0);

  const totalAgentTime = timeline
    .filter((item) => item.type === "agent")
    .reduce((acc, item) => acc + item.seconds, 0);

  const totalTime = totalUserTime + totalSilenceTime + totalAgentTime;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-300 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col my-[10vh]">
        <div className="p-4 border-b border-base-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Session Details</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-base-200 rounded-lg" />
              <div className="h-40 bg-base-200 rounded-lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <StatCard
                  label="Time Speaking"
                  value={`${Math.round(totalUserTime)}s`}
                  percentage={Math.round((totalUserTime / totalTime) * 100)}
                />
                <StatCard
                  label="Silence Time"
                  value={`${Math.round(totalSilenceTime)}s`}
                  percentage={Math.round((totalSilenceTime / totalTime) * 100)}
                />
                <StatCard
                  label="AI Speaking"
                  value={`${Math.round(totalAgentTime)}s`}
                  percentage={Math.round((totalAgentTime / totalTime) * 100)}
                />
              </div>

              <div className="text-xl font-bold mb-4">Transcript</div>
              <div className="space-y-3">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg ${
                      message.agent
                        ? "bg-base-200"
                        : "bg-primary text-primary-content ml-8"
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1">
                      {formatDistanceToNow(new Date(message.created_at))} ago
                    </div>
                    <div className="text-white">{message.content}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
