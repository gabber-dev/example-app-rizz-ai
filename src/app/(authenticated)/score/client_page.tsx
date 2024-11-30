"use client";

import { Button3D } from "@/components/Button3D";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  session: string;
};

export function ClientPage({ session }: Props) {
  const [score, setScore] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const generateScore = useCallback(async () => {
    setLoading(true);
    try {
      const scoreResult = (await axios.get("/api/score?session=" + session))
        .data;
      console.log(scoreResult);
    } catch (e) {
      toast.error("Error generating score");
    } finally {
      setLoading(false);
    }
  }, [session]);

  return (
    <div>
      <Button3D enabled={true} onClick={generateScore}>
        <div className="animate-pulse">Check your Rizz</div>
      </Button3D>
    </div>
  );
}
