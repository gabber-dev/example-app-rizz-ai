"use client";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="p-2 h-full w-full flex items-center justify-center bg-base-300 space-x-4 text-xs sm:text-sm">
      <div className="flex items-center space-x-2">
        <div className="text-white italic">powered by</div>
        <Link href="https://gabber.dev?utm_source=rizz-ai&utm_campaign=rizz">
          <Image
            src={"/logo.png"}
            alt="Gabber Logo"
            width={80}
            height={48}
            className="sm:w-[100px] sm:h-[60px]"
          />
        </Link>
      </div>

      <div className="h-6 w-px bg-gray-400"></div>

      <div className="text-white">
        <Link
          href="https://github.com/gabber-dev/example-app-rizz-ai"
          className="underline"
        >
          <span className="hidden sm:inline">
            Want to build an app like this? Here's the full codebase
          </span>
          <span className="sm:hidden">Build an app like this</span>
        </Link>
      </div>
    </div>
  );
}
