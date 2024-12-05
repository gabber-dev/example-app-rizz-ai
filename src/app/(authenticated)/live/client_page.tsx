"use client";

import React, { useMemo, useState, useEffect } from "react";
import { SessionProvider, useSession } from "gabber-client-react";
import { Persona, Scenario } from "@/generated";
import { AgentAudioVisualizer } from "@/components/AgentAudioVisualizer";
import { InputBar } from "./components/InputBar";
import Image from "next/image";
import { Messages } from "./components/Messages";
import { ProgressBar } from "./components/ProgressBar";
import { useAppState } from "@/components/AppStateProvider";
import { ShinyButton } from "@/components/ShinyButton";
import { BorderButton } from "@/components/BorderButton";
import { useRouter } from "next/navigation";

type Props = {
  persona: Persona;
  scenario: Scenario;
  token: string;
};

const MESSAGES_BEFORE_RIZZ = 10;

export function ClientPage({ persona, scenario, token }: Props) {
  const { credits, setShowPaywall } = useAppState();
  const [connectionOpts, setConnectionOpts] = useState<null | {
    token: string;
    sessionConnectOptions: { persona: string; scenario: string };
  }>(null);

  useEffect(() => {
    if (credits <= 0) {
      setShowPaywall({});
    } else {
      setConnectionOpts({
        token,
        sessionConnectOptions: { persona: persona.id, scenario: scenario.id },
      });
    }
  }, [credits, persona.id, scenario.id, setShowPaywall, token]);

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
  const { setShowPaywall, hasPaid } = useAppState();
  const router = useRouter();

  return (
    <div className="relative w-full h-full pt-4">
      <div className="absolute top-0 left-0 right-0 bottom-[50px] p-2 flex flex-col items-center justify-center">
        <div className="relative h-[200px] rounded-[8px] aspect-square overflow-hidden">
          <div
            className="absolute left-0 right-0 bottom-0 h-[80px] z-50 px-1 pb-1"
            style={{
              background:
                "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8), rgba(0,0,0,1.0))",
            }}
          >
            <AgentAudioVisualizer />
          </div>
          <Image
            fill={true}
            className="w-full h-full rounded-[9px]"
            src={persona.image_url}
            alt={persona.name}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-white my-2 h-[100px]">
          <div className="font-bold">Talk for at least 10 messages to get your rizz score</div>
          <div className="h-[40px] w-[200px] flex items-center justify-center">
            {messages.length < MESSAGES_BEFORE_RIZZ ? (
              <ProgressBar
                numerator={messages.length}
                denominator={MESSAGES_BEFORE_RIZZ}
              />
            ) : (
              <BorderButton
                onClick={() => {
                  if (!hasPaid) {
                    setShowPaywall({ session: id || undefined });
                  } else {
                    router.push(`/score?session=${id}`);
                  }
                  console.log("NEIL clicked", id);
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
      <div className="absolute justify-center flex left-0 right-0 bottom-0 h-[50px]">
        <div className="h-full max-w-[400px] w-full">
          <InputBar />
        </div>
      </div>
    </div>
  );
}
