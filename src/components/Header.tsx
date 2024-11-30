"use client";
import { Logo } from "./icons/Logo";

export function Header() {
  return (
    <div className="p-2 h-full w-full flex items-center bg-base-300">
      <a className="h-3/5 ml-2" href="/">
        <Logo className="text-primary" />
      </a>
      <div className="grow" />
    </div>
  );
}
