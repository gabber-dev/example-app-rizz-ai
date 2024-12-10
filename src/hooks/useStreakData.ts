import { useMemo } from 'react';
import { RealtimeSession } from '@/generated';

export function useStreakData(sessions: RealtimeSession[]) {
  return useMemo(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i);
      return date;
    }).reverse();

    const sessionsByDay = new Map();
    sessions.forEach(session => {
      const sessionDate = new Date(session.created_at);
      const dateKey = sessionDate.toDateString();
      sessionsByDay.set(dateKey, (sessionsByDay.get(dateKey) || 0) + 1);
    });

    let currentStreak = 0;
    for (let i = 0; i <= 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = checkDate.toDateString();
      
      if (sessionsByDay.has(dateKey)) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      days: last7Days.map(date => ({
        label: date.getDate().toString(),
        completed: sessionsByDay.has(date.toDateString()) ? ("hit" as const) : ("missed" as const)
      })),
      streak: currentStreak
    };
  }, [sessions]);
} 