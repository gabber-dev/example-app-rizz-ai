"use client";

import React, { useState, useEffect } from "react";
import { SessionProvider, useSession } from "gabber-client-react";
import { Persona, Scenario } from "@/generated";
import { AgentAudioVisualizer } from "@/components/AgentAudioVisualizer";
import { InputBar } from "./components/InputBar";
import Image from "next/image";
import { Messages } from "./components/Messages";
import { ProgressBar } from "./components/ProgressBar";
import { useAppState } from "@/components/AppStateProvider";
import { BorderButton } from "@/components/BorderButton";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { set } from "lodash";

type Props = {
  persona: Persona;
  scenario: Scenario;
};

const MESSAGES_BEFORE_RIZZ = 10;

export function ClientPage({ persona, scenario }: Props) {
  const { credits, setShowPaywall, usageToken } = useAppState();
  const [connectionOpts, setConnectionOpts] = useState<null | {
    token: string;
    sessionConnectOptions: { persona: string; scenario: string };
  }>(null);

  useEffect(() => {
    if (credits > 0) {
      setConnectionOpts({
        token: usageToken,
        sessionConnectOptions: { persona: persona.id, scenario: scenario.id },
      });
    } else {
      setConnectionOpts(null);
    }
  }, [credits, persona.id, scenario.id, setShowPaywall, usageToken]);

  return (
    <SessionProvider connectionOpts={connectionOpts}>
      <ClientSessionPageInner persona={persona} scenario={scenario} />
    </SessionProvider>
  );
}

export function ClientSessionPageInner({
  persona,
  scenario,
}: Omit<Props, "token">) {
  const { messages, id } = useSession();
  const { credits, setShowPaywall, refreshCredits } = useAppState();
  const router = useRouter();

  // Refresh credits loop
  useEffect(() => {
    const interval = setInterval(() => {
      refreshCredits();
    }, 5000);
    return () => clearInterval(interval);
  }, [refreshCredits]);

  useEffect(() => {
    if (credits <= 0) {
      setShowPaywall({ session: id });
    }
  }, [credits, id, setShowPaywall]);

  return (
    <div className="relative w-full h-full pt-2">
      <div className="absolute top-0 left-0 right-0 bottom-[50px] p-2 flex flex-col items-center justify-center">
        <div className="relative h-[100px] w-[100px] md:h-[200px] md:w-[200px] rounded-[8px] overflow-hidden mb-1">
          <Image
            fill={true}
            className="w-full h-full object-cover"
            src={persona.image_url || ""}
            alt={persona.name}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[40px] md:h-[80px] z-[1]"
            style={{
              background:
                "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.9), rgba(0,0,0,1.0))",
            }}
          >
            <AgentAudioVisualizer />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-white h-[120px] relative z-[2]">
          <div className="text-lg font-bold mb-1">{persona.name}</div>
          <div className="text-sm opacity-70 mb-1">{scenario.name}</div>
          <div className="font-bold mb-1">
            Talk for at least 10 messages to get your rizz score
          </div>
          <div className="h-[40px] w-[200px] flex items-center justify-center">
            {messages.length < MESSAGES_BEFORE_RIZZ ? (
              <ProgressBar
                numerator={messages.length}
                denominator={MESSAGES_BEFORE_RIZZ}
              />
            ) : (
              <BorderButton
                onClick={() => {
                  if (credits <= 0) {
                    console.error("No credits available");
                    setShowPaywall({ session: id });
                    return;
                  }
                  if (!id) {
                    console.error("No session ID available");
                    toast.error("Session not ready yet, please try again");
                    return;
                  }
                  console.log("Navigating to score with session ID:", id);
                  router.push(`/score?session=${id}`);
                }}
                className="font-bold px-2 hover:shadow-inner bg-primary rounded-lg text-primary hover:primary h-full"
              >
                Check your Rizz
              </BorderButton>
            )}
          </div>
        </div>
        <div className="relative w-full grow max-w-[600px]">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Messages />
          </div>
        </div>
      </div>
      <div className="absolute justify-center flex left-0 right-0 bottom-0 h-[50px] px-2">
        <div className="h-full w-full max-w-[400px]">
          <div className="w-full h-full flex items-center">
            <InputBar />
          </div>
        </div>
      </div>
    </div>
  );
}
