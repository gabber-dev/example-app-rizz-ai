"use client";

import { Button3D } from "@/components/Button3D";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Score } from "@/components/Score";
type Props = {
  session: string;
};

export function ClientPage({ session }: Props) {
  const [score, setScore] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const generateScore = useCallback(async () => {
    setLoading(true);
    try {
      const scoreResult = (await axios.get("/api/score?session=" + session)).data;
      setScore(scoreResult);
    } catch (e) {
      toast.error("Error generating score");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    generateScore();
  }, [generateScore]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl font-bold animate-pulse">
          Calculating your Rizz...
        </div>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl font-bold text-error">
          No score available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto md:w-full">
        <Score score={score} />
      </div>
    </div>
  );
}