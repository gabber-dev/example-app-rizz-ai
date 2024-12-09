"use client";
import { useRouter } from "next/navigation";
import { useAppState } from "./AppStateProvider";
import { Logo } from "./icons/Logo";
import { ShinyButton } from "@/components/ShinyButton";

export function AuthenticatedHeader() {
  const { credits, setShowPaywall, userInfo } = useAppState();
  const router = useRouter();
  return (
    <div className="p-2 h-full w-full flex items-center bg-base-300">
      <a className="h-3/5 ml-2" href="/">
        <Logo className="text-primary" />
      </a>
      <div className="grow" />
      {userInfo ? (
        <ShinyButton
          onClick={() => {
            setShowPaywall({ session: null });
          }}
        >
          <div className="text-primary-content font-bold">
            Credits: {credits}
          </div>
        </ShinyButton>
      ) : (
        <ShinyButton
          onClick={() => {
            router.push("/auth/google/login");
          }}
        >
          <div className="text-primary-content font-bold">Login or Sign-Up</div>
        </ShinyButton>
      )}
    </div>
  );
}
