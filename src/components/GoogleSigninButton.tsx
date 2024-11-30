"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  text: string;
};

export function GoogleSignInButton({ text }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const destination = useMemo(() => {
    const utm = new URLSearchParams({}).toString();
  }, []);
  return (
    <button
      className="btn"
      onClick={() => {
        setLoading(true);
        if (typeof window === "undefined") return;
        const queryParams = new URLSearchParams(window.location.search);
        const utmParams: { [key: string]: string } = {};
        if (queryParams.get('utm_source') !== null) {
          utmParams['utm_source'] = queryParams.get('utm_source')!
        }
        if (queryParams.get('utm_medium') !== null) {
          utmParams['utm_medium'] = queryParams.get('utm_medium')!
        }
        if (queryParams.get('utm_campaign') !== null) {
          utmParams['utm_campaign'] = queryParams.get('utm_campaign')!
        }
        if (queryParams.get('utm_term') !== null) {
          utmParams['utm_term'] = queryParams.get('utm_term')!
        }
        if (queryParams.get('utm_content') !== null) {
          utmParams['utm_content'] = queryParams.get('utm_content')!
        }

        if (Object.keys(utmParams).length === 0) {
          router.push("/auth/google/login");
        } else {
          const utmQueryString = new URLSearchParams(utmParams).toString();
          router.push(`/auth/google/login?${utmQueryString}`);
        }
      }}
    >
      {loading ? "loading..." : text}
    </button>
  );
}
