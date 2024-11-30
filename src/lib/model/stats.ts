export type Stats = {
  weeks: WeekStats[];
  days: DayStats[];
};

export type DayStats = {
  day: Date;
  user: string;
  spoken_seconds: number;
  total_score: number;
  average_score: number;
  number_of_sessions: number;
  total_session_seconds: number;
  silence_seconds: number;
};

export type WeekStats = {
  start_day: Date;
  user: string;
  spoken_seconds: number;
  total_score: number;
  average_score: number;
  number_of_sessions: number;
  silence_seconds: number;
};
