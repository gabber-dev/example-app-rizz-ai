import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useAppState } from "@/components/AppStateProvider";
import toast from "react-hot-toast";
import { Score } from "@/components/Score";

type Message = {
  agent: boolean;
  text: string;
  created_at: string;
};

type TimelineItem = {
  type: "user" | "agent" | "silence";
  seconds: number;
};

type Props = {
  sessionId: string;
};

export function SessionDetail({ sessionId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  // const { credits, setCredits } = useAppState();
  // const [score, setScore] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsCollapsed, setIsStatsCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsStatsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      setLoading(true);
      try {
        const [messagesRes, timelineRes] = await Promise.all([
          axios.get(`/api/sessions/${sessionId}/messages`),
          axios.get(`/api/sessions/${sessionId}/timeline`)
        ]);
        setMessages(messagesRes.data.values);
        setTimeline(timelineRes.data.values);
      } catch (e) {
        console.error("Failed to fetch session details:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-20 bg-base-200 rounded-lg" />
        <div className="flex-1 bg-base-200 rounded-lg" />
      </div>
    );
  }

  const totalUserTime = timeline
    .filter(item => item.type === "user")
    .reduce((acc, item) => acc + item.seconds, 0);
  
  const totalSilenceTime = timeline
    .filter(item => item.type === "silence")
    .reduce((acc, item) => acc + item.seconds, 0);

  const totalAgentTime = timeline
    .filter(item => item.type === "agent")
    .reduce((acc, item) => acc + item.seconds, 0);

  const totalTime = totalUserTime + totalSilenceTime + totalAgentTime;

  return (
    <div className="flex flex-col gap-4 h-full">
      <button
        className="text-left text-lg font-medium mb-2 py-2 px-3 bg-base-200 rounded-lg hover:bg-base-100 transition-all md:hidden"
        onClick={() => setIsStatsCollapsed(!isStatsCollapsed)}
      >
        {isStatsCollapsed ? "Show Stats ▼" : "Hide Stats ▲"}
      </button>
      {!isStatsCollapsed && (
        <div className="grid grid-cols-3 gap-4">
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
      )}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: '60vh' }}>
        <div className="text-xl font-bold mb-4">Transcript</div>
        <div className="flex flex-col gap-3">
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
              <div>{message.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, percentage }: { 
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="w-full bg-base-300 rounded-full h-2 mt-2">
        <div 
          className="bg-primary h-full rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// function ScoreModal({ score, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-4 rounded-lg max-w-[90%]">
//         <div className="text-lg font-bold mb-2">Rizz Score</div>
//         <Score score={score} />
//         <button
//           className="mt-4 bg-primary text-white p-2 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// } 