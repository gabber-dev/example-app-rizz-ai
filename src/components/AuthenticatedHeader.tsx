"use client";
import { useAppState } from "./AppStateProvider";
import { Logo } from "./icons/Logo";
import { ShinyButton } from "@/components/ShinyButton";

export function AuthenticatedHeader() {
  const { credits, setShowPaywall } = useAppState();
  return (
    <div className="p-2 h-full w-full flex items-center bg-base-300">
      <a className="h-3/5 ml-2" href="/">
        <Logo className="text-primary" />
      </a>
      <div className="grow" />
      <ShinyButton
        onClick={() => {
          setShowPaywall(true);
        }}
      >
        <div className="text-primary-content font-bold">Credits: {credits}</div>
      </ShinyButton>
    </div>
  );
}
