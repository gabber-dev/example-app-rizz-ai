"use client";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="p-2 h-full w-full flex items-center justify-center bg-base-300 space-x-2">
      <div className="text-sm text-white italic">powered by</div>
      <Link href="https://gabber.dev">
        <Image src={"/logo.png"} alt="Gabber Logo" width={100} height={60} />
      </Link>
    </div>
  );
}
